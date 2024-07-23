import usePermissions from './usePermissions';
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';

const useSelectImage = () => {
  const {requestPermissions} = usePermissions();

  const pickImage = async () => {
    var permission;
    if (Platform.OS === 'android') {
      const level = await DeviceInfo.getApiLevel();
      if (level >= 33) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    } else {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }
    const granted = await requestPermissions(permission, 'Gallery');
    if (granted) {
      return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          mediaType: 'photo',
          includeBase64: true,
          compressImageQuality: 0.9,
        })
          .then(image => {
            console.log(JSON.stringify(image));
            if (image && image.data) {
              resolve(image);
            } else {
              reject(null);
            }
          })
          .catch(error => {
            reject(null);
          });
      });
    }
  };

  return {pickImage};
};

export default useSelectImage;
