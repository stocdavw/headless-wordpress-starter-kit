import Link from "next/link";
import styles from "./page.module.css";
import { fetchPostBySlug } from "@/lib/wp-rest";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p>Post not found.</p>
          <Link href="/" className={styles.back}>
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p className={styles.date}>
          {new Date(post.date).toLocaleDateString()}
        </p>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {post.content?.rendered && (
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        )}
        <Link href="/" className={styles.back}>
          ← Back home
        </Link>
      </div>
    </div>
  );
}
