import AppHeader from '@components/AppHeader';
import Message from '@components/Message';
import NewMessage from '@components/NewMessage';

const Home = () => {
  const user = {
    firstName: 'Guillaume',
    lastName: 'Dorce',
    email: 'guillaume.dorce@bm-services.com',
  };

  return (
    <div className="min-h-full max-h-full bg-grey flex flex-col items-center">
      <AppHeader />
      <main className="messages-wrapper flex flex-col-reverse p-4 gap-4 overflow-scroll">
        <Message
          user={user}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget
        aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet
        mauris. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquet nisl, eget
        aliquam nisl nisl sit amet mauris. Donec auctor, nisl eget aliquam tincidunt,
        nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet mauris."
          date="14 août 2022 19:00"
        />
        <Message
          user={user}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget
        aliquam tincidunt, nisl nisl aliquet nisl, eget aliquam nisl nisl sit amet
        mauris."
          date="14 août 2022 19:00"
          image="https://picsum.photos/800/600"
        />
        <Message user={user} date="14 août 2022 19:00" image="https://picsum.photos/1200/800" />
      </main>
      <NewMessage />
    </div>
  );
};

export default Home;
