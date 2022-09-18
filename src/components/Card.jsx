import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { isEmpty } from 'ramda';
import fall from '../assets/fallback.png';

const Card = ({ artObject }) => {
  const { primaryImageSmall, title, department, objectURL } = artObject;

  const addDefaultSrc = (ev) => {
    ev.target.src = fall;
  };

  const downloadImage = () => {
    saveAs(primaryImageSmall, `met_image.jpg`);
  };

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img onError={addDefaultSrc} src={primaryImageSmall} alt={title} />
        </figure>
        <div className="card-body">
          <p>{title}</p>
          <h2 className="card-title">
            <div className="badge badge-secondary">{department}</div>
          </h2>
          <div className="card-actions justify-end">
            <div className="btn-group">
              <button
                data-testid="more-info"
                className="btn btn-outline btn-secondary btn-xs"
                onClick={() => window.open(objectURL, '_blank')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                className="btn btn-outline btn-secondary btn-xs"
                disabled={isEmpty(primaryImageSmall)}
                onClick={() => downloadImage()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </button>
              <button className="btn btn-outline btn-secondary btn-xs" onClick={() => navigator.share(objectURL)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
};

Card.propTypes = {
  artObject: PropTypes.object
};

export default Card;
