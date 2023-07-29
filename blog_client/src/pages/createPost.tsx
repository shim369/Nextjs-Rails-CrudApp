import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '@/styles/style.module.css'
import axios from "axios"
import { useRouter } from 'next/router'
import Header from './components/header'
import { useSession } from 'next-auth/react'

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('post[title]', title);
            formData.append('post[content]', content);
            if (image) formData.append('post[image]', image);
        
            const config = {
              headers: {
                'content-type': 'multipart/form-data'
              }
            };
        
            await axios.post("http://localhost:3001/api/v1/posts", formData, config);
            router.push("/");
        } catch(err) {
            alert("投稿に失敗しました")
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImage(e.target.files[0]);
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
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button type='submit'>Post</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default CreatePost