import * as React from 'react';

// @ts-ignore
import HeadShake from 'react-reveal/HeadShake';
// @ts-ignore
import Fade from 'react-reveal/Fade';

interface IProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  direction?: 'vertical' | 'horizontal';
  align?: 'left' | 'center' | 'right';
  helpText?: string;
  minLength?: number;
  maxLength?: number;
  errorText?: string;
  disabled?: boolean;
}

export const TextField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  direction = 'vertical',
  align = 'left',
  helpText,
  minLength = 0,
  maxLength = 255,
  errorText,
  disabled = false,
}: IProps) => {
  return (
    <div className="text-field">
      {label && (
        <label htmlFor={name} className="text-field__label">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          className="text-field__input text-field__input_multiline"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={event => {
            if (onChange) {
              if (event.target.value.length >= minLength && event.target.value.length < maxLength) {
                onChange(event);
              }
            }
          }}
          autoComplete="off"
        />
      ) : (
        <HeadShake when={errorText}>
          <input
            className={`text-field__input ${errorText ? 'text-field__input_error' : ''}`}
            type="text"
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={event => {
              if (onChange) {
                if (event.target.value.length >= minLength && event.target.value.length < maxLength) {
                  onChange(event);
                }
              }
            }}
            disabled={disabled}
            autoComplete="off"
          />
        </HeadShake>
      )}
      {helpText && <div className="text-field__help-text">{helpText}</div>}
      {errorText && (
        <Fade>
          <div className="text-field__error-text">{errorText}</div>
        </Fade>
      )}
      <style jsx>
        {`
          .text-field {
            display: flex;
            flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
            width: 100%;
            position: relative;
            margin-bottom: 2.5rem;
            padding-bottom: 0.8rem;
            text-align: ${align};

            &__label {
              margin-bottom: ${direction === 'vertical' ? '0.5rem' : '0'};
              margin-right: ${direction === 'horizontal' ? '0.5rem' : '0'};
            }

            &__input {
              width: 100%;
              height: ${multiline ? '5rem' : '2.5rem'};
              margin-bottom: 0.5rem;
              padding: 0.5rem;
              border: 3px solid var(--white);
              border-radius: 3px;
              background-color: transparent;
              box-shadow: -3px 3px var(--white);
              line-height: ${multiline ? '1.5' : '1'};
              font-style: italic;
              color: var(--white);
              transition: 0.4s;

              &_error {
                border-color: var(--red);
                box-shadow: -3px 3px var(--red);
              }

              &:focus {
                outline: var(--lightBlack);
              }

              &:disabled {
                border-color: var(--grey);
                box-shadow: -3px 3px var(--grey);
                cursor: not-allowed;
              }
            }

            &__error-text {
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              text-align: center;
              white-space: nowrap;
              line-height: 1;
              font-size: 0.8rem;
              color: var(--red);
            }

            &__help-text {
              font-size: 0.75rem;
              color: var(--grey);
            }
          }
        `}
      </style>
    </div>
  );
};
