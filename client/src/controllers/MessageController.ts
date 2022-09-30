import { useState } from 'react';
import { Cookies } from 'react-cookie';

const getMessages = async () => {
  const token = new Cookies().get('token');
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchMessages = () => {
    getMessages()
      .then((messagesData) => {
        setMessages(messagesData);
        setIsLoading(false);
      })
      .catch((errorMsg) => {
        setIsError(true);
        setError(errorMsg);
      });
  };

  if (isLoading) {
    fetchMessages();
  }

  return { messages, isLoading, isError, error };
};

const newMessage = async (data: FormData) => {
  const token = new Cookies().get('token');
  const response = await fetch('/api/posts/new', {
    method: 'POST',
    body: data,
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const deleteMessage = async (id: string) => {
  const token = new Cookies().get('token');
  const response = await fetch(`/api/posts/delete/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const editMessage = async (id: string, data: FormData) => {
  const token = new Cookies().get('token');
  const response = await fetch(`/api/posts/edit/${id}`, {
    method: 'PUT',
    body: data,
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export { getMessages, newMessage, deleteMessage, editMessage, useMessages };
