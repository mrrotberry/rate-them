import * as React from 'react';

import { Redirect, useHistory, useParams } from 'react-router-dom';

import Fade from 'react-reveal/Fade';

import { CollaboratorsContext } from 'context/collaborators';

import { ECollaboratorsActionTypes } from 'context/collaborators/types';

import { TextField } from 'shared';
import { Button } from '../../shared/Button';

const ScoreChange = () => {
  const { id: pathCollaboratorId, counter } = useParams();
  const history = useHistory();

  const { collaborators, collaboratorsDispatch } = React.useContext(CollaboratorsContext);

  const collaborator = collaborators.find(_collaborator => _collaborator.id === pathCollaboratorId);

  const [newScore, setNewScore] = React.useState([] as number[]);
  const [description, setDescription] = React.useState('');

  if (counter !== 'increment' && counter !== 'decrement') {
    return <Redirect to="/" />;
  }

  return (
    collaborator && (
      <Fade>
        <div className="score-change">
          <div className="score-change__field">
            <div className="score-change__value">
              {counter === 'increment' ? '+' : '-'}
              {newScore.join('')}
            </div>
            <button
              type="button"
              className="score-change__delete"
              onClick={() => {
                setNewScore([...newScore].slice(0, -1));
              }}
            >
              <i className="gg-backspace" />
            </button>
          </div>

          <div className="score-change__description">
            <TextField
              name="change-score-description"
              placeholder="add some comment"
              value={description}
              onChange={event => {
                setDescription(event.target.value);
              }}
              multiline
            />
          </div>

          <div className="score-change__keyboard">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
              <button
                key={number}
                type="button"
                className="score-change__key"
                onClick={() => {
                  setNewScore([...newScore, number]);
                }}
                disabled={(number === 0 && !newScore.length) || newScore.length >= 3}
              >
                {number}
              </button>
            ))}
          </div>

          <div className="score-change__actions">
            <Button
              onClick={() => {
                history.push(`/collaborators/${collaborator.id}`);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                collaboratorsDispatch({
                  type: ECollaboratorsActionTypes.EDIT_COLLABORATOR,
                  payload: {
                    ...collaborator,
                    score:
                      counter === 'increment'
                        ? collaborator.score + Number(newScore.join(''))
                        : collaborator.score - Number(newScore.join('')),
                    history: [
                      ...collaborator.history,
                      {
                        date: Date.now(),
                        description,
                        change: `${counter === 'increment' ? '+' : '-'}${Number(newScore.join(''))}`,
                      },
                    ],
                  },
                });

                history.push(`/collaborators/${collaborator.id}`);
              }}
              disabled={!newScore.length}
            >
              Save
            </Button>
          </div>

          <style jsx>
            {`
              .score-change {
                &__field {
                  height: 78px;
                  display: flex;
                  justify-content: flex-end;
                  margin: 1rem 1rem 2rem;
                  padding: 0.75rem;
                  border: 3px solid var(--white);
                  border-radius: 3px;
                  box-shadow: -3px 3px var(--white);
                }

                &__value {
                  font-size: 2rem;
                  font-style: italic;
                }

                &__delete {
                  width: 46px;
                  margin-left: 1rem;
                  border: none;
                  background: none;
                  color: var(--white);
                }

                &__description {
                  padding: 0 1rem;
                }

                &__keyboard {
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                  margin-bottom: 2rem;
                }

                &__key {
                  width: calc(100% / 3);
                  height: 80px;
                  border: none;
                  padding: 0;
                  background: none;
                  font-size: 1.8rem;
                  color: var(--white);
                  transition: 0.4s;
                  user-select: none;

                  &:disabled {
                    color: var(--grey);
                  }
                }

                &__actions {
                  display: flex;
                  justify-content: space-around;
                }

                .gg-backspace {
                  box-sizing: border-box;
                  position: relative;
                  display: block;
                  width: 14px;
                  height: 14px;
                  margin: auto;
                  transform: scale(1.5);
                  border: 2px solid;
                  border-left: 0;
                  border-top-right-radius: 2px;
                  border-bottom-right-radius: 2px;
                }
                .gg-backspace::after,
                .gg-backspace::before {
                  content: '';
                  display: block;
                  box-sizing: border-box;
                  position: absolute;
                }
                .gg-backspace::before {
                  background: linear-gradient(currentColor 18px, transparent 0) no-repeat center center/10px 2px;
                  border-right: 3px solid transparent;
                  box-shadow: inset 0 0 0 2px;
                  right: 2px;
                  bottom: 1px;
                  width: 8px;
                  height: 8px;
                  border-left: 3px solid transparent;
                  transform: rotate(45deg);
                }
                .gg-backspace::after {
                  width: 10px;
                  height: 10px;
                  border-top: 2px solid;
                  border-left: 2px solid;
                  border-top-left-radius: 1px;
                  transform: rotate(-45deg);
                  top: 0;
                  left: -5px;
                }
              }
            `}
          </style>
        </div>
      </Fade>
    )
  );
};

export default ScoreChange;
