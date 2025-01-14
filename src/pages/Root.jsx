import { Outlet } from 'react-router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const Root = () => {
  return (
    <>
      <header className='sticky top-0 z-50 bg-base-300/30 backdrop-blur'>
        <Navbar />
      </header>
      <main className='min-h-screen w-screen'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;