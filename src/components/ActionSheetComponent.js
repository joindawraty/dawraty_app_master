import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import color from './color';

const ActionSheetComponent = ({isModalVisible, onClose, onOptionSelect}) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      transparent={true}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
      isVisible={isModalVisible}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          paddingBottom: safeAreaInsets.bottom,
        }}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            onOptionSelect(1);
          }}>
          <Text style={styles.text}>Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            onOptionSelect(2);
          }}>
          <Text style={styles.text}>Document</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionContainer,
            {
              backgroundColor: '#00000000',
            },
          ]}
          onPress={onClose}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.99}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#000000',
          paddingBottom: safeAreaInsets.bottom,
        }}>
       
      </TouchableOpacity> */}
    </Modal>
  );
};

export default ActionSheetComponent;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: color.white,
  },
  text: {
    fontSize: 15,
  },
  optionContainer: {
    height: 45,
    backgroundColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
});
