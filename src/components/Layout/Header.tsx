import * as React from 'react';

import { Link } from 'react-router-dom';

import logo from 'assets/logo.png';

interface IProps {
  sideBarToggle: () => void;
}

const Header = ({ sideBarToggle }: IProps) => {
  return (
    <>
      <header className="header">
        <button type="button" className="header__menu-btn" onClick={sideBarToggle}>
          <i className="gg-menu" />
        </button>
        <Link to="/" style={{ display: 'flex' }}>
          <img src={logo} alt="Rate Them Logo" className="header__logo" />
        </Link>
      </header>
      <style jsx>
        {`
          .header {
            display: flex;
            align-items: center;
            position: fixed;
            top: 0;
            z-index: 10;
            width: 100%;
            padding: 10px;
            background-color: var(--lightBlack);
            box-shadow: 0 5px 20px rgba(16, 16, 16, 0.35);
            color: var(--white);

            &__menu-btn {
              display: block;
              width: 20px;
              height: 20px;
              margin-right: 1rem;
              padding: 0;
              border: none;
              background: none;
              color: var(--white);
            }

            &__logo {
              height: 30px;
            }

            .gg-menu {
              transform: scale(1);
            }
            .gg-menu,
            .gg-menu::after,
            .gg-menu::before {
              box-sizing: border-box;
              position: relative;
              display: block;
              width: 20px;
              height: 2px;
              border-radius: 3px;
              background: currentColor;
            }
            .gg-menu::after,
            .gg-menu::before {
              content: '';
              position: absolute;
              top: -6px;
            }
            .gg-menu::after {
              top: 6px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
