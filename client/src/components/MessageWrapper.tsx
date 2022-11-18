import Message from './Message';
import { getMessages } from '@controllers/MessageController';
import { useQuery } from '@tanstack/react-query';
import { toastError } from '@controllers/Toasts';
import ScrollToBottom from './ScrollToBottom';
import { api } from '../main';

const MessageWrapper = () => {
  const {
    data: messages,
    isLoading,
    isError,
  } = useQuery(['messages'], getMessages, {
    onSuccess: (data) => {
      data.map((message: any) => {
        if (message.image) {
          message.image = api.slice(0, -4) + message.image;
        }
      });
      return data;
    },
    onError: (error) => {
      toastError(error as string);
    },
  });
  
  if (isLoading || isError) {
    return null;
  }

  return (
    <main className="messages-wrapper rounded-md w-full max-w-3xl flex flex-col flex-shrink relative overflow-y-hidden">
      <ScrollToBottom className="message-container flex flex-col gap-4 w-full max-w-3xl overflow-y-scroll overflow-x-hidden pt-4 pb-6 px-2 md:px-0">
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
