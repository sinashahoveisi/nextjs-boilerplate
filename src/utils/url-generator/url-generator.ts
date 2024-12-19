export const urlGenerator = (url: string, version?: number | string): string => (version ? `v${version}/${url}` : url);
