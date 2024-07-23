import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import MetropolisSemiBoldText from '../Text/MetropolisSemiBoldText';

import color from '../color';
import {BASE_API} from '../../services/API_URI';

import useCategories from '../../hooks/useCategories';
import RoutePaths from '../../util/RoutePaths';
import {useTranslation} from 'react-i18next';
import MyImage from '../MyImage';

const CategoryItem = props => {
  const {id, name, image, translation, onPress} = props;
  const {t} = useTranslation();
  return (
    <Pressable
      key={id}
      onPress={onPress}
      style={{
        width: (Dimensions.get('window').width * 55) / 100,
        marginRight: 20,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: color.white,
        shadowColor: color.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginLeft: 1,
      }}>
      <MyImage source={image} style={styles.addPhoto} resizeMode="cover" />
      <MetropolisSemiBoldText
        style={{
          fontSize: 15,
          textAlign: 'center',
          marginVertical: 10,
          color: color.blue,
        }}>
        {/* {name} */}
        {t('dynamic', {
          en: name,
          ar: translation?.value ?? name,
        })}
      </MetropolisSemiBoldText>
    </Pressable>
  );
};

const Categories = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {categories} = useCategories();

  const renderItem = (item, index) => (
    <CategoryItem
      key={index}
      id={item?.id ?? index}
      name={item?.name}
      image={{uri: BASE_API + item?.image_path}}
      translation={item?.translation}
      onPress={() => {
        navigation.navigate(RoutePaths.courses, {
          category: item,
          isCategory: true,
        });
      }}
    />
  );

  if (!categories?.length) {
    return null;
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <MetropolisSemiBoldText style={styles.titleTxt}>
          {t('common.categories')}
        </MetropolisSemiBoldText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {categories?.map(renderItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: color.blue,
    fontSize: 18,
  },
  contentContainerStyle: {
    marginTop: 15,
    marginBottom: 20,
    paddingBottom: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  addPhoto: {
    width: (Dimensions.get('window').width * 55) / 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
});

export default Categories;
