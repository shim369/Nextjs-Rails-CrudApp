import { signIn } from 'next-auth/react'
import { FormEvent } from 'react'

function LoginPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    
    signIn('credentials', { redirect: true, email, password, callbackUrl: `${window.location.origin}/admin` });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name='email' type='text' placeholder='username' />
        <input name='password' type='password' placeholder='password' />
        <button type='submit'>Sign in</button>
      </form>
    </>
  )
}

export default LoginPage