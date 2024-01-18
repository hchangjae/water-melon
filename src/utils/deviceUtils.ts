export const isClient = typeof window !== 'undefined';
export const isLocal = process.env.NODE_ENV === 'development';
