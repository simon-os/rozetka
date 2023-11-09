import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import NotificationService from '../services/notification-service';
import DatabaseService from '../services/database-service';

const databaseService = new DatabaseService();
const notificationService = new NotificationService();

export const store = createStore(
  reducer, 
  applyMiddleware(thunk.withExtraArgument({ databaseService, notificationService })),
);
