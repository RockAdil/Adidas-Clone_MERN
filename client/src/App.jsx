import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import { ProfilePage } from './pages/ProfilePage';
import { ProductsPage } from './pages/ProductsPage';
import { FormPage } from './pages/FormPage';

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/store' element={<ProductsPage />} />
          <Route path='/account/store/new' element={<FormPage />} />
          <Route path='/account/store/:id' element={<FormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
