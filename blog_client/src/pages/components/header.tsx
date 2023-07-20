import React from 'react'
import { signIn } from 'next-auth/react'
import styles from '@/styles/Home.module.css'

const header = () => {
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn('google', { callbackUrl: `${window.location.origin}/admin` })
  };

  return (
    <header className={styles.header}>
      <h1>Next.js + Rails Blog</h1>
      <button className={styles.login} onClick={handleLoginClick}>Login</button>
    </header>
  )
}

export default header
