import * as React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export const Layout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="layout">
      <Header sideBarToggle={() => setIsOpen(!isOpen)} />
      <Sidebar isOpen={isOpen} sideBarToggle={() => setIsOpen(false)} />
      <main className="main">{children}</main>
      <style jsx>
        {`
          .layout {
            padding-top: 70px;
          }

          .main {
            //min-height: calc(100vh - 70px);
            max-width: 640px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};
