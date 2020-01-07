import React from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import styled from 'styled-components';

import Bio from '../components/Bio';
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

const Article = styled.article``;

const Footer = styled.footer`
  border-top: 1px solid #fff;
  padding-top: 20px;
  margin: 40px 0;
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

  code {
    background: #222;
    display: block;
    padding: 10px 20px;
    font-size: 16px;
    overflow: auto;
  }
`;

function Single(props: SingleProps) {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle} smallLogo={true}>
      <>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <Article>
          <PostHeader
            title={post.frontmatter.title}
            date={post.frontmatter.date}
            tags={post.frontmatter.tags}
            readingTime={post.fields.readingTime.minutes}
          />
          <Content dangerouslySetInnerHTML={{ __html: post.html }} />
          <Footer>
            <Bio />
          </Footer>
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
