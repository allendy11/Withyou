import React from 'react';

export const DeleteAccount = ({ setDeleteBtn }) => {
  return (
    <div className='delete-account-container'>
      <button onClick={() => setDeleteBtn(true)}>회원탈퇴</button>
    </div>
  );
};
