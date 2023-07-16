import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/Post.module.css'
import axios from "axios"
import { useRouter } from 'next/router';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

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
        <div className={styles.container}>
            <h1>ブログ新規登録</h1>
            <form onSubmit={handleSubmit}>
                <label>タイトル</label>
                <input
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <label>本文</label>
                <textarea
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                />
                <button type='submit'>投稿</button>
            </form>

        </div>
    )
}

export default CreatePost