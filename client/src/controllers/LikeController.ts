import { Cookies } from "react-cookie";
import { api } from "../main";

const likePost = async (id: string) => {
  const token = new Cookies().get('token');
  const response = await fetch(`${api}/posts/like/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

const unlikePost = async (id: string) => {
  const token = new Cookies().get('token');
  const response = await fetch(`${api}/posts/unlike/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

export { likePost, unlikePost };