export const gotoRouterById = (url: string, id: number) => {
  return url.replace(':id', String(id));
};
