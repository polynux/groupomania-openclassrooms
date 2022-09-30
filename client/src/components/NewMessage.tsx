import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import {newMessage} from '@controllers/MessageController';

const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const queryClient = useQueryClient();

  const { mutate: send } = useMutation(newMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length === 0 && image.trim().length === 0) {
      return;
    }
    const data = new FormData(e.target as HTMLFormElement);
    send(data);
    setMessage('');
    setImage('');
  };

  return (
    <footer className="new-message bg-grey-dark rounded-xl w-full max-w-3xl p-3 gap-5 shadow-md shadow-grey-dark z-10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="file">
          <label htmlFor="image" className="cursor-pointer block p-2">
            <div className="rounded-full text-grey-dark bg-red-light text-lg p-2">
              <FaPlus className="" />
            </div>
          </label>
          <input type="file" name="image" id="image" accept="image/*" className="hidden" value={image} onChange={e => setImage(e.target.value)} />
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="bg-grey-dark text-white rounded-xl p-2.5 w-full placeholder-red-light"
          id='content'
          name='content'
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
