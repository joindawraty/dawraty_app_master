// Code by Askari Team
//Custom Button to open the modal of remaining buttons
//18july24
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Modal, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import color from './color';
import {useNavigation} from '@react-navigation/native';

const CustomActionButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handlePress = screen => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 1,
            
          }}
          onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="graduation-cap" size={40} color={color.blue} />
        </TouchableOpacity>
      </View>
     

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('MyCourses')}>
                <Icon name="book" size={30} color="white" />
                <Text style={styles.optionText}>Courses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('Instructor')}>
                <Icon name="person" size={30} color="white" />
                <Text style={styles.optionText}>Instructors</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('Wishlist')}>
                <Icon name="heart" size={30} color="white" />
                <Text style={styles.optionText}>Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => handlePress('Flashcards')}>
                <Icon name="flash" size={30} color="white" />
                <Text style={styles.optionText}>Flashcards</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: -2,
    zIndex: 1,
    // marginHorizontal: 140,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#0b4475',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '85%',
    position: 'relative',
    paddingVertical: 10,
    marginBottom: 100,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
  },
  optionText: {
    marginTop: 5,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomActionButton;
