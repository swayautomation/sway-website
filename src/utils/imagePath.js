export const resolveImagePath = (path) => {
  if (!path) return null;

  // Absolute path → use directly
  if (path.startsWith('/')) {
    return path;
  }

  // Filename → map to services image folder
  return `/img/services/${path}`;
};
