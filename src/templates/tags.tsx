import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostHeader from '../components/PostHeader';

interface TagsProps extends PageRendererProps {
  pageContext: {
    tag: string;
  };
  data : {
    allMarkdownRemark: {
      totalCount: number;
      edges: [
        {
          node: {
            excerpt: string;
            frontmatter: {
              title: string;
              date: string;
              tags: string[];
              description: string;
            };
            fields: {
              slug: string;
              readingTime: {
                minutes: number;
              };
            };
          };
        }
      ];
    };
  };
}

const Article = styled.article`
  margin: 0 0 60px 0;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  background: #d73738;
  display: inline;
  padding: 5px;
`;

const Excerpt = styled.p`
  font-weight: 400;
`;


function Tags(props: TagsProps) {
  const { tag } = props.pageContext;
  const { edges, totalCount } = props.data.allMarkdownRemark;
  const tagHeader = `${tag} (${totalCount})`;

  return (
    <Layout location={props.location} title={tag}>
      <>
        <SEO title={tag} />
        <PageTitle>{tagHeader}</PageTitle>
        {edges.map(({ node }) => {
          return (
            <Article key={node.fields.slug}>
              <PostHeader
                title={node.frontmatter.title}
                tags={node.frontmatter.tags}
                date={node.frontmatter.date}
                url={node.fields.slug}
                readingTime={node.fields.readingTime.minutes}
              />
              <section>
                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
              </section>
            </Article>            
          );
        })}
      </>
    </Layout>
  )
}

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            tags
            description
          }
        }
      }
    }
  }
`;