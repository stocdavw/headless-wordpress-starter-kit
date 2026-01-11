import Link from "next/link";
import styles from "./page.module.css";
import { fetchGqlPostBySlug } from "@/lib/wp-graphql";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GraphqlPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchGqlPostBySlug(slug);

  if (!post) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>GraphQL</p>
          <p>Post not found.</p>
          <div className={styles.backRow}>
            <Link href="/graphql-posts" className={styles.back}>
              ← Back to GraphQL posts
            </Link>
            <Link href="/" className={styles.back}>
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>GraphQL</p>
        <p className={styles.date}>
          {post.date ? new Date(post.date).toLocaleDateString() : "No date"}
        </p>
        <h1 className={styles.title}>{post.title}</h1>
        {post.content && (
          <article
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
        {!post.content && post.excerpt && (
          <article
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}
        <div className={styles.backRow}>
          <Link href="/graphql-posts" className={styles.back}>
            ← Back to GraphQL posts
          </Link>
          <Link href="/" className={styles.back}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
