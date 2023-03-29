// can't use path in browser as a temp solution I'm  just writing my own file helpers

export const getBasePath = (path: string) =>
  path.split("\\")[path.split("\\").length - 1] as string;
