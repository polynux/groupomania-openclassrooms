import { Cookies } from 'react-cookie';
import { api } from '../main';

const getMessages = async () => {
  const token = new Cookies().get('token');
  const response = await fetch(api + '/posts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

const newMessage = async (data: FormData) => {
  const token = new Cookies().get('token');
  const response = await fetch(api + '/posts/new', {
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
  const response = await fetch(`${api}/posts/delete/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const editMessage = async (id: string, data: FormData) => {
  const token = new Cookies().get('token');
  const response = await fetch(`${api}/posts/edit/${id}`, {
    method: 'PUT',
    body: data,
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export { getMessages, newMessage, deleteMessage, editMessage };
