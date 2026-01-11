type RestPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  date: string;
};

type WpRestIndex = {
  name?: string;
  description?: string;
  home?: string;
  url?: string;
};

const restBase =
  process.env.NEXT_PUBLIC_WORDPRESS_REST_URL?.replace(/\/$/, '') ??
  'http://localhost:8881/wp-json';

const postsRoute = `${restBase}/wp/v2/posts`;
const siteBase = restBase.replace(/\/wp-json$/, '');

export function getWordPressRestBaseUrl(): string {
  return restBase;
}

export function getWordPressSiteBaseUrl(): string {
  return siteBase;
}

export async function fetchSiteInfo(): Promise<WpRestIndex> {
  const res = await fetch(restBase, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`REST fetchSiteInfo failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchPosts(perPage = 10): Promise<RestPost[]> {
  const res = await fetch(`${postsRoute}?per_page=${perPage}&_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`REST fetchPosts failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<RestPost | null> {
  const res = await fetch(`${postsRoute}?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`REST fetchPostBySlug failed: ${res.status}`);
  }
  const data: RestPost[] = await res.json();
  return data[0] ?? null;
}

export type { RestPost, WpRestIndex };
