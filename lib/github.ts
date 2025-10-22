/**
 * GitHubリポジトリから生のファイルコンテンツを取得するユーティリティ
 */

export interface ContextData {
  styleGuide: string;
  samples: string;
}

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com';
const REPO = process.env.GITHUB_REPO || 'StudioSaitama-LLC/murakami-context';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

/**
 * GitHubから指定されたファイルを取得
 */
async function fetchGitHubFile(filepath: string): Promise<string> {
  const url = `${GITHUB_RAW_URL}/${REPO}/${BRANCH}/${filepath}`;
  
  try {
    const response = await fetch(url, {
      cache: 'no-store', // 常に最新のデータを取得
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${filepath}: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Error fetching GitHub file ${filepath}:`, error);
    throw error;
  }
}

/**
 * 村上要氏のコンテキストデータを取得
 */
export async function fetchMurakamiContext(): Promise<ContextData> {
  try {
    const [styleGuide, samples] = await Promise.all([
      fetchGitHubFile('01_murakami_style.md'),
      fetchGitHubFile('02_sample.md'),
    ]);

    return {
      styleGuide,
      samples,
    };
  } catch (error) {
    console.error('Error fetching Murakami context:', error);
    throw new Error('コンテキストデータの取得に失敗しました');
  }
}

/**
 * コンテキストデータのキャッシュ（オプション）
 * Vercelの場合、Edge Cacheを利用することも可能
 */
let contextCache: ContextData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分

export async function getCachedContext(): Promise<ContextData> {
  const now = Date.now();
  
  if (contextCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return contextCache;
  }

  contextCache = await fetchMurakamiContext();
  cacheTimestamp = now;
  
  return contextCache;
}

