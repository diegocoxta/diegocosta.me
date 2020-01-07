import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostHeader from '../components/PostHeader';

interface BlogIndexProps extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMarkdownRemark: {
      edges: [{
        node: {
          excerpt: string;
          fields: {
            slug: string;
            readingTime: {
              minutes: number;
            };
          };
          frontmatter: {
            date: string;
            title: string;
            description: string;
            tags: string[];
          };
        };
      }];
    };
  };
}

const Article = styled.article`
  margin: 0 0 60px 0;
`;

const Excerpt = styled.p`
  font-weight: 400;
`;


function BlogIndex(props: BlogIndexProps) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={props.location} title={siteTitle}>
      <>
        <SEO title={'Todos os posts'} />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const date = new Date(node.frontmatter.date).toLocaleDateString();
          const tags = node.frontmatter.tags;
          const readingTime = node.fields.readingTime.minutes;
          const url = node.fields.slug;

          return (
            <Article key={node.fields.slug}>
              <PostHeader 
                title={title}
                date={date}
                url={url}
                tags={tags}
                readingTime={readingTime}
              />
              <section>
                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
              </section>
            </Article>
          );
        })}
      </>
    </Layout>
  );
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              minutes
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`;
