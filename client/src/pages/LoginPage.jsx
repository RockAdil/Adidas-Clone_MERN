import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });

      setUser(data);
      alert('Login Successful!');
      setRedirect(true);
    } catch (e) {
      alert('Login Failed!');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mt-4 grow flex justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-xl mx-auto' onSubmit={handleLoginSubmit}>
          <input
            type='text'
            placeholder='your@email.com'
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className='primary'>Login</button>
          <p className='text-center mt-2'>
            Don&apos;t have an account yet?{' '}
            <Link to={'/register'}>
              <span className='underline'>Register now</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
