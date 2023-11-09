import React from 'react';
import Input from '../../components/input';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateUser, userLogOut } from '../../store/actions/user-actions';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import withDatabaseService from '../../components/hoc/with-database-service';
import withNotificationService from '../../components/hoc/with-notification-service';

const ProfileSettings = ({ 
  title, id, login, userLogOut, updateUser, 
  databaseService, notificationService
}) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLoginChange = (ev) => {
    ev.preventDefault();

    const newLogin = new FormData(ev.target).get('login');

    const handleUpdateLogin = async () => {
      const users = await databaseService.getUsers();
      const isLoginTaken = Object.values(users)
                                  .map((u) => u.login)
                                  .includes(newLogin);
      
      if (isLoginTaken) {
        notificationService.notify( t('interface.messages.changeLoginErrorAccountExists') );
        return;
      }

      databaseService.setUserField(id, 'login', newLogin);
      updateUser({ login: newLogin });

      notificationService.notify( t('interface.messages.loginChangeSuccess') );
      ev.target.reset();
    };
    handleUpdateLogin();
  };

  const handlePasswordChange = (ev) => {
    ev.preventDefault();

    const currentPassword = new FormData(ev.target).get('current-password');
    const newPassword = new FormData(ev.target).get('new-password');
    const repeatPassword = new FormData(ev.target).get('repeat-password');

    const handleUpdatePassword = async () => {
      const user = await databaseService.getUser({id});
      const userPassword = user.password;

      if (userPassword !== currentPassword) {
        notificationService.notify( t('interface.messages.currentPasswordIncorrect') );
      } 
      else if (newPassword === userPassword) {
        notificationService.notify( t('interface.messages.newPasswordIdenticalError') );
      }
      else if (newPassword !== repeatPassword) {
        notificationService.notify( t('interface.messages.newPasswordRepeatError') );
      }
      else if (newPassword.length < 5) {
        notificationService.notify( t('interface.messages.passwordLengthError') );
      }
      else {
        databaseService.setUserField(id, 'password', newPassword);
        updateUser({ password: newPassword });
        
        notificationService.notify( t('interface.messages.passwordChangeSuccess') );
        ev.target.reset();
      }
    }

    handleUpdatePassword();
  };

  const handleDeleteAccount = () => {
    const confirmed = notificationService.ask( 
      t('interface.messages.accountRemovalConfirmation')
    );
    if (!confirmed) return;

    const handleDelete = async () => {
      await databaseService.removeUser(id);
      userLogOut(true);
      navigate('/');
      notificationService.notify( 
        t('interface.messages.accountRemovalSuccess')
      );
    };
    handleDelete();
  };

  return (
    <>
      <h1>
        { t('interface.headings.cabinet.settings') || title }
      </h1>

      <div className="profile-settings">

        <div className="profile-settings__col">
          <form className="profile-settings__form" onSubmit={handleLoginChange}>
            <h5>
              { t('interface.forms.changeLogin') }
            </h5>
            
            <Input 
              id="login"
              placeholder={login}
              autoComplete="username"
              required
            />

            <button className="button button--border" type="submit">
              { t('interface.buttons.confirm') }
            </button>
          </form>

          <form className="profile-settings__form" onSubmit={handlePasswordChange}>
            <h5>
              { t('interface.forms.changePassword') }
            </h5>

            <Input 
              id="current-password"
              type="password"
              label={ t('interface.forms.enterCurrentPassword') }
              placeholder={ t('interface.forms.enterPassword') }
              required
            />
            
            <Input 
              id="new-password"
              type="password"
              label={ t('interface.forms.enterNewPassword') }
              placeholder={ t('interface.forms.enterPassword') }
              required
            />

            <Input 
              id="repeat-password"
              type="password"
              label={ t('interface.forms.repeatNewPassword') }
              placeholder={ t('interface.forms.enterPassword') }
              required
            />

            <button className="button button--border" type="submit">
              { t('interface.buttons.confirm') }
            </button>
          </form>

          <button
           className="link link--underline link--red"
           onClick={handleDeleteAccount}
          >
            { t('interface.buttons.removeAccount') }
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ user: { account: { id, login } } }) => ({
  id, login
});

const mapDispatchToProps = {
  updateUser, userLogOut
};

export default compose(
  withNotificationService(),
  withDatabaseService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSettings);
