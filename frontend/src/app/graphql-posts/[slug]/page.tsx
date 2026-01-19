import Link from "next/link";
import styles from "@/app/page.module.css";
import { fetchGqlPostBySlug } from "@/lib/wp-graphql";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GraphqlPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchGqlPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <div className={styles.links} style={{ marginBottom: '24px' }}>
          <Link href="/graphql-posts" className={styles.textLink}>
            &larr; Back to GraphQL posts
          </Link>
          <Link href="/" className={styles.textLink}>
            Home
          </Link>
        </div>
        <article className="prose prose-invert lg:prose-xl">
          <p className={styles.date} suppressHydrationWarning>
            {post.date ? new Date(post.date).toLocaleDateString() : "No date"}
          </p>
          <h1 className={styles.title}>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }} />
        </article>
      </div>
    </div>
  );
}
