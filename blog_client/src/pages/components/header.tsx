import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth' 

const Header = ({ session: serverSession }: { session: Session | null | undefined }) => {
  const { data: clientSession } = useSession()
  const session = serverSession || clientSession

  const handleSignOut = () => {
    signOut({ callbackUrl: 'http://localhost:3000' })
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Next.js + Rails Blog</h1>
      <div className={styles.headerLinks}>
        { session ? 
          (<button onClick={handleSignOut}>Log out</button>) :
          (<Link href="/login">Log in</Link>)
        }
      </div>
    </header>
  )
}

export default Header