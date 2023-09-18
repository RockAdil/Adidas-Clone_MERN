import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(ev) {
    ev.preventDefault();
    try {
      axios.post('/register', { name, email, password }).then(() => {
        setRedirect(true);
        alert('You have successfully registered! Please login to continue.');
      });
    } catch {
      alert('Register failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='mt-4 grow flex justify-around items-center'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-xl mx-auto' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='enter your name'
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
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
          <button className='primary'>Register</button>
          <p className='text-center mt-2'>
            Don&apos;t have an account yet?{' '}
            <Link to={'/login'}>
              <span className='underline'>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
