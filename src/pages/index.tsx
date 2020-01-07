import React from 'react';
import { Link, graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';
import { kebabCase } from 'lodash';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

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
              words: number;
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

const Title = styled.h3`
  font-family: 'Raleway', sans-serif;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 26px;
`;

const CustomLink = styled(Link)`
  color: #fff;
  box-shadow: none;
`;

const Excerpt = styled.p`
  font-weight: 400;
`;

const TagLink = styled(Link)`
  color: red;
`;

function BlogIndex(props: BlogIndexProps) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={props.location} title={siteTitle}>
      <>
        <SEO title={'Todos os posts'} />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const date = new Date(node.frontmatter.date).toLocaleDateString();
          const tags = node.frontmatter.tags;
          const readingTime = node.fields.readingTime;


          console.log({ readingTime })

          return (
            <article key={node.fields.slug}>
              <header>
                <Title>
                  <CustomLink to={node.fields.slug}>
                    {title}
                  </CustomLink>
                </Title>
                <small>{date}</small>
                <p>{readingTime.minutes} minutos</p>
                <p>{readingTime.words} palavras</p>
                <ul>
                {tags && tags.map(tag => <li><TagLink to={`/tags/${kebabCase(tag)}`}>{tag}</TagLink></li>)}
                </ul>
              </header>
              <section>
                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
              </section>
            </article>
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
              words
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
