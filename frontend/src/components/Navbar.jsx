'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-xl font-bold">
          E-Commerce
        </Link>
        <div className="flex space-x-4">
          <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;