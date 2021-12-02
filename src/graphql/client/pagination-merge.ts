export function paginationMerge(key: string, list = 'rows') {
  return {
    [key]: {
      keyArgs: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      merge(existing = { [list]: [] }, incoming: any) {
        const totalLength = existing?.[list]?.length + incoming?.[list]?.length;

        if (incoming?.count >= totalLength) {
          return {
            ...incoming,
            [list]: [...existing?.[list], ...incoming?.[list]],
          };
        }
        return existing;
      },
    },
  };
}
