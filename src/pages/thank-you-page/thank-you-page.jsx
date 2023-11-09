import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../../components/auth';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CenteredLayout from '../../layouts/centered-layout';
import Modal from '../../components/hoc/modal';

const ThankYouPage = ({ isAuthed }) => {

  const [openedAuthModal, setOpenedAuthModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onModalClose = () => {
    setOpenedAuthModal(false);
    navigate('/personal-cabinet/orders');
  };

  const onModalOpen = (ev) => {
    ev.preventDefault();
    setOpenedAuthModal(true);
  };

  return (
    <CenteredLayout>
      <div className="thank-you">
        <p>
          { t('interface.pagesContent.thankYouPage.orderWillBeShippedSoon') } 
          <br />
          
          {
            isAuthed &&
            (<>
              { t('interface.pagesContent.thankYouPage.youCanSeeOrdersIn') }&nbsp;
              <Link 
                onClick={!isAuthed ? onModalOpen : () => {}} 
                to="/personal-cabinet/orders" 
                className="link link--green link--underline"
              >
                { t('interface.pagesContent.thankYouPage.personalCabinet') }
              </Link>
            </>)
          }
        </p>
      </div>

      {
        openedAuthModal
        ? <Modal onModalClose={onModalClose} >
            <Auth onFormSubmit={onModalClose} />
          </Modal>
        : null
      }
    </CenteredLayout>
  );
};

const mapStateToProps = ({ user: { account: { isAuthed } } }) => ({
  isAuthed
});

export default connect(mapStateToProps)(ThankYouPage);
