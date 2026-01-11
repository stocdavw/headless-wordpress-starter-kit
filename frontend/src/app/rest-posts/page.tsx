import Link from "next/link";
import styles from "./page.module.css";
import { fetchPosts, getWordPressRestBaseUrl, type RestPost } from "@/lib/wp-rest";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function RestPostsPage() {
  let posts: RestPost[] = [];
  let errorMessage: string | null = null;
  try {
    posts = await fetchPosts(100);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }
  const restBase = getWordPressRestBaseUrl();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <p className={styles.eyebrow}>REST API</p>
          <h1 className={styles.title}>Posts</h1>
          <p className={styles.subtitle}>
            Data from <code>{restBase}/wp/v2/posts</code>.
          </p>
        </div>
        <Link href="/" className={styles.back}>
          ← Back home
        </Link>
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
      </div>

      {posts.length === 0 && (
        <p className={styles.empty}>
          {errorMessage
            ? `Could not load posts: ${errorMessage}`
            : "No posts found. Create a post in WordPress and refresh."}
        </p>
      )}
    </div>
  );
}
