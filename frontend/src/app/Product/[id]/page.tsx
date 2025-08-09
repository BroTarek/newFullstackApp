'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import ProductClient from '@/components/ProductClient';

export default function CategorizedProducts({ params }: { params: { id: string } }) {
  return (
    <Provider store={store}>
      <ProductClient params={params} />
    </Provider>
  );
}
