import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorPage = ({ text }) => {

  const { t } = useTranslation();

  return (
    <div className="flex justify-center align-center flex-column min-h-100">
      <p>
        <small>{ t('interface.messages.pageNotFound') || text }</small>
      </p>
    </div>
  );
};

export default ErrorPage;
