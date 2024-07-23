import RNFetchBlob from 'react-native-blob-util';
import {BASE_API} from '../services/API_URI';
import moment from 'moment';
import FileViewer from 'react-native-file-viewer';

const getFileExtensionFromUrl = url => {
  const parts = url.split('.');
  if (parts.length === 0) {
    return null;
  } // No extension found

  const lastPart = parts[parts.length - 1];
  const extension = lastPart.split('?')[0]; // Remove query parameters if any

  return extension.toLowerCase();
};

const openFileViewer = path => {
  return FileViewer.open(path);
};

const downloadDocument = async (uri, isView = true) => {
  const ext = getFileExtensionFromUrl(uri);
  const unix = moment().unix();

  const path = `${RNFetchBlob.fs.dirs.DocumentDir}/${unix}.${ext}`;

  const response = await RNFetchBlob.config({
    path,
  }).fetch('GET', uri);

  if (response && response.data) {
    await openFileViewer(response.data);
  }
  return response.data;
};

export default {
  downloadDocument,
  openFileViewer,
  getFileExtensionFromUrl,
};
