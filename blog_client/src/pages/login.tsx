import { useState } from 'react';
import { signIn } from 'next-auth/react'
import axios from 'axios';
import styles from '@/styles/style.module.css'

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
    try {
      const response = await axios.post('http://localhost:3001/api/sessions', { email, password });
      console.log(response);
      if (response.status === 200) {
        signIn('credentials', { 
          email, 
          password, 
          callbackUrl: `${window.location.origin}/admin` 
        }).catch((error) => {
          console.error(error);
          setLoginError("An unexpected error occurred");
        });
      } else {
        setLoginError("Invalid email or password");
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setLoginError("An unexpected error occurred");
    }
  };
 
  

  return (
    <main className={styles.main}>
      <div className={styles.loginBox}>
        <h1 className={styles.pageTitle}>Welcome back</h1>
        {!isEmailSubmitted ? (
          <EmailInputForm handleEmailSubmit={handleEmailSubmit} email={email} setEmail={setEmail} />
        ) : (
          <PasswordInputForm handlePasswordSubmit={handlePasswordSubmit} password={password} setPassword={setPassword} loginError={loginError} />
        )}
        <p>--- OR ---</p>
        <button onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/admin` })}>
          Continue with Google
        </button>
      </div>
    </main>
  )
}

type EmailInputFormProps = {
  handleEmailSubmit: (e: { preventDefault: () => void }) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const EmailInputForm: React.FC<EmailInputFormProps> = ({ handleEmailSubmit, email, setEmail }) => (
  <form onSubmit={handleEmailSubmit}>
    <div><input 
      name='email' 
      type='email' 
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    /></div>
    <button type='submit'>Continue</button>
  </form>
);

type PasswordInputFormProps = {
  handlePasswordSubmit: (e: { preventDefault: () => void }) => Promise<void>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loginError: string | null;
};

const PasswordInputForm: React.FC<PasswordInputFormProps> = ({ handlePasswordSubmit, password, setPassword, loginError }) => (
  <form onSubmit={handlePasswordSubmit}>
    <input 
      name='password' 
      type='password' 
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    {loginError && <p>{loginError}</p>}
    <button type='submit'>Submit</button>
  </form>
);
