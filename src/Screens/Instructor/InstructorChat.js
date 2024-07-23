import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'react-native-blob-util';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import AppInputText from '../../components/AppTextInput';
import ChatItemComponent from '../../components/ChatItemComponent';
import ActionSheetComponent from '../../components/ActionSheetComponent';
import InstructorChatHeaderComponent from '../../components/InstructorComponent/InstructorChatHeaderComponent';

import {useLoading} from '../../context/Loading/LoadingContext';
import useSelectImage from '../../hooks/useSelectImage';

import color from '../../components/color';
import {vh} from '../../util/dimenstions';
import {getComments, postComment} from '../../services/chat_api';
import {images} from '../../constants';
import util from '../../util';
import {errorToast} from '../../util/toastUtils';
import {BASE_API} from '../../services/API_URI';

const InstructorChat = ({route, navigation}) => {
  const instructorData = route.params.data;
  const safeAreaInsets = useSafeAreaInsets();

  const {t} = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [comments, setComments] = useState([]);
  const [messageTxt, setMessageTxt] = useState('');
  const {setIsLoading} = useLoading();
  const {pickImage} = useSelectImage();

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getComments(instructorData.id);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        setComments(response.data.data);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSendMessage = async () => {
    try {
      const payload = {
        comment: messageTxt,
      };
      setIsLoading(true);
      const response = await postComment(instructorData.id, payload);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        setComments([response.data.data, ...comments]);
      }
      setMessageTxt('');
    } catch (err) {
      setIsLoading(false);
    }
  };

  const onSendAttachment = async payload => {
    try {
      setIsLoading(true);
      const response = await postComment(instructorData.id, payload);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        getData();
      }
      setMessageTxt('');
    } catch (err) {
      setIsLoading(false);
    }
  };

  const renderChatMessagesHandler = ({item, index}) => {
    const {id, comment, created_at, user_id} = item;
    return (
      <ChatItemComponent
        key={id}
        senderId={user_id}
        messageTxt={comment}
        date={moment(created_at).fromNow()}
        item={item}
        onDownload={onDownloadDocument}
      />
    );
  };

  const onDownloadDocument = async item => {
    try {
      setIsLoading(true);
      await util.MethodUtils.downloadDocument(
        BASE_API + item.attachment.attachment_path,
      );
      setIsLoading(false);
    } catch (err) {
      console.log('Error : ', err?.message);
      setIsLoading(false);
      errorToast(t('alertMessage.wrong'));
    }
  };

  const getFileExtension = uri => {
    const uriParts = uri.split('/');
    return uriParts[uriParts.length - 1];
  };

  const onOptionSelect = type => {
    if (type == 1) {
      pickImage()
        .then(response => {
          if (response.data) {
            const ext = util.MethodUtils.getFileExtensionFromUrl(response.path);
            onSendAttachment({
              attachment: 'data:' + response.mime + ';base64,' + response.data,
              file_ext: ext,
              msg_type: 'attachment',
            });
          }
        })
        .catch(error => {
          console.log('eeror', error);
        });
    } else if (type == 2) {
      setTimeout(() => {
        DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
          ],
        })
          .then(async res => {
            if (res && res.length > 0) {
              const base64Data = await RNFetchBlob.fs.readFile(
                Platform.OS == 'ios'
                  ? res[0].uri.replace('file://', '')
                  : res[0].uri,
                'base64',
              );
              const fileExtension = getFileExtension(res[0].type);
              onSendAttachment({
                attachment: 'data:' + res[0].type + ';base64,' + base64Data,
                file_ext: fileExtension,
                msg_type: 'attachment',
              });
            }
          })
          .catch(error => {
            console.log('error: ', JSON.stringify(error));
          });
      }, 400);
    }
  };
  return (
    <View style={[styles.container, {marginBottom: safeAreaInsets.bottom}]}>
      {InstructorChatHeaderComponent(instructorData)}
      <FlatList
        data={comments}
        renderItem={renderChatMessagesHandler}
        // stickyHeaderIndices={[0]}
        contentContainerStyle={styles.listContentContainer}
        inverted
      />
      <View style={styles.screenFooterContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsModalVisible(true);
          }}
          activeOpacity={0.9}
          style={styles.attachmentButton}>
          <Image
            style={styles.attachmentImage}
            source={images.slider.ic_attachment}
          />
        </TouchableOpacity>
        <AppInputText
          placeholder={t('common.typeMessage')}
          style={styles.screenFooterTextInput}
          multiline
          value={messageTxt}
          numberOfLines={4}
          textAlignVertical="top"
          onChangeText={text => {
            setMessageTxt(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            onSendMessage();
          }}
          style={styles.sendImage}>
          <Icon name="send-sharp" size={21} />
        </TouchableOpacity>
      </View>
      <ActionSheetComponent
        isModalVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onOptionSelect={type => {
          setIsModalVisible(false);
          setTimeout(() => {
            onOptionSelect(type);
          }, 400);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  attachmentImage: {
    height: 20,
    width: 20,
  },
  attachmentButton: {
    height: 45,
    width: 30,
    justifyContent: 'center',
  },
  sendImage: {
    marginLeft: 15,
  },
  screenFooterTextInput: {
    flexGrow: 1,
    borderRadius: 30,
    backgroundColor: color.white,
    width: '80%',
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    // paddingStart: 20,
    // paddingEnd: 15,
    // fontSize: 14,
    height: null,
    maxHeight: vh(100),
  },
  screenFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: color.greyNew,
  },
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
});

export default InstructorChat;
