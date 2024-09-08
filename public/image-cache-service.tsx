const imageCache = new Map();

export const getCachedImage = (key) => {
  return imageCache.get(key);
};

export const setCachedImage = (key, imageUrl) => {
  imageCache.set(key, imageUrl);
};
