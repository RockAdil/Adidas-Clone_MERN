import { GiRunningShoe } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { AccountNav } from '../components/AccountNav';

export const ProductsPage = () => {
  return (
    <div>
      <AccountNav />
      <div className='flex flex-col items-center'>
        <Link
          to={'/account/store/new'}
          className='inline-flex items-center gap-2 mt-10 bg-black text-white px-4 py-2 rounded-full border hover:bg-white hover:text-black hover:border-black hover:shadow-xl'
        >
          <GiRunningShoe className='text-xl' />
          Add new niche
        </Link>
      </div>
    </div>
  );
};
