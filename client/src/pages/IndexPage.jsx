import axios from 'axios';
import { useEffect, useState } from 'react';

export const IndexPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products').then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className='grid gap-x-6 gap-y-8 px-8 pb-12  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 '>
      {products.length > 0 &&
        products.map((product, index) => (
          <div key={index} className='bg-gray-100 border shadow-md rounded-md'>
            <div>
              {product.photos?.[0] && (
                <img
                  src={`http://127.0.0.1:3000/uploads/${product.photos[0]}`}
                  alt={product.photos[0]}
                  className='rounded-t-lg'
                />
              )}
            </div>

            <div className='mt-3 px-4 pb-3'>
              <h3 className='flex text-sm'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 -ml-1'
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

                {product.address}
              </h3>
              <h2 className='text-lg font-semibold py-1'>{product.name}</h2>
              <p className='text-green-500  font-semibold py-1'>
                Price: ${product.price}{' '}
                <span className='text-black text-sm font-normal italic'>
                  / per pair
                </span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
