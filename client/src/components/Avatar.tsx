import gravatar from 'gravatar';
import { useState } from 'react';

const Avatar = ({ user }: any) => {
  const initials = user.firstName[0] + user.lastName[0];
  const gravatarUrl = gravatar.url(user.email, { s: '64', r: 'x', d: '404' }, true);
  const avatarUi = `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff&size=64`;
  const [avatar, setAvatar] = useState(avatarUi);
  const [firstLoad, setFirstLoad] = useState(true);

  if (firstLoad) {
    fetch(gravatarUrl).then((response) => {
      if (response.status === 200) {
        setAvatar(gravatarUrl);
      }
      setFirstLoad(false);
    });
  }

  return (
    <div className="avatar shrink-0">
      <img src={avatar} alt="avatar" className="rounded-full w-16 h-16 cursor-pointer" />
    </div>
  );
};

export default Avatar;
