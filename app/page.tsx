'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [theme, setTheme] = useState('')
  const [additionalInstructions, setAdditionalInstructions] = useState('')
  const [generatedArticle, setGeneratedArticle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [metadata, setMetadata] = useState<{
    model?: string
    tokensUsed?: number
  }>({})

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('テーマを入力してください')
      return
    }

    setIsLoading(true)
    setError('')
    setGeneratedArticle('')
    setMetadata({})

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme,
          additionalInstructions,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '記事の生成に失敗しました')
      }

      const data = await response.json()
      setGeneratedArticle(data.article)
      setMetadata({
        model: data.model,
        tokensUsed: data.tokensUsed,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            イタコ村上
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            WWD JAPAN編集長・村上要氏のスタイルを学習したAI記事生成システム
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              記事テーマ設定
            </h2>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  テーマ <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="例: 2025年春夏のサステナブルファッションのトレンドについて"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-none"
                  rows={4}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  追加の指示（オプション）
                </label>
                <textarea
                  id="instructions"
                  value={additionalInstructions}
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="例: ラグジュアリーブランドの事例を中心に、欧州市場の動向も含めて分析してください"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white resize-none"
                  rows={3}
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !theme.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    記事を生成中...
                  </span>
                ) : (
                  '記事を生成'
                )}
              </button>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                生成された記事
              </h2>
              {metadata.tokensUsed && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {metadata.tokensUsed} tokens
                </span>
              )}
            </div>

            {generatedArticle ? (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {children}
                      </h3>
                    ),
                  }}
                >
                  {generatedArticle}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                <svg
                  className="w-16 h-16 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-center">
                  テーマを入力して「記事を生成」ボタンを押してください
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            このシステムは、村上要氏のスタイルガイドとサンプル記事を学習したAIです。
          </p>
          <p className="mt-2">
            コンテキストデータは
            <a
              href="https://github.com/StudioSaitama-LLC/murakami-context"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              GitHub
            </a>
            から取得しています。
          </p>
        </footer>
      </div>
    </main>
  )
}

