import { toast } from 'react-interaction';

export default (message) => {
  toast(message, {
    time: 1000,
    className: 'my-toast',
  });
}
