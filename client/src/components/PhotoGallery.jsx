import { useState } from 'react';

export const PhotoGallery = ({ product }) => {
  const [showPhotos, setShowPhotos] = useState(false);

  if (showPhotos) {
    return (
      <div className='absolute inset-0 bg-black max-h-screen'>
        <div className='p-8 grid gap-6 bg-black'>
          <div className='pb-4'>
            <h2 className='mr-40 text-3xl text-white'>{product.name}</h2>
            <button
              onClick={() => setShowPhotos(false)}
              className='fixed right-12 top-8 flex bg-white hover:bg-opacity-80 px-4 py-2 rounded-2xl shadow shadow-black'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                  clipRule='evenodd'
                />
              </svg>
              Close Photos
            </button>
          </div>
          {product.photos.map((photo, index) => (
            <div key={index}>
              <img
                className='w-full h-screen object-contain'
                src={`http://127.0.0.1:3000/uploads/${photo}`}
                alt={photo}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl shadow-gray-400 shadow-md overflow-hidden relative'>
      <div>
        {product.photos.length > 0 && (
          <img
            src={`http://127.0.0.1:3000/uploads/${product.photos[0]}`}
            alt={product.photos[0]}
            className='aspect-square object-cover w-full h-[60vh] cursor-pointer'
            onClick={() => setShowPhotos(true)}
          />
        )}
      </div>

      <div className='grid'>
        {product.photos?.[1] && (
          <img
            src={`http://127.0.0.1:3000/uploads/${product.photos[1]}`}
            alt={product.photos[1]}
            className='aspect-square object-cover w-full h-[30vh] cursor-pointer'
            onClick={() => setShowPhotos(true)}
          />
        )}
        <div className='overflow-hidden'>
          {product.photos?.[2] && (
            <img
              src={`http://127.0.0.1:3000/uploads/${product.photos[2]}`}
              alt={product.photos[2]}
              className='aspect-square  object-cover relative top-2 w-full h-[30vh] cursor-pointer'
              onClick={() => setShowPhotos(true)}
            />
          )}
        </div>
      </div>
      <div className='grid'>
        {product.photos?.[3] && (
          <img
            src={`http://127.0.0.1:3000/uploads/${product.photos[3]}`}
            alt={product.photos[3]}
            className='aspect-square object-cover w-full h-[30vh] cursor-pointer'
            onClick={() => setShowPhotos(true)}
          />
        )}
        <div className='overflow-hidden'>
          {product.photos?.[4] && (
            <img
              src={`http://127.0.0.1:3000/uploads/${product.photos[4]}`}
              alt={product.photos[4]}
              className='aspect-square  object-cover relative top-2 w-full h-[30vh] cursor-pointer'
              onClick={() => setShowPhotos(true)}
            />
          )}
        </div>
      </div>

      {product.photos.length > 5 && (
        <button
          className='absolute flex gap-2 bottom-4 right-4 bg-black text-white opacity-70 py-1 px-2 rounded-lg cursor-pointer'
          onClick={() => setShowPhotos(true)}
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
              d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
          Show all images
        </button>
      )}
    </div>
  );
};
