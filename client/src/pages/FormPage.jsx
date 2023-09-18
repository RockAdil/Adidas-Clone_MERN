import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AccountNav } from '../components/AccountNav';
import { Perks } from '../components/Perks';
import { PhotoUploader } from '../components/PhotoUploader';
import axios from 'axios';

export const FormPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [addPhotos, setAddPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [price, setPrice] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/products/${id}`).then(({ data }) => {
        setName(data.name);
        setAddress(data.address);
        setAddPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setPrice(data.price);
      });
    }
  }, [id]);

  async function savePlace(ev) {
    ev.preventDefault();

    const placeData = {
      name,
      address,
      addPhotos,
      description,
      perks,
      price,
    };

    if (id) {
      await axios.put(`/products/${id}`, placeData);
    } else {
      await axios.post('/products', placeData);
    }

    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to='/account/store' />;
  }

  return (
    <div>
      <AccountNav />

      <form className='px-6 my-6' onSubmit={savePlace}>
        <div className='pb-3'>
          <h2 className='text-base font-medium'>Niche Name</h2>
          <input
            type='text'
            placeholder='Enter shoe name'
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
        </div>

        <div className='pb-3'>
          <h2 className='text-base font-medium'>Address</h2>
          <input
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={ev => setAddress(ev.target.value)}
          />
        </div>

        <PhotoUploader addPhotos={addPhotos} onChange={setAddPhotos} />

        <div className='pb-3'>
          <h2 className='text-base font-medium'>Description</h2>
          <textarea
            className='border border-gray-300 rounded-md'
            placeholder='Enter description'
            rows={5}
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </div>

        <div className='pb-3'>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        <div className='pb-3'>
          <h2 className='text-base font-medium'>Price</h2>
          <input
            type='number'
            placeholder='$00.00'
            value={price}
            onChange={ev => setPrice(ev.target.value)}
          />
        </div>

        <button className='primary mt-4'>Save</button>
      </form>
    </div>
  );
};
