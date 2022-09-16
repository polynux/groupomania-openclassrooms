import AppHeader from '@components/AppHeader';
import Message from '@components/Message';

const Home = () => {
  const user = {
    firstName: 'Guillaume',
    lastName: 'Dorce',
    email: 'guillaume.dorce@bm-services.com',
  };

  return (
    <div className="min-h-full bg-grey">
      <AppHeader />
      <main className="flex flex-col items-center p-4 gap-4">
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
        <Message
          user={user}
          date="14 août 2022 19:00"
          image="https://picsum.photos/1200/800"
        />
      </main>
    </div>
  );
};

export default Home;
