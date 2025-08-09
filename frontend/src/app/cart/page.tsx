'use client';

import React, { useEffect } from 'react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import CartClient from '@/components/CartClient';
const Page = () => {
  return (
    <Provider store={store}>
      <CartClient />
    </Provider>
  );
};
export default Page;

