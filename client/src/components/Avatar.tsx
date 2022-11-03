import gravatar from 'gravatar';
import { useState } from 'react';
import Image from './Image';

const Avatar = ({ user }: any) => {
  const initials = user.firstName[0] + user.lastName[0];
  const gravatarUrl = gravatar.url(user.email, { s: '64', r: 'x', d: '404' }, true);
  const avatarUi = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=64`;
  const [error, setError] = useState(false);

  const handleError = (err: any) => {
    if (!error) {
      setError(true);
    }
  };

  return (
    <div className="avatar shrink-0">
      <Image
        src={!error ? gravatarUrl : avatarUi}
        alt={`avatar ${user.firstName} ${user.lastName}`}
        className="rounded-full w-12 h-12 md:w-16 md:h-16 transition-all cursor-pointer"
        onError={handleError}
      />
    </div>
  );
};

export default Avatar;
