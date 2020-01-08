import * as React from 'react';

import { Route, Switch } from 'react-router-dom';

import Fade from 'react-reveal/Fade';

import { UserContext } from 'context/user';

import { Layout, UserEdit } from './components';

import routes from './routes';

const App = () => {
  const { user } = React.useContext(UserContext);

  return (
    <>
      {!user.name || !user.company || !user.isAuthorization ? (
        <Fade>
          <UserEdit />
        </Fade>
      ) : (
        <Fade>
          <Layout>
            <Switch>
              {routes.map(({ path, exact, component: Component }) => (
                <Route key={path} path={path} exact={exact}>
                  <React.Suspense
                    fallback={
                      <Fade>
                        <div className="component-loader">
                          <div className="loader">
                            <div />
                            <div />
                            <div />
                          </div>
                        </div>
                      </Fade>
                    }
                  >
                    <Component />
                  </React.Suspense>
                </Route>
              ))}
            </Switch>
          </Layout>
        </Fade>
      )}
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css?family=Fira+Sans+Condensed:300,400&display=swap&subset=cyrillic-ext');

          :root {
            --lightBlack: #2d3436;
            --darkBlack: #000;
            --white: #f5f5f5;
            --grey: #878787;
            --red: #d73700;
            --green: #00c562;
          }

          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }

          html,
          body,
          #root {
            display: flex;
            width: 100%;
            min-height: 100vh;
          }

          html {
            line-height: 1.5;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
              'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
          }

          body {
            background-image: linear-gradient(135deg, var(--lightBlack), var(--darkBlack));
            color: var(--white);
            overflow-x: hidden;
          }

          #root {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;

            & > * {
              width: 100%;
              min-height: 100vh;
            }
          }

          button {
            cursor: pointer;

            &:disabled {
              cursor: not-allowed;
            }
          }

          input,
          textarea,
          button,
          select,
          a {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

            &:focus {
              outline: none;
            }
          }

          ::placeholder {
            color: var(--grey);
          }

          ::selection {
            background-color: #00ffea;
            color: var(--lightBlack);
          }

          ::-moz-selection {
            background-color: #00ffea;
            color: var(--lightBlack);
          }

          .component-loader {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .loader {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .loader div {
              display: inline-block;
              position: absolute;
              left: 8px;
              width: 16px;
              background: var(--white);
              animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            }
            .loader div:nth-child(1) {
              left: 8px;
              animation-delay: -0.24s;
            }
            .loader div:nth-child(2) {
              left: 32px;
              animation-delay: -0.12s;
            }
            .loader div:nth-child(3) {
              left: 56px;
              animation-delay: 0;
            }
            @keyframes loader {
              0% {
                top: 8px;
                height: 64px;
              }
              50%,
              100% {
                top: 24px;
                height: 32px;
              }
            }
          }
        `}
      </style>
    </>
  );
};

export default App;
