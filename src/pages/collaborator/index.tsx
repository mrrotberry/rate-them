import * as React from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';

import dayjs from 'dayjs';

import Fade from 'react-reveal/Fade';

import { CollaboratorsContext } from 'context/collaborators';
import { ECollaboratorsActionTypes } from 'context/collaborators/types';

import { TextField } from 'shared';

const Collaborator = () => {
  const { id: pathCollaboratorId } = useParams();
  const history = useHistory();

  const { collaborators, collaboratorsDispatch } = React.useContext(CollaboratorsContext);

  const collaborator = collaborators.find(_collaborator => _collaborator.id === pathCollaboratorId);

  const [editingCollaboratorName, setEditingCollaboratorName] = React.useState(false);

  const [newCollaboratorName, setNewCollaboratorName] = React.useState(collaborator?.name ?? '');
  const [newCollaboratorNameError, setNewCollaboratorNameError] = React.useState('');

  return (
    collaborator && (
      <div className="collaborator">
        <Fade>
          <div className="collaborator__name">
            {editingCollaboratorName ? (
              <Fade>
                <div className="collaborator__name-edit">
                  <TextField
                    name="change-collaborator-name"
                    value={newCollaboratorName}
                    onChange={event => {
                      setNewCollaboratorName(event.target.value);
                    }}
                    helpText="minimal length - 3 symbols, maximum - 20"
                    maxLength={20}
                    errorText={newCollaboratorNameError}
                    align="center"
                  />
                  <button
                    type="button"
                    className="collaborator__name-change"
                    onClick={async () => {
                      let formHasError = false;

                      await setNewCollaboratorNameError('');

                      if (newCollaboratorName.trim().length < 3) {
                        formHasError = true;
                        await setNewCollaboratorNameError('oops, your name so short...');
                      }

                      if (!formHasError) {
                        setEditingCollaboratorName(false);
                        collaboratorsDispatch({
                          type: ECollaboratorsActionTypes.EDIT_COLLABORATOR,
                          payload: { ...collaborator, name: newCollaboratorName.trim() },
                        });
                      }
                    }}
                  >
                    <i className="gg-check" />
                  </button>
                </div>
              </Fade>
            ) : (
              <Fade>
                <h1>
                  <i>{collaborator.name}</i>
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <span className="collaborator__name-edit-btn" onClick={() => setEditingCollaboratorName(true)}>
                    <i className="gg-pen" />
                  </span>
                </h1>
              </Fade>
            )}
          </div>
          <div className="collaborator__score">
            <i>{collaborator.score}</i>
          </div>
          <div className="collaborator__score-buttons">
            {collaborator.score < 999 && (
              <Link
                className="collaborator__score-change collaborator__score-change_increment"
                to={`/collaborators/${collaborator.id}/increment`}
              >
                <i className="gg-math-plus" />
              </Link>
            )}
            {collaborator.score > -999 && (
              <Link
                className="collaborator__score-change collaborator__score-change_decrement"
                to={`/collaborators/${collaborator.id}/decrement`}
              >
                <i className="gg-math-minus" />
              </Link>
            )}
          </div>
          {collaborator.history.length ? (
            <ul className="collaborator__history history">
              {[...collaborator.history]
                .sort((collaboratorA, collaboratorB) => {
                  return collaboratorB.date - collaboratorA.date;
                })
                .map(record => (
                  <li key={record.date} className="history__item">
                    <i
                      className={`history__item-change ${
                        record.change[0] === '+' ? 'history__item-change_increment' : 'history__item-change_decrement'
                      }`}
                    >
                      {record.change}
                    </i>
                    <div className="history__item-date">{dayjs(record.date).format('DD MM YYYY / HH:mm:ss')}</div>
                    <span className="history__item-description">
                      Description: <i>{record.description || '-'}</i>
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="history_empty">No history</div>
          )}
        </Fade>

        <style jsx>
          {`
            .collaborator {
              padding: 0 1rem;

              &__name {
                height: 73px;
                position: relative;
                margin: 0.6rem 0;
                line-height: 1;
                text-align: center;

                h1 {
                  margin: 0;
                  line-height: 1;
                }

                i {
                  cursor: pointer;
                }
              }

              &__name-hint {
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                font-size: 0.8rem;
                font-weight: 400;
                color: var(--grey);
              }

              &__name-edit-btn {
                color: var(--white);
                width: 26px;
                height: 26px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin-left: 1rem;
                vertical-align: middle;
                cursor: pointer;

                .gg-pen {
                  box-sizing: border-box;
                  position: relative;
                  display: inline-block;
                  transform: rotate(-45deg) scale(var(--ggs, 1));
                  width: 14px;
                  height: 4px;
                  border-right: 2px solid transparent;
                  box-shadow: 0 0 0 2px, inset -2px 0 0;
                  border-top-right-radius: 1px;
                  border-bottom-right-radius: 1px;
                  margin-right: -2px;
                }
                .gg-pen::after,
                .gg-pen::before {
                  content: '';
                  display: block;
                  box-sizing: border-box;
                  position: absolute;
                }
                .gg-pen::before {
                  background: currentColor;
                  border-left: 0;
                  right: -6px;
                  width: 3px;
                  height: 4px;
                  border-radius: 1px;
                  top: 0;
                }
                .gg-pen::after {
                  width: 8px;
                  height: 7px;
                  border-top: 4px solid transparent;
                  border-bottom: 4px solid transparent;
                  border-right: 7px solid;
                  left: -11px;
                  top: -2px;
                }
              }

              &__name-edit {
                display: flex;
                align-items: flex-start;
                height: 73px;
              }

              &__name-change {
                display: inline-block;
                width: 22px;
                height: 22px;
                margin-top: 0.5rem;
                margin-left: 2rem;
                padding: 0;
                border: none;
                background: none;
                line-height: 1;
                color: var(--green);

                .gg-check {
                  box-sizing: border-box;
                  position: relative;
                  display: block;
                  transform: scale(2);
                  width: 22px;
                  height: 22px;
                  border: 2px solid transparent;
                  border-radius: 100px;
                }
                .gg-check::after {
                  content: '';
                  display: block;
                  box-sizing: border-box;
                  position: absolute;
                  left: 3px;
                  top: -1px;
                  width: 6px;
                  height: 10px;
                  border-width: 0 2px 2px 0;
                  border-style: solid;
                  transform-origin: bottom left;
                  transform: rotate(45deg);
                }
              }

              &__score {
                text-align: center;
                font-size: 2rem;
              }

              &__score-buttons {
                display: flex;
                justify-content: space-around;
                margin: 2rem -0px;
              }

              :global(&__score-change) {
                height: 62px;
                display: flex;
                align-items: center;
                padding: 0.8rem 1.5rem;
                border: none;
                line-height: 1;
                font-size: 1rem;
                color: var(--lightBlack);
                user-select: none;
                transition: 0.4s;

                .gg-math-plus,
                .gg-math-plus::after {
                  display: block;
                  box-sizing: border-box;
                  background: currentColor;
                  border-radius: 10px;
                }
                .gg-math-plus {
                  position: relative;
                  width: 28px;
                  height: 4px;
                  margin: 1rem 0;
                }
                .gg-math-plus::after {
                  content: '';
                  position: absolute;
                  width: 4px;
                  height: 28px;
                  top: -12px;
                  left: 12px;
                }

                .gg-math-minus {
                  box-sizing: border-box;
                  position: relative;
                  display: block;
                  transform: scale(1);
                  width: 28px;
                  height: 4px;
                  background: currentColor;
                  border-radius: 10px;
                }
              }

              :global(&__score-change_increment) {
                background-color: var(--green);
                box-shadow: -3px 3px var(--green);
              }

              :global(&__score-change_decrement) {
                background-color: var(--red);
                box-shadow: -3px 3px var(--red);
              }

              &__delete {
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 99;
                display: inline-block;
                border: none;
                background: none;
                line-height: 1;
                color: var(--red);

                .gg-trash {
                  position: relative;
                  display: block;
                  transform: scale(1.5);
                  width: 10px;
                  height: 12px;
                  border: 2px solid transparent;
                  box-shadow: 0 0 0 2px, inset -2px 0 0, inset 2px 0 0;
                  border-bottom-left-radius: 1px;
                  border-bottom-right-radius: 1px;
                  margin-top: 4px;
                }
                .gg-trash::after,
                .gg-trash::before {
                  content: '';
                  display: block;
                  box-sizing: border-box;
                  position: absolute;
                }
                .gg-trash::after {
                  background: currentColor;
                  border-radius: 3px;
                  width: 16px;
                  height: 2px;
                  top: -4px;
                  left: -5px;
                }
                .gg-trash::before {
                  width: 10px;
                  height: 4px;
                  border: 2px solid;
                  border-bottom: transparent;
                  border-top-left-radius: 2px;
                  border-top-right-radius: 2px;
                  top: -7px;
                  left: -2px;
                }
              }
            }

            .history {
              margin: 0;
              padding: 0;

              &_empty {
                text-align: center;
                color: var(--grey);
              }

              &__item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                margin-bottom: 1.5rem;
                padding: 0.75rem;
                border-radius: 0.3rem;
                background-image: linear-gradient(135deg, var(--white), #fff);
                color: var(--lightBlack);

                &-change {
                  width: 50%;
                  font-size: 1.5rem;

                  &_increment {
                    color: var(--green);
                  }

                  &_decrement {
                    color: var(--red);
                  }
                }

                &-date {
                  width: 50%;
                  text-align: right;
                  color: var(--grey);
                }

                &-description {
                  width: 100%;
                  margin-top: 0.5rem;
                }
              }
            }
          `}
        </style>
        {!editingCollaboratorName && (
          <Fade>
            <button
              type="button"
              className="collaborator__delete"
              onClick={() => {
                // eslint-disable-next-line no-alert
                const deleteIsConfirm = confirm('Are you sure?');

                if (deleteIsConfirm) {
                  collaboratorsDispatch({
                    type: ECollaboratorsActionTypes.DELETE_COLLABORATOR,
                    payload: collaborator,
                  });
                  history.push('/');
                }
              }}
            >
              <i className="gg-trash" />
            </button>
          </Fade>
        )}
      </div>
    )
  );
};

export default Collaborator;
