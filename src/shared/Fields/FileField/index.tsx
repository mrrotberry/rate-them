import * as React from 'react';

// @ts-ignore
import Fade from 'react-reveal/Fade';

import stubUserAvatar from 'assets/stub-user-avatar.svg';

interface IProps {
  name: string;
  helpText?: string;
  imageDataUrl?: string;
  setImageDataUrl: (imgDataUrl: string) => void;
}

export const FileField = ({ name, helpText, imageDataUrl, setImageDataUrl }: IProps) => {
  const [previewImageDataUrl, setPreviewImageDataUrl] = React.useState(imageDataUrl || stubUserAvatar);

  const [uploadError, setUploadError] = React.useState('');

  return (
    <div className="file-field">
      <input
        id={name}
        className="file-field__input"
        name={name}
        type="file"
        onChange={({ target }) => {
          const { files: imagesFiles } = target;

          setUploadError('');
          setPreviewImageDataUrl(stubUserAvatar);

          if (imagesFiles && imagesFiles[0]) {
            const imageFile = imagesFiles[0];

            if (imageFile.size > 1000000) {
              setUploadError('Oops, file size is so large, try one more time');

              return;
            }

            const reader = new FileReader();

            reader.onload = () => {
              setPreviewImageDataUrl(reader.result);
              setImageDataUrl(reader.result as string);
            };

            reader.readAsDataURL(imageFile);
          }
        }}
        aria-label="Upload avatar"
        accept="image/*"
      />

      <label htmlFor={name} className="file-field__label">
        Select your avatar
        <div className="file-field__preview">
          <img src={previewImageDataUrl} alt="User avatar" />
        </div>
      </label>

      {helpText && <div className="file-field__help-text">{helpText}</div>}
      {uploadError && (
        <Fade>
          <div className="file-field__error-text">{uploadError}</div>
        </Fade>
      )}

      <style jsx>
        {`
          .file-field {
            width: 100%;
            position: relative;
            margin-bottom: 2rem;
            padding-bottom: 0.8rem;
            text-align: center;

            &__label {
              display: inline-flex;
              align-items: center;
              flex-direction: column;
              padding: 0.5rem;
              border: 3px solid transparent;
              cursor: pointer;
              transition: 0.4s;
            }

            &__preview {
              display: block;
              width: 80px;
              height: 80px;
              margin: 0.5rem 0;
              border-radius: 50%;
              overflow: hidden;

              img {
                object-fit: cover;
                max-width: 100%;
                height: auto;
              }
            }

            &__help-text {
              text-align: center;
              font-size: 0.75rem;
              color: var(--grey);
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

            &__input {
              width: 0.1px;
              height: 0.1px;
              opacity: 0;
              overflow: hidden;
              position: absolute;
              z-index: -1;

              &:focus + label {
                border-color: var(--white);
                box-shadow: -3px 3px var(--white);
              }
            }
          }
        `}
      </style>
    </div>
  );
};
