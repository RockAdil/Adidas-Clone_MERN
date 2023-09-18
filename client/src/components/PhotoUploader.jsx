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
            <div key={index}>
              <img
                src={`http://127.0.0.1:3000/uploads/${photo}`}
                alt={index + photo}
                className='w-full h-40 object-cover rounded-md'
              />
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
