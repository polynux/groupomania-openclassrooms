import { Cookies } from 'react-cookie';

const getMeInfo = async () => {
  const token = new Cookies().get('token');

  const response = await fetch('/api/me', {
    method: 'GET',
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

const login = async ({ email, password }: { email: string; password: string }) => {
  const token = new Cookies().get('token');

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
  const token = new Cookies().get('token');

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
  const token = new Cookies().get('token');
  
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

export const changeUserInfo = async (userId: string, formData: FormData) => {
  const token = new Cookies().get('token');

  const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const password = formData.get('password');

    if (!firstName || !lastName || !password) {
      throw {error: 'Les champs ne peuvent pas être vides'};
    }

    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');    

    if (newPassword) {
      if (newPassword === password) {
        throw {error: 'Le nouveau mot de passe doit être différent de l\'ancien'};
      }
      // regex to check if password is strong enough
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(newPassword as string)) {
        throw {error: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'};
      }

      if (newPassword !== confirmPassword) {
        throw {error: 'Les mots de passe ne correspondent pas'};
      }
    }

  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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
