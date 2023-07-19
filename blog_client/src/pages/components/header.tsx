import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const header = () => {
  return (
    <header className={styles.header}>
      <h1>Next.js + Rails Blog</h1>
      <Link href="./LoginPage" className={styles.login}>Login</Link>
    </header>
  )
}

export default header