import Toast from 'react-native-root-toast';
import color from '../components/color';

export const successToast = (messageText, duration = Toast.durations.SHORT) => {
  Toast.show(messageText, {
    duration: duration,
    position: Toast.positions.TOP,
    backgroundColor: color.blue,
  });
};

export const errorToast = (messageText, duration = Toast.durations.SHORT) => {
  Toast.show(messageText, {
    duration: duration,
    position: Toast.positions.TOP,
    backgroundColor: color.red,
  });
};

export const showToast = (messageText, duration = Toast.durations.SHORT) => {
  Toast.show(messageText, {
    duration: duration,
    position: Toast.positions.TOP,
  });
};
