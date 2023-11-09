import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class NotificationService {
  
  notify = (message) => {
    toast.clearWaitingQueue();
    toast(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  ask = (question) => {
    // eslint-disable-next-line no-restricted-globals
    return confirm(question);
  }
}
