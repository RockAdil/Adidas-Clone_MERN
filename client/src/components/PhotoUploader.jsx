import { useState } from 'react';
import axios from 'axios';

export const PhotoUploader = ({ addPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    await axios.post('/upload-by-link', {
      link: photoLink,
    });
    let filename = photoLink.split('/');
    filename = filename.slice(-1).join('');

    onChange([...addPhotos, filename]);
    setPhotoLink('');
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios
      .post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const { data: filenames } = res;
        onChange([...addPhotos, ...filenames]);
      });
  }

  function handleDeletePhoto(ev, photoName) {
    ev.preventDefault();
    return onChange([...addPhotos.filter(photo => photo !== photoName)]);
  }

  function handleSetCoverPhoto(ev, photoName) {
    ev.preventDefault();
    return onChange([
      photoName,
      ...addPhotos.filter(photo => photo != photoName),
    ]);
  }

  return (
    <div>
      <div className='flex-col'>
        <h2 className='text-base font-medium'>Add Link</h2>
        <div className='flex'>
          <input
            type='text'
            placeholder='Add using a link ...jpg'
            value={photoLink}
            onChange={ev => setPhotoLink(ev.target.value)}
          />
          <button
            className='px-2 h-12 border bg-gray-300 rounded-r-lg'
            onClick={addPhotoByLink}
          >
            Add&nbsp;Link
          </button>
        </div>
      </div>

      <div className='mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 pb-4'>
        {addPhotos.length > 0 &&
          addPhotos.map((photo, index) => (
            <div key={index} className='relative'>
              <img
                src={`http://127.0.0.1:3000/uploads/${photo}`}
                alt={index + photo}
                className='w-full h-40 object-cover rounded-md'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8 p-1.5 absolute bottom-2 left-2 bg-opacity-50 bg-black text-white rounded-full cursor-pointer'
                onClick={ev => handleSetCoverPhoto(ev, photo)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                />
              </svg>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-8 h-8 p-1.5 absolute bottom-2 right-2 bg-opacity-50 bg-black text-white rounded-full cursor-pointer'
                onClick={ev => handleDeletePhoto(ev, photo)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </div>
          ))}

        <label className='h-40 flex gap-1 justify-center items-center border-2 border-gray-300 rounded-xl  cursor-pointer'>
          <input
            type='file'
            multiple
            className='hidden'
            onChange={uploadPhoto}
          />
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
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};
