/**
 * OpenAI APIを使用した記事生成ユーティリティ
 */

import OpenAI from 'openai';
import { ContextData } from './github';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface GenerateArticleParams {
  theme: string;
  contextData: ContextData;
  additionalInstructions?: string;
}

export interface GenerateArticleResult {
  article: string;
  model: string;
  tokensUsed: number;
}

/**
 * 村上要氏のスタイルで記事を生成
 */
export async function generateMurakamiStyleArticle({
  theme,
  contextData,
  additionalInstructions = '',
}: GenerateArticleParams): Promise<GenerateArticleResult> {
  const systemPrompt = buildSystemPrompt(contextData);
  const userPrompt = buildUserPrompt(theme, additionalInstructions);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const article = completion.choices[0]?.message?.content || '';
    const tokensUsed = completion.usage?.total_tokens || 0;

    return {
      article,
      model: completion.model,
      tokensUsed,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('記事の生成に失敗しました');
  }
}

/**
 * システムプロンプトの構築
 */
function buildSystemPrompt(contextData: ContextData): string {
  return `あなたはWWD JAPANの編集長である村上要氏のスタイルを学習したライティングアシスタントです。

# 村上要氏のスタイルガイド

${contextData.styleGuide}

# 村上氏の執筆サンプル

${contextData.samples}

# 重要な指示

- 上記のスタイルガイドとサンプルを参考に、村上要氏の特徴的な視点、トーン、構成、語彙選択を忠実に再現してください
- ファッション業界に関する深い洞察と、トレンドの背後にある文化的・社会的文脈を捉える視点を持ってください
- ブランドやデザイナーに対する批評的でありながらも建設的な姿勢を保ってください
- 具体的な事例やデータを織り交ぜながら、抽象的な概念を分かりやすく説明してください
- 読者に新しい気づきや視点を提供することを常に意識してください

あなたの役割は、与えられたテーマについて村上氏が書くであろう記事を生成することです。`;
}

/**
 * ユーザープロンプトの構築
 */
function buildUserPrompt(theme: string, additionalInstructions: string): string {
  let prompt = `以下のテーマについて、村上要氏のスタイルで記事を執筆してください。

テーマ: ${theme}`;

  if (additionalInstructions) {
    prompt += `\n\n追加の指示:\n${additionalInstructions}`;
  }

  prompt += `\n\n記事は以下の要件を満たしてください:
- 文字数: 800〜1200文字程度
- 構成: 導入 → 分析 → 考察 → 結論
- トーン: 専門的でありながら読みやすい
- 視点: 村上氏特有のトレンド分析と文化的洞察を含む

それでは、記事をお願いします。`;

  return prompt;
}

