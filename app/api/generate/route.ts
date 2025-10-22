import { NextRequest, NextResponse } from 'next/server'
import { getCachedContext } from '@/lib/github'
import { generateMurakamiStyleArticle } from '@/lib/openai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface GenerateRequestBody {
  theme: string
  additionalInstructions?: string
}

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの解析
    const body: GenerateRequestBody = await request.json()
    const { theme, additionalInstructions = '' } = body

    // バリデーション
    if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
      return NextResponse.json(
        { error: 'テーマが指定されていません' },
        { status: 400 }
      )
    }

    // 環境変数のチェック
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      return NextResponse.json(
        { error: 'APIキーが設定されていません' },
        { status: 500 }
      )
    }

    // GitHubからコンテキストデータを取得
    console.log('Fetching context data from GitHub...')
    const contextData = await getCachedContext()
    console.log('Context data fetched successfully')

    // OpenAI APIで記事を生成
    console.log('Generating article with OpenAI...')
    const result = await generateMurakamiStyleArticle({
      theme,
      contextData,
      additionalInstructions,
    })
    console.log('Article generated successfully')

    // レスポンスを返す
    return NextResponse.json({
      article: result.article,
      model: result.model,
      tokensUsed: result.tokensUsed,
    })
  } catch (error) {
    console.error('Error in generate API:', error)

    // エラーメッセージの詳細化
    let errorMessage = '記事の生成に失敗しました'
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'GitHubからコンテキストデータを取得できませんでした'
        statusCode = 503
      } else if (error.message.includes('API')) {
        errorMessage = 'OpenAI APIでエラーが発生しました'
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}

// GETリクエストの処理（ヘルスチェック用）
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Article generation API is running',
  })
}

