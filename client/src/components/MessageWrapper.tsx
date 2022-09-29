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

  return (
    <main className="messages-wrapper flex flex-col gap-4 pb-6 pt-4 -mb-4 overflow-scroll w-full max-w-3xl rounded-md">
      {messages.isLoading ? '' : messages.data?.map((message: any) => (
        <Message message={message} key={message.id}/>
      ))}
    </main>
  );
}

export default MessageWrapper;