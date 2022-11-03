import gravatar from 'gravatar';
import { useState } from 'react';
import Image from './Image';

const Avatar = ({ user }: any) => {
  const initials = user.firstName[0] + user.lastName[0];
  const gravatarUrl = gravatar.url(user.email, { s: '64', r: 'x', d: '404' }, true);
  const avatarUi = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=64`;
  const [avatar, setAvatar] = useState(avatarUi);
  const [firstLoad, setFirstLoad] = useState(true);

  if (firstLoad) {
    fetch(gravatarUrl)
      .then((response) => {
        if (response.ok) {
          setAvatar(gravatarUrl);
        }
        setFirstLoad(false);
      })
      .catch((e) => {
        setFirstLoad(false);
      });
  }

  return (
    <div className="avatar shrink-0">
      <Image
        src={avatar}
        alt="avatar"
        className="rounded-full w-12 h-12 md:w-16 md:h-16 transition-all cursor-pointer"
      />
    </div>
  );
};

export default Avatar;
