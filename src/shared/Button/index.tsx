import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({ children, onClick, loading, disabled = false }: IProps) => {
  return (
    <>
      <button className="button" type="button" onClick={onClick} disabled={loading || disabled}>
        {!loading ? (
          children
        ) : (
          <div className="lds">
            <span />
            <span />
            <span />
          </div>
        )}
      </button>
      <style jsx>
        {`
          .button {
            padding: 0.8rem 1.5rem;
            border: none;
            background-color: var(--white);
            box-shadow: -3px 3px var(--white);
            line-height: 1;
            font-size: 1rem;
            color: var(--lightBlack);
            user-select: none;
            transition: 0.4s;
            cursor: pointer;

            &:hover {
              box-shadow: -3px 3px var(--grey);
            }

            &:active {
              box-shadow: 0 0 var(--white);
            }

            &:disabled {
              background-color: var(--grey);
              box-shadow: -3px 3px var(--grey);
              cursor: not-allowed;
              pointer-events: none;
            }

            .lds {
              width: 40px;
              height: 1rem;
              display: flex;
              justify-content: space-around;
              align-items: center;
            }

            .lds span {
              width: 6px;
              height: 100%;
              background: var(--white);
              animation: lds 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            }

            .lds span:nth-child(1) {
              animation-delay: -0.24s;
            }

            .lds span:nth-child(2) {
              animation-delay: -0.12s;
            }

            .lds span:nth-child(3) {
              animation-delay: 0s;
            }

            @keyframes lds {
              0% {
                transform: scale(1.5);
              }
              50%,
              100% {
                transform: scale(1);
              }
            }
          }
        `}
      </style>
    </>
  );
};
