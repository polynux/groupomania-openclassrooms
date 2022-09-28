import { Cookies } from "react-cookie";

const getMessages = async () => {
  const token = new Cookies().get('token');
  const response = await fetch('/api/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
};

const newMessage = async (data: FormData) => {
  const token = new Cookies().get('token');
  let body;
  if (data.get('image')) {
    body = data;
  } else {
    body = JSON.stringify({
      content: data.get('content')
    });
  }

  const response = await fetch('/api/posts/new', {
    method: 'POST',
    body,
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};

const deleteMessage = async (id: string) => {
  const token = new Cookies().get('token');
  return fetch(`/api/posts/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
};

const editMessage = async (id: string, data: FormData) => {
  const token = new Cookies().get('token');
  let body;
  if (data.get('image')) {
    body = data;
  } else {
    body = JSON.stringify({
      content: data.get('content')
    });
  }

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  return response.json();
};

export { getMessages, newMessage, deleteMessage, editMessage };