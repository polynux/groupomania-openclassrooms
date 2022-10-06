import Message from './Message';
import { getMessages } from '@controllers/MessageController';
import { useQuery } from '@tanstack/react-query';
import { toastError } from '@controllers/Toasts';
import ScrollToBottom from './ScrollToBottom';

const MessageWrapper = () => {
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery(['messages'], getMessages, {
    onError: (error) => {
      toastError(error as string);
    },
  });
  
  if (isLoading || isError) {
    return null;
  }

  return (
    <main className="messages-wrapper rounded-md w-full max-w-3xl flex flex-col max-h-[83vh] relative">
      <ScrollToBottom className="message-container overflow-scroll flex flex-col gap-4 w-full py-4 -mb-3">
        {isLoading
          ? ''
          : isError
          ? ''
          : messages?.map((message: any) => <Message message={message} key={message.id} />)}
      </ScrollToBottom>
    </main>
  );
};

export default MessageWrapper;
