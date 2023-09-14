import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AccountNav } from '../components/AccountNav';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { ProductsPage } from './ProductsPage';

export const ProfilePage = () => {
  let { subpage } = useParams();

  const [redirect, setRedirect] = useState(false);

  const { user, setUser } = useContext(UserContext);

  subpage === undefined ? (subpage = 'profile') : subpage;

  async function handleLogOut() {
    await axios.post('/logout');
    setRedirect(true);
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav />

      {/* My Profile Page */}
      {subpage === 'profile' && (
        <div className='flex flex-col items-center mt-12'>
          <h4>
            Welcome {user?.name}, you&apos;re logged in with{' '}
            <strong>{user?.email}</strong>
          </h4>

          <button className='primary max-w-sm my-4' onClick={handleLogOut}>
            Log out
          </button>
        </div>
      )}

      {/* My Store Page */}
      {/* {subpage === 'store' && <ProductsPage />} */}
    </div>
  );
};
