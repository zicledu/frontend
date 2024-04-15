// NotFoundPage.jsx

import React from "react";


const NotFoundPage = () => {
  const onGoBack: React.MouseEventHandler<HTMLButtonElement> = () => {
    history.back();
  };

  return (
    <div className="error">
      <div className="error__emoji-container">
   
      </div>
      <div className="error__message">
        <h1 className="error__message-code">404</h1>
        <p className="error__message-title">Sorry, Page not found</p>
        <p>The page you requested could not be found</p>
      </div>
      <div className="error__button-container">
        <button onClick={onGoBack}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
