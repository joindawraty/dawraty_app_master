import {Alert, Linking} from 'react-native';
import {request} from 'react-native-permissions';

const usePermissions = () => {
  const requestPermissions = async (permission, permissionName = '') => {
    try {
      const granted = await request(permission);
      console.log('granted: ', granted);
      if (granted === 'granted' || granted === 'limited') {
        console.log('Permission granted');
        return true;
      } else {
        Alert.alert(
          'Permission Error',
          permissionName +
            ' permission not granted, please allow permission from settings.',
          [
            {
              text: 'Settings',
              onPress: () => {
                Linking.openSettings();
              },
              style: 'default',
            },
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
          ],
        );
        return false;
      }
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };
  return {requestPermissions};
};
export default usePermissions;
