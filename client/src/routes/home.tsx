import AppHeader from '@components/AppHeader';
import MessageWrapper from '@components/MessageWrapper';
import NewMessage from '@components/NewMessage';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  return (
    <div className="min-h-full max-h-full bg-grey flex flex-col items-center">
      <AppHeader />
      <MessageWrapper />
      <NewMessage />
    </div>
  );
};

export default Home;
