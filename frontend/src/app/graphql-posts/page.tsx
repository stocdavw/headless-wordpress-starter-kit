import Link from "next/link";
import styles from "./page.module.css";
import { fetchGqlPosts, type GqlPost } from "@/lib/wp-graphql";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function GraphqlPostsPage() {
  let posts: GqlPost[] = [];
  let errorMessage: string | null = null;
  try {
    posts = await fetchGqlPosts();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <p className={styles.eyebrow}>GraphQL</p>
          <h1 className={styles.title}>Posts</h1>
          <p className={styles.subtitle}>
            Data from <code>/graphql</code>.
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
              {post.date ? new Date(post.date).toLocaleDateString() : "No date"}
            </p>
            <h3 className={styles.cardTitle}>{post.title}</h3>
            {post.excerpt && (
              <p
                className={styles.excerpt}
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            )}
            <Link
              href={`/graphql-posts/${post.slug}`}
              className={styles.readMore}
            >
              Read post
            </Link>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className={styles.empty}>
          {errorMessage
            ? `Could not load posts: ${errorMessage}`
            : "No posts returned from GraphQL. Ensure the WPGraphQL plugin is active and posts exist."}
        </p>
      )}
    </div>
  );
}
