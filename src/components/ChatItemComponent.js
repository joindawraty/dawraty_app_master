// import React, {useMemo} from 'react';
// import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {useSelector} from 'react-redux';
// import {appConstants, images} from '../constants';
// import color from './color';
// import MetropolisRegularText from './Text/MetropolisRegularText';
// import MetropolisLightText from './Text/MetropolisLightText';
// import Icon from 'react-native-vector-icons/Ionicons';

// const ChatItemComponent = props => {
//   const {userData} = useSelector(state => state.user);
//   const {messageTxt, senderId, date, item} = props;

//   const renderMessageText = useMemo(() => {
//     var message = messageTxt;
//     if (item.attachment) {
//       message = item.attachment.attachment_file;
//     }
//     return (
//       <View style={styles.innerContainer}>
//         {item.attachment && (
//           <TouchableOpacity
//             onPress={() => {
//               props.onDownload(item);
//             }}
//             style={styles.downloadContainer}>
//             <Icon
//               style={{
//                 color:
//                   userData?.user?.type === appConstants.Instructor &&
//                   senderId === userData?.user.id
//                     ? color.white
//                     : userData?.user?.type === appConstants.Student &&
//                       senderId === userData?.user.id
//                     ? color.white
//                     : color.black,
//               }}
//               name="download-outline"
//               size={25}
//             />
//           </TouchableOpacity>
//         )}
//         <MetropolisRegularText
//           style={[
//             styles.messageText,
//             {
//               color:
//                 userData?.user?.type === appConstants.Instructor &&
//                 senderId === userData?.user.id
//                   ? color.white
//                   : userData?.user?.type === appConstants.Student &&
//                     senderId === userData?.user.id
//                   ? color.white
//                   : color.black,
//             },
//           ]}>
//           {message}
//         </MetropolisRegularText>
//       </View>
//     );
//   }, [messageTxt, item, userData, senderId, props]);

//   return (
//     <View style={styles.conatiner}>
//       <View
//         style={[
//           styles.messageDateContainer,
//           {
//             backgroundColor:
//               userData?.user?.type === appConstants.Instructor &&
//               senderId === userData?.user.id
//                 ? color.skyBlue
//                 : userData?.user?.type === appConstants.Student &&
//                   senderId === userData?.user.id
//                 ? color.skyBlue
//                 : color.greyNew,
//           },
//         ]}>
//         {renderMessageText}
//       </View>
//       <MetropolisLightText style={styles.dateText}>{date}</MetropolisLightText>
//     </View>
//   );
// };

// export default ChatItemComponent;

// const styles = StyleSheet.create({
//   downloadContainer: {
//     marginRight: 5,
//     height: 30,
//     width: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   innerContainer: {
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   conatiner: {
//     marginBottom: 20,
//   },
//   messageDateContainer: {
//     flexDirection: 'column',
//     flex: 1,
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   messageText: {
//     fontSize: 12,
//   },
//   dateText: {
//     textAlign: 'right',
//     marginTop: 10,
//     fontSize: 9,
//   },
// });

//9july24
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {appConstants} from '../constants';
import color from './color';
import MetropolisRegularText from './Text/MetropolisRegularText';
import MetropolisLightText from './Text/MetropolisLightText';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatItemComponent = props => {
  const {userData} = useSelector(state => state.user);
  const {messageTxt, senderId, date, item} = props;

  const renderMessageText = useMemo(() => {
    var message = messageTxt;
    if (item.attachment) {
      message = item.attachment.attachment_file;
    }
    return (
      <View style={styles.innerContainer}>
        {item.attachment && (
          <TouchableOpacity
            onPress={() => {
              props.onDownload(item);
            }}
            style={styles.downloadContainer}>
            <Icon
              style={{
                color:
                  userData?.user?.type === appConstants.Instructor &&
                  senderId === userData?.user.id
                    ? color.white
                    : userData?.user?.type === appConstants.Student &&
                      senderId === userData?.user.id
                    ? color.white
                    : color.black,
              }}
              name="download-outline"
              size={25}
            />
          </TouchableOpacity>
        )}
        <MetropolisRegularText
          style={[
            styles.messageText,
            {
              color:
                userData?.user?.type === appConstants.Instructor &&
                senderId === userData?.user.id
                  ? color.white
                  : userData?.user?.type === appConstants.Student &&
                    senderId === userData?.user.id
                  ? color.white
                  : color.black,
            },
          ]}>
          {message}
        </MetropolisRegularText>
      </View>
    );
  }, [messageTxt, item, userData, senderId, props]);

  return (
    <View
      style={[
        styles.container,
        senderId === userData?.user.id
          ? styles.senderContainer
          : styles.receiverContainer,
      ]}>
      <View
        style={[
          styles.messageBubble,
          senderId === userData?.user.id
            ? styles.senderBubble
            : styles.receiverBubble,
        ]}>
        {renderMessageText}
      </View>
      <MetropolisLightText style={styles.dateText}>{date}</MetropolisLightText>
    </View>
  );
};

export default ChatItemComponent;

const styles = StyleSheet.create({
  downloadContainer: {
    marginRight: 5,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  senderContainer: {
    alignItems: 'flex-end',
  },
  receiverContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    maxWidth: '70%',
    position: 'relative',
  },
  senderBubble: {
    backgroundColor: color.skyBlue,
    borderTopRightRadius: 0,
  },
  receiverBubble: {
    backgroundColor: color.greyNew,
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 14,
  },
  dateText: {
    marginTop: 5,
    fontSize: 9,
    color: '#888',
    alignSelf: 'flex-end',
  },
});
