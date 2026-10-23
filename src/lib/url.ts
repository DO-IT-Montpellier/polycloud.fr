/** Normalises a pathname to the route as written in the code ("/programme/" → "/programme"). */
export function route(pathname: string) {
  return pathname.replace(/\/+$/, '') || '/';
}
