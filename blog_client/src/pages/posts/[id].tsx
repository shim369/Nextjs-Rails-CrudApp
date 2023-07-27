import React from 'react'
import { Post } from '@/types'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import { useSession } from 'next-auth/react'

type Props = {
    post: Post;
};

export async function getStaticPaths() {
    const res = await fetch("http://localhost:3001/api/v1/posts");
    const posts: Post[] = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
    const post = await res.json();
  
    return {
      props: {
        post,
      },
      revalidate: 60,
    }
}

const Post = ({ post }: Props) => {
    const router = useRouter();
    const { data: session } = useSession();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Header session={session} />
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.blogTitle}>{post.title}</h1>
                <div className={styles.blogCreatedDate}>{post.created_at}</div>
                <div className={styles.blogUpdatedDate}>{post.updated_at}</div>
                <div className={styles.blogContent}>{post.content}</div>
            </div>
        </main>
    </>
    )
}

export default Post