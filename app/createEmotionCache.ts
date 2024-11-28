import createCache from '@emotion/cache';

// Create a custom Emotion cache to handle SSR and client-side rendering.
const createEmotionCache = () => {
  return createCache({ key: 'mui', prepend: true }); // Key ensures unique styles for MUI.
};

export default createEmotionCache;

