import { useState } from 'react';
import { signIn } from 'next-auth/react'
import axios from 'axios';

export default function LoginPage() {
  const [isEmailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleEmailSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  const handlePasswordSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/api/sessions', { email, password });
    if (response.status === 200) {
      signIn('credentials', { 
        email, 
        password, 
        callbackUrl: `${window.location.origin}/admin` 
      }).then(() => {
        // ログインが成功したら/adminにリダイレクト
        window.location.href = "/admin";
      });
    } else {
      setLoginError("Invalid email or password");
    }
  };  

  return (
    <div>
      <h1>Welcome back</h1>
      {!isEmailSubmitted ? (
        <form onSubmit={handleEmailSubmit}>
          <div><input 
            name='email' 
            type='email' 
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          /></div>
          <button type='submit'>Continue</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <input 
            name='password' 
            type='password' 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p>{loginError}</p>}
          <button type='submit'>Submit</button>
        </form>
      )}
      <p>--- OR ---</p>
      <button onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/admin` })}>
        Continue with Google
      </button>
    </div>
  )
}
