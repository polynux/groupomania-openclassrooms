import { Cookies } from 'react-cookie';

const token = new Cookies().get('token');

const getMeInfo = async () => {
  const response = await fetch('/api/me', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

const signup = async (formData: FormData) => {
  const form = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    'password-confirm': formData.get('password-confirm') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
  };

  if (form.password !== form['password-confirm']) {
    throw 'Passwords do not match';
  }

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(form),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data.error) {
    throw data.error;
  }
  return data;
};

export const giveUserRights = async (userId: string, role: string) => {
  const response = await fetch(`/api/users/${userId}/roles`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) {
    return {error: response.statusText};
  }
  const data = await response.json();
  if (data.error) {
    return {error: data.error};
  }
  return data;
};

export { getMeInfo, login, signup };
