import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth' 

const Header = ({ session: serverSession }: { session: Session | null | undefined }) => {
  const { data: clientSession } = useSession()
  const session = serverSession || clientSession
  const router = useRouter()

  const handleSignOut = () => {
    signOut({ callbackUrl: 'http://localhost:3000' })
  }
  const handleSignIn = () => {
    router.push('/login')
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Next.js + Rails Blog</h1>
      <div className={styles.headerLinks}>
        { session ? 
          (<button onClick={handleSignOut}>Log out</button>) :
          (<button onClick={handleSignIn}>Log in</button>) // <-- This button will navigate to /login
        }
      </div>
    </header>
  )
}

export default Header