import * as React from 'react';

import { useHistory } from 'react-router-dom';

import { UserContext } from 'context/user';
import { EUserActionTypes } from 'context/user/types';

interface IProps {
  isOpen: boolean;
  sideBarToggle: () => void;
}

const Sidebar = ({ isOpen, sideBarToggle }: IProps) => {
  const history = useHistory();

  const { user, userDispatch } = React.useContext(UserContext);

  return (
    <>
      <div
        className="sidebar__overlay"
        onClick={sideBarToggle}
        onKeyDown={sideBarToggle}
        role="button"
        aria-label="overlay"
        tabIndex={0}
      />

      <aside className="sidebar">
        <div className="sidebar__user user">
          <div className="user__avatar">
            {user.avatar ? <img src={user.avatar} alt={`${user.name} avatar`} /> : user.name[0].toUpperCase()}
          </div>
          <div className="user__info">
            <i className="user__name">{user.name}</i>
            <span>
              from <i className="user__company">{user.company}</i>
            </span>
          </div>
        </div>

        <div className="sidebar__menu menu">
          <div className="menu__title">Settings</div>
          <ul className="menu__list">
            <li className="menu__list-item">
              <button
                type="button"
                onClick={() => {
                  userDispatch({ type: EUserActionTypes.SET_USER, payload: { ...user, isAuthorization: false } });
                }}
              >
                <i className="gg-profile" /> <span>Edit user</span>
              </button>
            </li>
            <li className="menu__list-item menu__list-item_danger">
              <button
                type="button"
                onClick={() => {
                  // @TODO need create custom modal
                  // eslint-disable-next-line no-alert
                  const deleteIsConfirm = confirm('Are you sure?');

                  if (deleteIsConfirm) {
                    localStorage.clear();
                    document.location.reload(true);
                  }
                }}
              >
                <i className="gg-log-out" /> <span>Logout and delete account</span>
              </button>
            </li>
          </ul>
          <div className="menu__title">Info</div>
          <ul className="menu__list">
            <li className="menu__list-item">
              <button
                type="button"
                onClick={() => {
                  sideBarToggle();
                  history.push('/info');
                }}
              >
                <i className="gg-info" /> <span>About App</span>
              </button>
            </li>
            <li className="menu__list-item">
              <a
                href="https://github.com/mrrotberry/rate-them/commits/master"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="gg-file-document" /> <span>Changelog</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <style jsx>
        {`
          .sidebar {
            width: 300px;
            min-height: 100vh;
            position: fixed;
            top: 0;
            z-index: 1000;
            left: ${isOpen ? '0' : '-300px'};
            background-color: var(--lightBlack);
            box-shadow: 5px 0 10px ${isOpen ? 'rgba(62, 62, 62, 0.55)' : 'transparent'};
            transition: 0.4s;

            &__overlay {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 999;
              opacity: ${isOpen ? '1' : '0'};
              pointer-events: ${isOpen ? 'auto' : 'none'};
              background-color: rgba(0, 0, 0, 0.35);
              transition: 0.4s;

              &:focus {
                outline: none;
              }
            }
          }

          .user {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 1rem;
            border-bottom: 1px solid var(--white);

            &__avatar {
              width: 50px;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 1rem;
              border-radius: 50%;
              background-color: springgreen;
              font-size: 30px;
              color: var(--lightBlack);
              overflow: hidden;

              img {
                max-width: 100%;
                height: auto;
                object-fit: cover;
              }
            }

            &__info {
              display: flex;
              flex-direction: column;
            }

            &__name {
              font-size: 1.5rem;
            }

            &__company {
              width: 100%;
              color: var(--grey);
            }
          }

          .menu {
            padding: 1rem;

            &__title {
              font-size: 1.2rem;
            }

            &__list {
              padding-left: 1rem;
              list-style: none;
            }

            &__list-item {
              margin-bottom: 0.5rem;

              button,
              a {
                display: inline-flex;
                align-items: center;
                padding: 0.5rem;
                border: none;
                background: none;
                text-decoration: none;
                color: var(--white);
              }

              &_danger {
                button {
                  color: var(--red);
                }
              }

              i {
                margin-right: 0.5rem;
              }
            }
          }

          .gg-profile,
          .gg-profile::after,
          .gg-profile::before {
            display: block;
            box-sizing: border-box;
            border: 2px solid;
            border-radius: 100px;
          }
          .gg-profile {
            overflow: hidden;
            transform: scale(1);
            width: 22px;
            height: 22px;
            position: relative;
          }
          .gg-profile::after,
          .gg-profile::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 5px;
            width: 8px;
            height: 8px;
          }
          .gg-profile::after {
            border-radius: 200px;
            top: 12px;
            left: -2px;
            width: 22px;
            height: 22px;
          }

          .gg-info {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(1);
            width: 20px;
            height: 20px;
            border: 2px solid;
            border-radius: 40px;
          }
          .gg-info::after,
          .gg-info::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            border-radius: 3px;
            width: 2px;
            background: currentColor;
            left: 7px;
          }
          .gg-info::after {
            bottom: 2px;
            height: 8px;
          }
          .gg-info::before {
            height: 2px;
            top: 2px;
          }

          .gg-log-out {
            box-sizing: border-box;
            position: relative;
            display: block;
            width: 6px;
            height: 16px;
            border: 2px solid;
            transform: scale(1);
            border-right: 0;
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
            margin-right: 20px !important;
          }
          .gg-log-out::after,
          .gg-log-out::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
          }
          .gg-log-out::after {
            border-top: 2px solid;
            border-left: 2px solid;
            transform: rotate(-45deg);
            width: 8px;
            height: 8px;
            left: 4px;
            bottom: 2px;
          }
          .gg-log-out::before {
            border-radius: 3px;
            width: 10px;
            height: 2px;
            background: currentColor;
            left: 5px;
            bottom: 5px;
          }

          .gg-file-document {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs, 1));
            width: 20px;
            height: 16px;
            border: 2px solid transparent;
            border-right: 0;
            border-top: 0;
            box-shadow: 0 0 0 2px;
            border-radius: 1px;
            border-top-right-radius: 4px;
            overflow: hidden;
          }
          .gg-file-document::after,
          .gg-file-document::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
          }
          .gg-file-document::before {
            background: currentColor;
            box-shadow: 0 4px 0, -6px -4px 0;
            left: 0;
            width: 15px;
            height: 2px;
            top: 8px;
          }
          .gg-file-document::after {
            width: 6px;
            height: 6px;
            border-left: 2px solid;
            border-bottom: 2px solid;
            right: -1px;
            top: -1px;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;
