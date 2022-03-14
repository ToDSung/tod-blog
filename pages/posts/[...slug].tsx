import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

import { join } from "path";

// import Container from "../../components/container";
// import Header from "../../components/header";
// import Layout from "../../components/layout";
// import PostBody from "../../components/post-body";
// import PostHeader from "../../components/post-header";
// import PostTitle from "../../components/post-title";
import { getAllPosts, getPostByPath, POSTS_ROOT_NAME } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";

const Post = ({ post, morePosts, preview }) => {
  console.log("Post");
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>{post.content}</>
    // <Layout preview={preview}>
    //   <Container>
    //     <Header />
    //     {router.isFallback ? (
    //       <PostTitle>Loading…</PostTitle>
    //     ) : (
    //       <>
    //         <article className="mb-32">
    //           <Head>
    //             <title>
    //               {post.title} | Next.js Blog Example with {CMS_NAME}
    //             </title>
    //             <meta property="og:image" content={post.ogImage.url} />
    //           </Head>
    //           <PostHeader
    //             title={post.title}
    //             coverImage={post.coverImage}
    //             date={post.date}
    //             author={post.author}
    //           />
    //           <PostBody content={post.content} />
    //         </article>
    //       </>
    //     )}
    //   </Container>
    // </Layout>
  );
};

export default Post;

export const getStaticProps = async ({ params }) => {
  const path = join(POSTS_ROOT_NAME, ...params.slug) + ".md";
  const post = getPostByPath(path, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");
  // console.log(content);

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split("/"),
        },
      };
    }),
    fallback: false,
  };
};
