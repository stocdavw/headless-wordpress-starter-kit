import Link from "next/link";
import styles from "@/app/page.module.css";
import { fetchPosts } from "@/lib/wp-rest";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function RestPostsPage() {
  const posts = await fetchPosts().catch(() => []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>REST API Posts</h1>
        <p className={styles.subtitle}>
          Fetched from <code>/wp-json/wp/v2/posts</code>
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.linkButton}>
            &larr; Back Home
          </Link>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.card}>
              <p className={styles.date} suppressHydrationWarning>
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
              No posts found.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
