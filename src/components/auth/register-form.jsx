import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  userRequested,
  userLoaded,
  userError
} from '../../store/actions/user-actions';
import Input from '../input/input';
import withDatabaseService from '../hoc/with-database-service';
import withNotificationService from '../hoc/with-notification-service';

const RegisterForm = ({ 
  title, notificationService, onFormSubmit, 
  account: currentData, databaseService,
  userRequested, userLoaded, userError
}) => {

  const { t } = useTranslation();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    
    const formData = new FormData(ev.target);
    const login = formData.get('login');
    const password = formData.get('password');

    const isFormValid = validate({ login, password });
    if (!isFormValid) return;

    try {
      userRequested();
      const user = await databaseService.getUser({ login });
      if (user) {
        notificationService.notify( t('interface.messages.userAlreadyRegistered') );
        return;
      }
  
      const newUser = await databaseService.registerUser(login, password, currentData);
      if (newUser) {
        userLoaded(newUser);
        notificationService.notify( t('interface.messages.userRegistrationSuccess') );
        onFormSubmit();
      } 
      else {
        notificationService.notify( t('interface.messages.userRegistrationError') );
      }
    }
    catch(e) {
      userError();
      console.error(e);
    }
  };

  const validate = (options = {}) => {
    const { login, password } = options;
    let isLoginValid = false;
    let isPasswordValid = false;

    if (login.trim().length < 3) {
      notificationService.notify( t('interface.messages.loginLengthError') );
    } 
    else {
      isLoginValid = true;
    }

    if (password.trim().length < 5) {
      notificationService.notify( t('interface.messages.passwordLengthError') );
    } 
    else {
      isPasswordValid = true;
    }

    return isLoginValid && isPasswordValid;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      { title && <h3>{ title }</h3> }

      <Input
        id="login"
        label={ t('interface.forms.login') }
        autoComplete="username"
        required
      />

      <Input 
        id="password"
        type="password"
        label={ t('interface.forms.password') }
        required
      />

      <button className="button button--border">
        { t('interface.buttons.register') }
      </button>
    </form>
  );
};

const mapStateToProps = ({ user: { account } }) => ({
  account
});

const mapDispatchToProps = {
  userRequested,
  userLoaded,
  userError
};

export default compose(
  withDatabaseService(),
  withNotificationService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterForm);

