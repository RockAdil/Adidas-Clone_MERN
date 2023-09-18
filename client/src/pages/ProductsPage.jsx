import { GiRunningShoe } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { AccountNav } from '../components/AccountNav';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/user-products').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='flex justify-center'>
        <Link
          to={'/account/store/new'}
          className='inline-flex items-center gap-2 mt-10 bg-black text-white px-4 py-2 rounded-full border hover:bg-white hover:text-black hover:border-black hover:shadow-xl'
        >
          <GiRunningShoe className='text-xl' />
          Add new niche
        </Link>
      </div>

      {products.length > 0 && (
        <div className='flex gap-5 flex-col mt-12 pb-16'>
          {products.map((product, index) => (
            <Link
              to={`/account/store/${product._id}`}
              key={index}
              className='flex gap-5 mx-10 bg-gray-100 rounded-lg'
            >
              <div className='w-48 h-auto'>
                <img
                  src={`http://127.0.0.1:3000/uploads/${product.photos[0]}`}
                  alt={product.photos[index]}
                  className='object-contain rounded-lg'
                />
              </div>
              <div className='flex flex-1 flex-col justify-center'>
                <h2 className='text-xl font-bold'>{product.name}</h2>

                <div className='flex gap-1 py-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                    />
                  </svg>
                  <h3>{product.address}</h3>
                </div>

                <p>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
