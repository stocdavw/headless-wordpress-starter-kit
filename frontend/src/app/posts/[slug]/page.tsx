import Link from "next/link";
import styles from "@/app/page.module.css";
import { fetchPostBySlug } from "@/lib/wp-rest";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <Link href="/" className={styles.textLink} style={{ marginBottom: '24px', display: 'inline-block' }}>
          &larr; Back home
        </Link>
        <article className="prose prose-invert lg:prose-xl">
          <p className={styles.date} suppressHydrationWarning>
            {new Date(post.date).toLocaleDateString()}
          </p>
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      </div>
    </div>
  );
}
