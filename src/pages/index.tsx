import React from 'react';
import { Link, graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';

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
          };
          frontmatter: {
            date: string;
            title: string;
            description: string;
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
`;

const CustomLink = styled(Link)`
  color: #d73738;
  box-shadow: none;
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
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          const date = new Date(node.frontmatter.date).toLocaleDateString();

          return (
            <article key={node.fields.slug}>
              <header>
                <Title>
                  <CustomLink to={node.fields.slug}>
                    {title}
                  </CustomLink>
                </Title>
                <small>{date}</small>
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
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
