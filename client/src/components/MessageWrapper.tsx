import Message from "./Message";
import { getMessages } from "@controllers/MessageController";
import { useQuery } from "@tanstack/react-query";
import { toastError } from "@controllers/Toasts";

const MessageWrapper = () => {
  const { data: messages, isLoading, isError } = useQuery(["messages"], getMessages, {
    onError: (error) => {
      toastError(error as string);
    },
  });

  return (
    <main className="messages-wrapper flex flex-col gap-4 pb-6 pt-4 -mb-4 overflow-scroll w-full max-w-3xl rounded-md">
      {isLoading ? '' : isError ? '' : messages?.map((message: any) => (
        <Message message={message} key={message.id}/>
      ))}
    </main>
  );
}

export default MessageWrapper;