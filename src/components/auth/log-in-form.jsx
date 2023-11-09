import React from 'react';
import { connect } from 'react-redux';
import { 
  userRequested,
  userLoaded, userError 
} from '../../store/actions/user-actions';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import withDatabaseService from '../hoc/with-database-service';
import withNotificationService from '../hoc/with-notification-service';
import Input from '../input/input';

const LoginForm = ({ 
  title, onFormSubmit, 
  userRequested, userLoaded, userError,
  databaseService, notificationService
 }) => {

  const { t } = useTranslation();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    
    const formData = new FormData(ev.target);
    const login = formData.get('login');
    const password = formData.get('password');
    
    try {
      userRequested();
      const user = await databaseService.loginUser(login, password);
  
      if (user) {
        userLoaded(user);
        onFormSubmit();
      } 
      else {
        notificationService.notify( t('interface.messages.wrongLoginPassword') );
      }
    }
    catch(e) {
      userError();
      console.error(e);
    }
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
        { t('interface.buttons.logIn') }
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  userRequested, 
  userLoaded, 
  userError
};

export default compose(
  withDatabaseService(),
  withNotificationService(),
  connect(null, mapDispatchToProps)
)(LoginForm);
