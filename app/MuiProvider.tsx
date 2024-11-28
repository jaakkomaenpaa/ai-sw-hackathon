import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';


function createEmotionCache() {
  return createCache({
    key: 'css',
  });
}

export const MuiProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
