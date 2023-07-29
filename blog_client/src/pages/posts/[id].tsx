import React from 'react'
import { Post } from '@/types'
import { useRouter } from 'next/router'
import styles from '@/styles/style.module.css'
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
                    <div className={styles.detailBox}>
                        <h1 className={styles.blogTitle}>{post.title}</h1>
                        <div className={styles.dateBox}>
                            <div className={styles.postDate}><i className="material-icons">schedule</i>{ new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(post.created_at))}</div>
                            <div className={styles.postDate}><i className="material-icons">update</i>{ new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(post.updated_at))}</div>
                        </div>
                        <img src={post.image_url || '/no-image.jpg'} className={styles.blogImage} />
                        <div className={styles.postContent}>{post.content}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Post