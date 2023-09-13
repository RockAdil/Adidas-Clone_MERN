import { CgAdidas } from 'react-icons/cg';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

export const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='px-8 py-6 flex justify-between items-center'>
      <div className='flex items-center'>
        <CgAdidas className='text-6xl' />
        <a href='/' className='text-3xl px-2'>
          Adidas
        </a>
      </div>

      <div className='flex gap-7 uppercase'>
        <a href=''>Men</a>
        <a href=''>Women</a>
        <a href=''>Kids</a>
        <a href=''>Sports</a>
        <a href=''>Brand</a>
        <a href=''>Lifestyle</a>
        <a href=''>Outlet</a>
      </div>

      <div className='flex gap-4 items-center'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search'
            className='placeholder-black'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 absolute bottom-3 right-3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-7 h-7'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        <Link to={'/login'} className='flex items-center'>
          <AiOutlineUser className='text-[28px]' />
          {user && <h3 className='text-lg'>{user.name}</h3>}
        </Link>
      </div>
    </div>
  );
};
