'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import ReactQueryProvider from '@/components/Providers';
import AmazonHeader from '@/components/AmazonHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ReactQueryProvider>
                <AmazonHeader />
                <main className="min-h-screen">
                    {children}
                </main>
            </ReactQueryProvider>
        </Provider>
    );
}
