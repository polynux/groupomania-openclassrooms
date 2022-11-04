import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { newMessage } from '@controllers/MessageController';

const NewMessage = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState('');

  const handleImageSelect = (e: any) => {
    setImage(e.target.value);
    const file = e.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setPreview(src);
    }
  };

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
    setPreview('');
  };

  const handleRemoveImage = () => {
    setImage('');
    setPreview('');
  };

  return (
    <footer className="new-message z-10 flex justify-center w-full">
      <div className="w-full max-w-3xl">
        {preview !== '' && (
          <div className="image-preview w-fit rounded-xl bg-grey-dark p-3 absolute bottom-20 shadow-md shadow-grey-dark">
            <img src={preview} alt="Image" className="rounded-lg max-w-xs max-h-48" />
            <span className="rounded-full text-grey-light bg-grey-dark text-lg p-2 block absolute -top-4 -right-4 cursor-pointer shadow-md shadow-slate-800 hover:text-grey-dark hover:bg-grey-light transition-all" onClick={handleRemoveImage}>
              <FaTimes className="" />
            </span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 bg-grey-dark rounded-xl p-2 mx-2 sm:p-3 md:mx-0 shadow-md shadow-grey-dark"
        >
          <div className="file">
            <label htmlFor="image" className="cursor-pointer block p-2">
              <span className="rounded-full text-grey-dark bg-red-light text-lg p-2 block">
                <FaPlus className="" />
              </span>
              <span className="sr-only">Ajouter une image</span>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="hidden"
              {...(image !== '' && { value: image })}
              onChange={handleImageSelect}
            />
          </div>

          <div className="new-message flex-grow">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="bg-grey-dark text-white rounded-xl p-2.5 w-full placeholder-red-light"
              id="content"
              name="content"
            />
            <label htmlFor="content" className="sr-only">
              Message
            </label>
          </div>
          <button
            type="submit"
            className="rounded-md border border-red bg-red py-2 px-4 text-sm font-medium text-white hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2"
          >
            Envoyer
          </button>
        </form>
      </div>
    </footer>
  );
};

export default NewMessage;
