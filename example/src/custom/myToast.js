import { toast } from 'react-interaction';

const myToast = (message) => {
  toast(message, {
    time: 1000,
    className: 'my-toast',
  });
};

export default myToast;
