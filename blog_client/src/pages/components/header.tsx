import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

const header = () => {

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Next.js + Rails Blog</h1>
      <div className={styles.headerLinks}>
        <Link href="/login">Log in</Link>
      </div>
    </header>
  )
}

export default header
