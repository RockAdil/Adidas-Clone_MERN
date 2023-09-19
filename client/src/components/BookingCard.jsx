import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export const BookingCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  const price = product.price * quantity;

  function handlePurchase() {
    axios
      .post('/purchase', { quantity, name, phone, price, product: product._id })
      .then(({ data }) => {
        setRedirect(`/order/${data._id}`);
      });
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='my-6 px-4 py-4 bg-white border rounded-xl shadow-md'>
      <h3 className='text-center text-2xl font-medium pb-8'>Booking</h3>
      <div className='flex items-center'>
        <h4 className='text-xl font-normal pr-2'>Price:</h4>
        <p className='text-lg font-normal'>
          ${product.price}/ <span>per pair</span>
        </p>
      </div>
      <h4 className='pt-4 text-lg'>Quantity</h4>
      <input
        type='number'
        value={quantity}
        onChange={ev => setQuantity(ev.target.value)}
      />
      <h4 className='pt-4 text-lg'>Full Name</h4>
      <input
        type='text'
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      <h4 className='pt-4 text-lg'>Phone Number</h4>
      <input
        type='number'
        placeholder='+91'
        value={phone}
        onChange={ev => setPhone(ev.target.value)}
      />

      <button className='primary my-6' onClick={handlePurchase}>
        Purchase{' '}
        <span className='font-medium'>${product.price * quantity}</span>
      </button>
    </div>
  );
};
