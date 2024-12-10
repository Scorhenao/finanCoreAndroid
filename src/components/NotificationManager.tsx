import React from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const NotificationManager = () => {
  return <FlashMessage position="center" />;
};

export const notify = (
  type: 'success' | 'danger' | 'warning' | 'info',
  message: string,
  description?: string,
) => {
  showMessage({
    message,
    description,
    type,
    icon: type,
    duration: 3000,
    style: {marginTop: 10, zIndex: 1000},
  });
};

export default NotificationManager;
