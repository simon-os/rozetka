import React from 'react';
import { DatabaseServiceConsumer } from '../../context/database-service-context';

const withDatabaseService = () => (Component) => {
  return function WithDatabaseService (props) {
    return (
      <DatabaseServiceConsumer>
        {
          (databaseService) => ( 
            <Component databaseService={databaseService} {...props} />
          )
        }
      </DatabaseServiceConsumer>
    );
  } 
};
 
export default withDatabaseService;
