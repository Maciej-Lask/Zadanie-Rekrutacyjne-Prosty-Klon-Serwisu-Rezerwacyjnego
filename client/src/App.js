import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import routes
import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';

import SignUp from './components/pages/SignUp/SignUp';
import SignIn from './components/pages/SignIn/SignIn';
import SignOut from './components/pages/SignOut/SignOut';

import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';
import AdDelete from './components/pages/AdDelete/AdDelete';

import Order from './components/pages/Order/Order';
import MyOrders from './components/pages/MyOrders/MyOrdersPage.js';

import PrivacyPolicy from './components/pages/PrivacyPolicy/PrivacyPolicyPage';
import TermsOfUse from './components/pages/TermsOfUse/TermsOfUsePage';

import Search from './components/pages/Search/Search';

import { logIn } from './redux/usersRedux';

import { fetchAds } from './redux/adsRedux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      dispatch(logIn(userObj));
    } 
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<AdEdit />} />
        <Route path="/ad/delete/:id" element={<AdDelete />} />

        <Route path="/search/:searchPhrase" element={<Search />} />

        <Route path="/order-details/:id" element={<Order />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
