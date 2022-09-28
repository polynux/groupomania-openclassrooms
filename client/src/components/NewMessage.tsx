import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const NewMessage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
  };

  return (
    <footer className="new-message bg-grey-dark rounded-xl w-full max-w-3xl p-3 gap-5 shadow-md shadow-grey-dark -mt-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="bg-grey-dark text-white rounded-xl p-2.5 w-full placeholder-red-light"
        />
        <button
          type="submit"
          className="rounded-md border border-red bg-red py-2 px-4 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
        >
          Envoyer
        </button>
      </form>
    </footer>
  );
};

export default NewMessage;