import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/Post.module.css'
import axios from "axios"
import { useRouter } from 'next/router'

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
        <div className={styles.container}>
            <h1>ブログ編集</h1>
            <form onSubmit={handleSubmit}>
                <label>タイトル</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label>本文</label>
                <textarea
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                />
                <button type='submit'>編集</button>
            </form>

        </div>
    )
}

export async function getServerSideProps(context: any) {
    const { id } = context.params;
    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
    const post = await res.json();

    return {
        props: {
            post,
        }
    }
}


export default EditPost