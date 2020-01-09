import * as React from 'react';

import { EUserActionTypes } from 'context/user/types';
import { UserContext } from 'context/user';

import { Button, TextField } from 'shared';

export const UserEdit = () => {
  const { user, userDispatch } = React.useContext(UserContext);

  const [userName, setUserName] = React.useState(user.name);
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
      <p className="user-edit__description">To continue, you need to fill in this information:</p>
      <TextField
        name="user-name"
        label="Your name"
        placeholder="write your name here"
        value={userName}
        onChange={event => {
          setUserName(event.target.value);
        }}
        align="center"
        helpText="minimum length – 3 symbols, maximum – 30"
        maxLength={30}
        errorText={userNameError}
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
        helpText="minimum length – 3 symbols, maximum – 30"
        maxLength={30}
        errorText={userCompanyError}
        disabled={editingIsSuccess}
      />
      <Button
        onClick={async () => {
          let formHasError = false;
          await setUserNameError('');
          await setUserCompanyError('');

          if (userName.length < 3) {
            formHasError = true;
            await setUserNameError('Oops, your name is so short...');
          }

          if (userCompany.length < 3) {
            formHasError = true;
            await setUserCompanyError('Hmm, your company name is so sort... ');
          }

          if (!formHasError) {
            setEditingIsSuccess(true);

            setTimeout(() => {
              userDispatch({
                type: EUserActionTypes.SET_USER,
                payload: { name: userName, company: userCompany, isAuthorization: true },
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
