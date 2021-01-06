export function simplifyURL(rawSegments: string[]): string[] {
  return rawSegments.reverse().reduce((acc, s) => {
    if (s === '..') {
      return {path: acc.path, skip: acc.skip + 1};
    } else {
      return acc.skip === 0 ? {path: [...acc.path, s], skip: 0} : {path: acc.path, skip: acc.skip - 1};
    }
  }, {path: [] as string[], skip: 0}).path.reverse();
}
