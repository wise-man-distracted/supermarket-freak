import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                  node {
                    autor {
                        bio
                        id
                        nome
                        foto {
                          url
                        }
                      }
                      createdAt
                      slug
                      titulo
                      excerto
                      imagemDestaque {
                        url
                      }
                      categorias {
                        nome
                        slug
                      }
                    }
                  }
                }
            }
        `;
    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
}
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        titulo
        imagemDestaque {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getSimilarPosts = async (categorias, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categorias: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categorias_some: {slug_in: $categorias}}}
        last: 3
      ) {
        titulo
        imagemDestaque {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categorias });

  return result.posts;
};

export const getCategorias = async () => {
  const query = gql`
    query GetCategorias {
        categorias {
          nome
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categorias;
};