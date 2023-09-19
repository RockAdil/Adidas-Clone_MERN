import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PhotoGallery } from '../components/PhotoGallery';
import { BookingCard } from '../components/BookingCard';

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(`/product/${id}`).then(({ data }) => {
      setProduct(data);
      setReady(true);
    });
  }, []);

  if (!ready) return <div>Loading...</div>;

  return (
    <div className='bg-gray-100 mx-8 mt-8 mb-14 px-8 py-4 rounded-lg shadow-inner'>
      <h1 className='text-2xl font-semibold'>{product.name}</h1>
      <a
        href={`https://maps.google.com/?q=${product.address}`}
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
        {product.address}
      </a>

      <PhotoGallery product={product} />

      <div className='grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div className='py-8'>
          <h2 className='pb-4 text-2xl font-semibold'>Description</h2>
          <p>{product.description}</p>
          <h2 className='pb-4 pt-6 text-2xl font-semibold'>Features</h2>
          {product.perks.length > 0 &&
            product.perks.map((perk, index) => <li key={index}>{perk}</li>)}
        </div>

        <div>
          <BookingCard product={product} />
        </div>
      </div>
    </div>
  );
};
