import * as React from 'react';

import githubLogo from 'assets/github-logo.svg';

const Info = () => {
  return (
    <div className="info">
      <h1 className="info__title">Rate them App</h1>

      <p>
        Did Colleague treat you like a jerk? Add it to the app and give it a negative rating so that next time he asks
        you not to forget what a jerk he is.
      </p>

      <p>It works the other way around, too. Did Colleague help you? Don`t get your hopes up, put him in the app.</p>

      <p>For you, this app will be like Black Notebook, where you can see everyone`s actions.</p>

      <p>P.S. This app was developed for fun and with love ❤.</p>

      <div className="view">
        <div className="plane main">
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>

      <div className="info__developer">
        <small>
          <code>developed by Mr.Rotberry </code>
        </small>
        <a href="https://github.com/mrrotberry" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="github logo" />
        </a>
      </div>

      <div className="info__version">
        <small>
          <code>v. 0.1.7</code>
        </small>
      </div>

      <style jsx>
        {`
          .info {
            padding: 1rem;

            &__title {
              text-align: center;
            }

            &__developer,
            &__version {
              text-align: center;
              color: var(--grey);
            }

            &__developer {
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: 1;
              a {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-left: 0.5rem;
                img {
                  max-width: 100%;
                  height: auto;
                }
              }
            }

            &__version {
              font-size: 0.8rem;
            }

            .view {
              position: relative;
              width: 100%;
              height: 300px;
              perspective: 400px;
            }

            .plane {
              width: 120px;
              height: 120px;
              transform-style: preserve-3d;
            }

            .plane.main {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              transform: rotateX(60deg) rotateZ(-30deg);
              animation: rotate 20s infinite linear;
            }

            .plane.main .circle {
              width: 120px;
              height: 120px;
              position: absolute;
              transform-style: preserve-3d;
              border-radius: 100%;
              box-sizing: border-box;
              box-shadow: 0 0 60px crimson, inset 0 0 60px crimson;
            }

            .plane.main .circle::before,
            .plane.main .circle::after {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              width: 10%;
              height: 10%;
              border-radius: 100%;
              background: crimson;
              box-sizing: border-box;
              box-shadow: 0 0 60px 2px crimson;
            }

            .plane.main .circle::before {
              transform: translateZ(-90px);
            }

            .plane.main .circle::after {
              transform: translateZ(90px);
            }

            .plane.main .circle:nth-child(1) {
              transform: rotateZ(72deg) rotateX(63.435deg);
            }

            .plane.main .circle:nth-child(2) {
              transform: rotateZ(144deg) rotateX(63.435deg);
            }

            .plane.main .circle:nth-child(3) {
              transform: rotateZ(216deg) rotateX(63.435deg);
            }

            .plane.main .circle:nth-child(4) {
              transform: rotateZ(288deg) rotateX(63.435deg);
            }

            .plane.main .circle:nth-child(5) {
              transform: rotateZ(360deg) rotateX(63.435deg);
            }

            @keyframes rotate {
              0% {
                transform: rotateX(0) rotateY(0) rotateZ(0);
              }

              100% {
                transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
              }
            }
          }
        `}
      </style>
    </div>
  );
};

export default Info;
