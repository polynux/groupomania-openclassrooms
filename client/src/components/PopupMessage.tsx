import { useEffect, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

const PopupMessage = ({ id }: { id: string }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClick = (e: any) => {
      console.log(show && e.target.closest('.popup-btn'));
      if ((show && !e.target.closest('.popup-btn') || (e.target.closest('.popup') && !e.target.closest('.popup-btn')))) {
        setShow(false);
      }
    };

    document.addEventListener('click', handleClick);
  }, [id]);

  return (
    <>
      <div className="bg-grey-dark">
        <div
          className="popup-btn cursor-pointer rounded-full hover:bg-grey-light transition-all"
          onClick={() => setShow(!show)}
        >
          <FaEllipsisH className="fill-grey-light hover:fill-grey-dark transition-all text-xl w-10 h-10 p-2.5" />
        </div>
      </div>
      <div className={'popup absolute z-10 right-0 top-8 bg-grey-dark shadow-lg shadow-slate-900 rounded-xl p-2' + (show ? '' : ' hidden')}>
        <div className="popup-content space-y-2">
          <div className="popup-item text-white rounded-xl p-2 transition-all hover:cursor-pointer hover:bg-grey-light hover:text-grey-dark">Modifier</div>
          <div className="popup-item text-red rounded-xl p-2 transition-all hover:cursor-pointer hover:text-white hover:bg-red">Supprimer</div>
        </div>
      </div>
    </>
  );
};

export default PopupMessage;
