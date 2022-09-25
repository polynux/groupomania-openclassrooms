import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import Message from "./Message";

const getMessages = async () => {
  const token = new Cookies().get("token");
  const response = await fetch("/api/posts", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const MessageWrapper = () => {
  const messages = useQuery(["messages"], getMessages, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const user = {
    firstName: 'Guillaume',
    lastName: 'Dorce',
    email: 'guillaume.dorce@bm-services.com',
  };

  return (
    <main className="messages-wrapper flex flex-col p-4 gap-4 overflow-scroll w-full max-w-3xl">
      {messages.isLoading ? '' : messages.data?.map((message: any) => (
        <Message user={message.author} text={message.content} image={message.image} date={message.createdAt} id={message.id}/>
      ))}
    </main>
  );
}

export default MessageWrapper;