import * as React from 'react';

import { Link } from 'react-router-dom';

import Fade from 'react-reveal/Fade';

import { CollaboratorsContext } from 'context/collaborators';

import { AddCollaborator } from 'components';

const Main = () => {
  const { collaborators } = React.useContext(CollaboratorsContext);

  const [isShowAddForm, setIsShowAddForm] = React.useState(false);

  return (
    <div className="collaborators">
      {collaborators.length ? (
        <ul className="collaborators__list">
          {[
            ...collaborators.sort((collaboratorA, collaboratorB) => {
              if (collaboratorA.name < collaboratorB.name) {
                return -1;
              }
              if (collaboratorA.name > collaboratorB.name) {
                return 1;
              }
              return 0;
            }),
          ].map(collaborator => (
            <Fade cascade key={collaborator.id}>
              <li className="collaborator-card">
                <Link to={`/collaborators/${collaborator.id}`} className="collaborator-card__link">
                  <i className="collaborator-card__name">{collaborator.name}</i>
                  <i
                    className={`collaborator-card__score ${collaborator.score > 0 &&
                      'collaborator-card__score_positive'} ${collaborator.score < 0 &&
                      'collaborator-card__score_negative'}`}
                  >
                    {collaborator.score > 0 ? '+' : ''}
                    {collaborator.score}
                  </i>
                </Link>
              </li>
            </Fade>
          ))}
        </ul>
      ) : (
        <div className="collaborators__empty">No collaborators</div>
      )}

      <button
        type="button"
        className="collaborators__add-btn"
        onClick={() => {
          setIsShowAddForm(!isShowAddForm);
        }}
      >
        {isShowAddForm ? (
          <Fade>
            <i className="gg-math-minus" />
          </Fade>
        ) : (
          <Fade>
            <i className="gg-math-plus" />
          </Fade>
        )}
      </button>

      <AddCollaborator isShowAddForm={isShowAddForm} setIsShowAddForm={() => setIsShowAddForm(false)} />

      <style jsx>
        {`
          .collaborators {
            min-height: calc(100vh - 70px);
            display: flex;
            justify-content: ${collaborators.length ? 'flex-start' : 'center'};
            align-items: ${collaborators.length ? 'flex-start' : 'center'};
            flex-direction: column;
            padding: 0 1rem;

            &__empty {
              color: var(--grey);
            }

            &__add-btn {
              display: flex;
              justify-content: center;
              width: 56px;
              height: 56px;
              position: fixed;
              bottom: ${isShowAddForm ? '262px' : '2rem'};
              left: calc(50% - 28px);
              z-index: 10;
              padding: 0;
              border: 1px solid var(--white);
              border-radius: 50%;
              background-color: var(--lightBlack);
              box-shadow: -4px 4px ${isShowAddForm ? 'transparent' : 'var(--white)'};
              font-size: 2rem;
              color: var(--white);
              transition: 0.4s;
            }

            &__list {
              width: 100%;
              margin: 0;
              padding: 0;
              list-style: none;
            }
          }

          .collaborator-card {
            :global(&__link) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1.5rem;
              padding: 0.75rem;
              border-radius: 0.3rem;
              background-image: linear-gradient(135deg, var(--white), #fff);
              text-decoration: none;
              color: var(--lightBlack);
            }

            &__name {
              line-height: 1;
              font-size: 1.5rem;
            }

            &__score {
              font-size: 1.5rem;

              &_positive {
                color: var(--green);
              }

              &_negative {
                color: var(--red);
              }
            }
          }

          .gg-math-plus,
          .gg-math-plus::after {
            display: block;
            box-sizing: border-box;
            background: currentColor;
            border-radius: 10px;
          }
          .gg-math-plus {
            position: relative;
            transform: scale(1);
            width: 28px;
            height: 2px;
          }
          .gg-math-plus::after {
            content: '';
            position: absolute;
            width: 2px;
            height: 28px;
            top: -12px;
            left: 12px;
          }

          .gg-math-minus {
            box-sizing: border-box;
            position: relative;
            display: block;
            transform: scale(var(--ggs, 1));
            width: 28px;
            height: 2px;
            background: currentColor;
            border-radius: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Main;
