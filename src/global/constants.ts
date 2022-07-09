export const ACCESS_TOKEN = '';
export const QUERY_PARAMS = ACCESS_TOKEN.length > 0 ? { headers: { authorization: `token ${ACCESS_TOKEN}` } } : {};
export const GITHUB_BASE_URL = 'https://api.github.com';
export const GITHUB_REPOS_BASE_URL = `${GITHUB_BASE_URL}/repos`;
