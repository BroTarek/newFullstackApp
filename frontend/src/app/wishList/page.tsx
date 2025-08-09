'use client';

import React, { useEffect } from 'react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import WishListClient from '@/components/WishListClient';
const Page = () => {
  return (
    <Provider store={store}>
      <WishListClient />
    </Provider>
  );
};
export default Page;

