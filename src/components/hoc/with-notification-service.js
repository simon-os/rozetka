import React from 'react';
import { NotificationServiceConsumer } from '../../context/notification-service-context';

const withNotificationService = () => (Component) => {
  return function withNotificationService (props) {
    return (
      <NotificationServiceConsumer>
        {
          (notificationService) => ( 
            <Component notificationService={notificationService} {...props} />
          )
        }
      </NotificationServiceConsumer>
    );
  } 
};
 
export default withNotificationService;
