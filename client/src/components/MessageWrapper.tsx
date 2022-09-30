import Message from "./Message";
import { useMessages } from "@controllers/MessageController";

const MessageWrapper = () => {
  const {messages, isLoading} = useMessages();

  return (
    <main className="messages-wrapper flex flex-col gap-4 pb-6 pt-4 -mb-4 overflow-scroll w-full max-w-3xl rounded-md">
      {isLoading ? '' : messages?.map((message: any) => (
        <Message message={message} key={message.id}/>
      ))}
    </main>
  );
}

export default MessageWrapper;