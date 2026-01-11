import Link from "next/link";
import styles from "./page.module.css";
import {
  fetchPosts,
  fetchSiteInfo,
  getWordPressSiteBaseUrl,
  type WpRestIndex,
} from "@/lib/wp-rest";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, posts] = await Promise.all([
    fetchSiteInfo().catch((): WpRestIndex | null => null),
    fetchPosts(6).catch(() => []),
  ]);
  const wpAdminUrl = `${getWordPressSiteBaseUrl()}/wp-admin`;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Next.js + WordPress</p>
          <h1 className={styles.title}>{site?.name ?? "WordPress"}</h1>
          <p className={styles.subtitle}>
            REST and GraphQL examples against your local WordPress. Add posts in
            WP and refresh to see them here.
          </p>
          <div className={styles.links}>
            <Link href="/rest-posts" className={styles.linkButton}>
              REST API Posts
            </Link>
            <Link href="/graphql-posts" className={styles.linkButton}>
              GraphQL Posts
            </Link>
            <a
              href={wpAdminUrl}
              className={styles.textLink}
              target="_blank"
              rel="noreferrer"
            >
              Open WP Admin
            </a>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Latest posts</h2>
          <p>
            Fetched from <code>/wp-json/wp/v2/posts</code> with ISR (60s).
          </p>
        </div>
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <p className={styles.date}>
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h3
                className={styles.cardTitle}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              {post.excerpt?.rendered && (
                <div
                  className={styles.excerpt}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              )}
              <Link href={`/posts/${post.slug}`} className={styles.readMore}>
                Read post
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className={styles.empty}>
              No posts yet. Create one in WordPress and refresh.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
