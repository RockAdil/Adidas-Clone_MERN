import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OrdersPage = () => {
  const [purchases, setPurchase] = useState([]);

  useEffect(() => {
    axios.get('/purchase').then(({ data }) => {
      setPurchase(data);
    });
  }, []);

  return (
    <div>
      <h1 className='text-center text-3xl font-semibold'>My Orders</h1>

      {purchases.length > 0 && (
        <div className='flex gap-5 flex-col mt-12 pb-16'>
          {purchases.map((purchase, index) => (
            <Link
              to={`/order/${purchase._id}`}
              key={index}
              className='flex gap-5 mx-10 bg-gray-100 rounded-lg'
            >
              <div className='w-48 h-auto'>
                <img
                  src={`http://127.0.0.1:3000/uploads/${purchase.product.photos[0]}`}
                  alt={purchase.product.photos[index]}
                  className='object-contain rounded-lg'
                />
              </div>
              <div className='flex flex-1 flex-col pt-8'>
                <h2 className='text-xl font-bold'>{purchase.product.name}</h2>

                <h3 className='text-base pt-2'>
                  Quantity: {purchase.quantity}
                </h3>

                <h3 className='flex items-center gap-1 pt-5 text-lg font-medium text-green-500'>
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
                      d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                    />
                  </svg>
                  Price: ${purchase.price}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
