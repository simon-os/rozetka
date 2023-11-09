import RegisterForm from './register-form';
import LogInForm from './log-in-form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useTranslation } from 'react-i18next';
import 'react-tabs/style/react-tabs.css';

const Auth = ({ title, onFormSubmit }) => {

  const { t } = useTranslation();

  return (
    <div className="auth">
      { title && <h3>{ title }</h3> }

      <Tabs>
        <TabList>
          <Tab>{ t('interface.headings.logIn') }</Tab>
          <Tab>{ t('interface.headings.register') }</Tab>
        </TabList>

        <TabPanel>
          <LogInForm onFormSubmit={onFormSubmit} />
        </TabPanel>
        <TabPanel>
          <RegisterForm onFormSubmit={onFormSubmit} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Auth;
