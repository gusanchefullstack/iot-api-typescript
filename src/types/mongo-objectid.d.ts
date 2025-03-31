declare module 'mongo-objectid' {
  export function isValid(id: string): boolean;
  export default { isValid };
} 