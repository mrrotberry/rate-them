import * as React from 'react';

import { EUserActionTypes } from 'context/user/types';
import { UserContext } from 'context/user';

import { Button, TextField, FileField } from 'shared';

export const UserEdit = () => {
  const { user, userDispatch } = React.useContext(UserContext);

  const [userName, setUserName] = React.useState(user.name);
  const [userAvatar, setUserAvatar] = React.useState(user.avatar);
  const [userCompany, setUserCompany] = React.useState(user.company);

  const [userNameError, setUserNameError] = React.useState('');
  const [userCompanyError, setUserCompanyError] = React.useState('');

  const [editingIsSuccess, setEditingIsSuccess] = React.useState(false);

  return (
    <section className="user-edit">
      <h2 className="user-edit__title">
        Hi,{' '}
        <i>
          <code>{userName || '@username'}</code>
        </i>
        <br />
        from{' '}
        <i>
          <code>{userCompany || '@usercompany'}</code>
        </i>
        .
      </h2>

      <p className="user-edit__description">To continue, you need to fill out this information:</p>

      <TextField
        name="user-name"
        label="Your name"
        placeholder="write your name here"
        value={userName}
        onChange={event => {
          setUserName(event.target.value);
        }}
        align="center"
        helpText="minimal length - 3 symbols, maximum - 30"
        maxLength={30}
        errorText={userNameError}
        disabled={editingIsSuccess}
      />

      <FileField
        name="user-avatar"
        helpText="maximum image size - 1Mb"
        imageDataUrl={userAvatar}
        setImageDataUrl={setUserAvatar}
        disabled={editingIsSuccess}
      />

      <TextField
        name="user-company"
        label="Your company name"
        placeholder="write your company name here"
        value={userCompany}
        onChange={event => {
          setUserCompany(event.target.value);
        }}
        align="center"
        helpText="minimal length - 3 symbols, maximum - 30"
        maxLength={30}
        errorText={userCompanyError}
        disabled={editingIsSuccess}
      />

      <Button
        onClick={async () => {
          let formHasError = false;
          await setUserNameError('');
          await setUserCompanyError('');

          if (userName.trim().length < 3) {
            formHasError = true;
            await setUserNameError('oops, your name so short...');
          }

          if (userCompany.trim().length < 3) {
            formHasError = true;
            await setUserCompanyError('hmm, your company name so sort... ');
          }

          if (!formHasError) {
            setEditingIsSuccess(true);

            setTimeout(() => {
              userDispatch({
                type: EUserActionTypes.SET_USER,
                payload: {
                  name: userName.trim(),
                  avatar: userAvatar,
                  company: userCompany.trim(),
                  isAuthorization: true,
                },
              });
            }, 1500);
          }
        }}
        loading={editingIsSuccess}
      >
        Save your info
      </Button>

      <style jsx>
        {`
          .user-edit {
            max-width: 640px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            padding: 1rem;

            &__title {
              margin-bottom: 0;
              text-align: center;
              font-size: 2rem;
            }
          }
        `}
      </style>
    </section>
  );
};
