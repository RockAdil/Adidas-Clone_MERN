import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhotoGallery } from '../components/PhotoGallery';

export const OrderPage = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(`/purchase/${id}`).then(({ data }) => {
      setPurchase(data);
      setReady(true);
      console.log(data);
    });
  }, [id]);

  if (!ready) return <div>Loading...</div>;

  return (
    <div className='px-8 py-12'>
      <h1 className='text-2xl font-semibold'>{purchase.product.name}</h1>
      <a
        href={`https://maps.google.com/?q=${purchase.product.address}`}
        target='_blank'
        rel='noreferrer'
        className='flex py-3 font-semibold underline'
      >
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
        {purchase.product.address}
      </a>

      <div className='flex justify-between bg-gray-200 mt-6 mb-9 px-8 py-4 rounded-lg shadow-inner'>
        <div>
          <h3 className='text-lg font-medium mb-2'>Your order information</h3>
          <h4>Quantity: {purchase.quantity}</h4>
        </div>
        <div className='bg-black p-4 text-white font-medium text-center rounded-xl'>
          <h2>Total Price</h2>
          <h3>${purchase.price}</h3>
        </div>
      </div>

      <PhotoGallery product={purchase.product} />
    </div>
  );
};
