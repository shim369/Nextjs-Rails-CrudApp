import { GetServerSidePropsContext } from 'next';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/style.module.css'
import axios from "axios"
import { useRouter } from 'next/router'
import Header from '../components/header'
import { useSession, getSession } from 'next-auth/react'

type Post = {
    title: string;
    content: string;
    id: string;
};

type Props = {
    post: Post;
};

const EditPost = ({ post }: Props) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const router = useRouter();
    const { data: session } = useSession();


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await axios.put(
            `http://localhost:3001/api/v1/posts/${post.id}`,
            {
              title: title,
              content: content,
            }
          );
          if (response.status === 200) {
            router.push("/");
          } else {
            alert("Error updating post");
          }
        } catch (error) {
          alert("Error updating post");
          console.error(error);
        }
    };

    return (
      <>
      <Header session={session} />
      <main className={styles.main}>
        <div className={styles.createBox}>
            <h1 className={styles.pageTitle}>Edit Blog</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label>Contents</label>
                <textarea
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                />
                <button type='submit'>Edit</button>
            </form>
        </div>
      </main>
    </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  
  // Ensure params exists
  if (!context.params) {
    return {
      notFound: true
    };
  }
  
  const { id } = context.params;
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
  const post = await res.json();

  return {
      props: {
          post,
          session,
      }
  }
}



export default EditPost