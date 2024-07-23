// import React, {useState, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import color from '../../components/color';
// import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
// import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
// import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
// import {useTranslation} from 'react-i18next';
// import {useFocusEffect} from '@react-navigation/native';
// import {useLoading} from '../../context/Loading/LoadingContext';

// import {useSelector} from 'react-redux';
// import {getAddressesAPI} from '../../services/checkout_api';

// const AddressScreen = () => {
//   const {setIsLoading} = useLoading();
//   const userData = useSelector(state => state.user?.userData);
//   const {t} = useTranslation();

//   const [addressList, setAddressList] = useState([]);
//   const [address, setAddress] = useState(null);
//   const [openAddress, setOpenAddress] = useState(false);
//   const [isAddMode, setIsAddMode] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [formData, setFormData] = useState({
//     category: '',
//     block: '',
//     street: '',
//     houseBuilding: '',
//     apartment: '',
//     area: '',
//     country: '',
//     jaddah: '',
//     extraDirections: '',
//   });

//   const handleAddAddress = () => {
//     setAddresses([...addresses, formData]);
//     setFormData({
//       category: '',
//       block: '',
//       street: '',
//       houseBuilding: '',
//       apartment: '',
//       area: '',
//       country: '',
//       jaddah: '',
//       extraDirections: '',
//     });
//     setIsAddMode(false);
//   };

//   const handleChange = (key, value) => {
//     setFormData({...formData, [key]: value});
//   };

//   const renderAddForm = () => (
//     <View style={styles.form}>
//       {Object.keys(formData).map(key => (
//         <TextInput
//           key={key}
//           style={styles.input}
//           placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
//           value={formData[key]}
//           onChangeText={text => handleChange(key, text)}
//         />
//       ))}
//       <Button title="Submit" onPress={handleAddAddress} />
//     </View>
//   );
//   const renderAddress = () => {
//     var addressArray = [];
//     if (address?.apartment) {
//       addressArray.push(address.apartment);
//     }
//     if (address?.house) {
//       addressArray.push(address.house);
//     }
//     if (address?.street) {
//       addressArray.push(address.street);
//     }
//     if (address?.city) {
//       addressArray.push(address.city);
//     }
//     return (
//       <MetropolisSemiBoldText style={{lineHeight: 18, marginTop: 10}}>
//         {`${t('common.address')} `}
//         <MetropolisRegularText style={{lineHeight: 18}}>
//           {addressArray.join(', ') +
//             (address?.country ? ' - ' + address?.country?.name : '')}
//         </MetropolisRegularText>
//       </MetropolisSemiBoldText>
//     );
//   };

//   const renderAllAddresses = () => (
//     <View>
//       <MetropolisMediumText>{t('common.selectAddress')}</MetropolisMediumText>
//       <DropDownPicker
//         items={addressList}
//         style={{
//           minHeight: 40,
//           marginBottom: 0,
//           backgroundColor: color.white,
//         }}
//         textStyle={{
//           textAlign: 'left',
//         }}
//         arrowColor={color.Lefticon}
//         arrowSize={10}
//         value={address ? address.value : ''}
//         placeholder={t('common.selectAddress')}
//         placeholderTextColor={'#CACACA'}
//         open={openAddress}
//         dropDownDirection="TOP"
//         listMode="SCROLLVIEW"
//         setOpen={setOpenAddress}
//         setValue={valueFun => {
//           const value = valueFun();
//           const data = addressList.find(item2 => item2.id == value);
//           setAddress(data);
//         }}
//         zIndex={8000}
//       />
//       {renderAddress()}
//     </View>
//   );

//   const getAddresses = async () => {
//     try {
//       setIsLoading(true);
//       const response = await getAddressesAPI();
//       console.log('addresses....', response);
//       setIsLoading(false);
//       if (response && response.data && response.data.success) {
//         const array = response.data.data;
//         setAddressList(
//           array.map(item => {
//             return {
//               ...item,
//               value: item.id + '',
//               label: item.category,
//             };
//           }),
//         );
//       }
//     } catch (err) {
//       console.log(
//         '[getAddresses] Error : ',
//         err?.response?.data?.message ?? err?.message,
//       );
//       setIsLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getAddresses();
//     }, []),
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.toggleContainer}>
//         <TouchableOpacity
//           onPress={() => setIsAddMode(false)}
//           style={isAddMode ? styles.tab : styles.activeTab}>
//           <Text style={styles.tabText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => setIsAddMode(true)}
//           style={!isAddMode ? styles.tab : styles.activeTab}>
//           <Text style={styles.tabText}>Add</Text>
//         </TouchableOpacity>
//       </View>
//       {isAddMode ? renderAddForm() : renderAllAddresses()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   tab: {
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//     padding: 10,
//   },
//   activeTab: {
//     borderBottomWidth: 2,
//     borderBottomColor: color.blue,
//     padding: 10,
//   },
//   tabText: {
//     fontSize: 18,
//   },
//   form: {
//     flex: 1,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   addressItem: {
//     padding: 10,
//     marginVertical: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
//   addressText: {
//     fontSize: 14,
//   },
//   submitButton: {
//     backgroundColor: color.blue,
//   },
// });

// export default AddressScreen;

import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import color from '../../components/color';
import MetropolisRegularText from '../../components/Text/MetropolisRegularText';
import MetropolisMediumText from '../../components/Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../components/Text/MetropolisSemiBoldText';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {useLoading} from '../../context/Loading/LoadingContext';
import {useSelector} from 'react-redux';
import {getAddressesAPI} from '../../services/checkout_api';

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Text style={styles.bannerText}>My Addresses</Text>
    </View>
  );
};

const AddressScreen = () => {
  const {setIsLoading} = useLoading();
  const userData = useSelector(state => state.user?.userData);
  const {t} = useTranslation();

  const [addressList, setAddressList] = useState([]);
  const [address, setAddress] = useState(null);
  const [openAddress, setOpenAddress] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    block: '',
    street: '',
    houseBuilding: '',
    apartment: '',
    area: '',
    country: '',
    jaddah: '',
    extraDirections: '',
  });

  const handleAddAddress = () => {
    setAddresses([...addresses, formData]);
    setFormData({
      category: '',
      block: '',
      street: '',
      houseBuilding: '',
      apartment: '',
      area: '',
      country: '',
      jaddah: '',
      extraDirections: '',
    });
    setIsAddMode(false);
  };

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const renderAddForm = () => (
    <ScrollView style={styles.form}>
      {Object.keys(formData).map(key => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
          value={formData[key]}
          onChangeText={text => handleChange(key, text)}
        />
      ))}
      <Button title="Submit" onPress={handleAddAddress} />
    </ScrollView>
  );

  const renderAddress = () => {
    var addressArray = [];
    if (address?.apartment) {
      addressArray.push(address.apartment);
    }
    if (address?.house) {
      addressArray.push(address.house);
    }
    if (address?.street) {
      addressArray.push(address.street);
    }
    if (address?.city) {
      addressArray.push(address.city);
    }
    return (
      <MetropolisSemiBoldText style={{lineHeight: 18, marginTop: 10}}>
        {`${t('common.address')} `}
        <MetropolisRegularText style={{lineHeight: 18}}>
          {addressArray.join(', ') +
            (address?.country ? ' - ' + address?.country?.name : '')}
        </MetropolisRegularText>
      </MetropolisSemiBoldText>
    );
  };

  const renderAllAddresses = () => (
    <View style={{padding: 20}}>
      <MetropolisMediumText>{t('common.selectAddress')}</MetropolisMediumText>
      <DropDownPicker
        items={addressList}
        style={{
          minHeight: 40,
          marginBottom: 0,
          backgroundColor: color.white,
        }}
        textStyle={{
          textAlign: 'left',
        }}
        arrowColor={color.Lefticon}
        arrowSize={10}
        value={address ? address.value : ''}
        placeholder={t('common.selectAddress')}
        placeholderTextColor={'#CACACA'}
        open={openAddress}
        dropDownDirection="TOP"
        listMode="SCROLLVIEW"
        setOpen={setOpenAddress}
        setValue={valueFun => {
          const value = valueFun();
          const data = addressList.find(item2 => item2.id == value);
          setAddress(data);
        }}
        zIndex={8000}
      />
      {renderAddress()}
    </View>
  );

  const getAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await getAddressesAPI();
      console.log('addresses....', response);
      setIsLoading(false);
      if (response && response.data && response.data.success) {
        const array = response.data.data;
        setAddressList(
          array.map(item => {
            return {
              ...item,
              value: item.id + '',
              label: item.category,
            };
          }),
        );
      }
    } catch (err) {
      console.log(
        '[getAddresses] Error : ',
        err?.response?.data?.message ?? err?.message,
      );
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Banner />
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setIsAddMode(false)}
          style={isAddMode ? styles.tab : styles.activeTab}>
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsAddMode(true)}
          style={!isAddMode ? styles.tab : styles.activeTab}>
          <Text style={styles.tabText}>Add</Text>
        </TouchableOpacity>
      </View>
      {isAddMode ? renderAddForm() : renderAllAddresses()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  bannerContainer: {
    backgroundColor: '#0b4475',
    padding: 20,
    // borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  bannerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: color.blue,
    padding: 10,
  },
  tabText: {
    fontSize: 18,
  },
  form: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingBottom: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addressItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  addressText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: color.blue,
  },
});

export default AddressScreen;
