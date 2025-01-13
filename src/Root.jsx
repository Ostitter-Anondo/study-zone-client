import { Outlet } from 'react-router';
import Footer from './pages/components/Footer';

const Root = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;