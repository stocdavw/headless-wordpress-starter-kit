import Link from "next/link";
import styles from "@/app/page.module.css";
import { fetchGqlPosts } from "@/lib/wp-graphql";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function GraphqlPostsPage() {
  const posts = await fetchGqlPosts().catch(() => []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.title}>GraphQL Posts</h1>
        <p className={styles.subtitle}>
          Fetched via WPGraphQL query
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.linkButton}>
            &larr; Back Home
          </Link>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.grid}>
          {posts.map((post: any) => (
            <article key={post.id} className={styles.card}>
              <p className={styles.date} suppressHydrationWarning>
                {new Date(post.date).toLocaleDateString()}
              </p>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              {post.excerpt && (
                <div
                  className={styles.excerpt}
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              )}
              <Link href={`/posts/${post.slug}`} className={styles.readMore}>
                Read post
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className={styles.empty}>
              No posts found (Check if WPGraphQL is active).
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
