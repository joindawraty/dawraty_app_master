import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'native-base';

export default LanguageComponent = props => {
  const [Language, setLanguage] = useState(true);
  // console.log(props)

  const selectLanguage = lang => {
    props.setLanguage(lang);
  };
  const renderLanguageDropDown = () => {
    const {language} = props;
    return (
      <TouchableOpacity
        onPress={() => setLanguage(!Language)}
        style={{
          alignItems: 'center',
          // borderRadius: 20,
          height: 30,
          width: 30,
          padding: 4,
          elevation: 5,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 15, fontWeight: '500', marginTop: 0}}>
          {Language ? 'En' : 'GE'}
        </Text>
      </TouchableOpacity>
      // </View>
    );
  };
  useEffect(() => {
    if (props.title != null) {
      // if(props.title.split(' ').length>2){
      //   setFontScale(widthPercentageToDP('6%'))
      // }
    }
  }, [props]);
  return <View>{renderLanguageDropDown()}</View>;
};
