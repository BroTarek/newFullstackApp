'use client';

import AddProductsClient from '@/components/AddProductsClient';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function CategorizedProducts({ params }: { params: { categoryId: string } }) {
  return (
    <Provider store={store}>
      <AddProductsClient params={params} />
    </Provider>
  );
}
