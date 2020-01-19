import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostHeader from '../components/PostHeader';

interface SingleProps extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    markdownRemark: {
      id: string;
      excerpt: string;
      html: string;
      fields: {
        readingTime: {
          minutes: number;
        };
      };
      frontmatter: {
        title: string;
        date: string;
        description: string;
        tags: string[];
      };
    };
  };
}

const Article = styled.article`
  margin-bottom: 50px;
`;

const Content = styled.section`
  line-height: 1.5;

  a {
    color: #d73738;
    text-decoration: none;
    border-bottom: 1px solid transparent;

    :hover {
      border-bottom: 1px solid #d73738;
    }
  }

  blockquote {
    border-left: 5px solid #d73738;
    padding-left: 20px;
  }

  .gatsby-highlight {
    padding: 10px 0;
  }

  pre[class*='language-'],
  code[class*='language-'],
  .gatsby-highlight {
    background-color: transparent;
  }

  .line-numbers-rows,
  .line-numbers-rows span::before {
    border: 0.5px solid transparent;
  }

  img {
    box-shadow: none !important;
  }
`;

function Single(props: SingleProps) {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle} smallLogo={true}>
      <>
        <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
        <Article>
          <PostHeader
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            tags={post.frontmatter.tags}
            readingTime={post.fields.readingTime.minutes}
          />
          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        </Article>
      </>
    </Layout>
  );
}

export default Single;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        readingTime {
          minutes
        }
      }
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        description
        tags
      }
    }
  }
`;
