import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';

export default function BlogListPageWrapper(props) {
  const blogTitle = props?.metadata?.blogTitle;
  return (
    <>
      {blogTitle && <h1 className="sr-only">{blogTitle}</h1>}
      <BlogListPage {...props} />
    </>
  );
}
