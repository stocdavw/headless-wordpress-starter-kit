import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const graphqlUrl =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace(/\/$/, '') ??
  'http://localhost:8881/graphql';

export type GqlPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
    fetch,
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
  },
});

export async function fetchGqlPosts(): Promise<GqlPost[]> {
  const result = await client.query<{ posts: { nodes: GqlPost[] } }>({
    query: gql`
      query RecentPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            id
            slug
            title
            excerpt
            date
          }
        }
      }
    `,
  });
  return result.data?.posts?.nodes ?? [];
}

export async function fetchGqlPostBySlug(slug: string): Promise<GqlPost | null> {
  const result = await client.query<{ post: GqlPost | null }>({
    query: gql`
      query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          slug
          title
          excerpt
          content
          date
        }
      }
    `,
    variables: { slug },
  });

  return result.data?.post ?? null;
}
