import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/style.module.css'
import axios from "axios"
import { useRouter } from 'next/router'
import Header from './components/header'
import { useSession } from 'next-auth/react'

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/api/v1/posts", {
                title: title,
                content: content,
            });
            router.push("/");
        } catch(err) {
            alert("投稿に失敗しました")
        }
    }

    return (
        <>
            <Header session={session} />
            <main className={styles.main}>
                <div className={styles.createBox}>
                    <h1 className={styles.pageTitle}>Create New Post</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input
                            type="text"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                        <label>Contents</label>
                        <textarea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        />
                        <button type='submit'>Post</button>
                    </form>

                </div>
            </main>
        </>
    )
}

export default CreatePost