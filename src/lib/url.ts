// The site is served from a sub-path on GitHub Pages (see `base` in astro.config.mjs),
// so every internal link and asset path must go through `url()`.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefixes a root-relative path ("/programme") with the base path. Other URLs are returned untouched. */
export function url(path: string) {
  return path.startsWith('/') ? `${base}${path}` : path;
}

/** Strips the base path from a pathname, giving the route as written in the code ("/programme"). */
export function route(pathname: string) {
  const path = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return path.replace(/\/+$/, '') || '/';
}
