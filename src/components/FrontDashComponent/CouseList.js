import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import MetropolisMediumText from '../Text/MetropolisMediumText';

import {normalize, vh} from '../../util/dimenstions';
import {getTags} from '../../services/dashboard';
import color from '../color';

// const categories = {
//   All: true,
//   Trending: false,
//   Popular: false,
//   Featured: false,
// };

const CourseCategoryItem = ({title, isSelected, onPress, index, arr}) => {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const onPressHandler = () => {
    setSelected(prevState => (prevState ? prevState : !prevState));
    onPress(title);
  };

  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {
          backgroundColor: selected ? color.blue : color.white,
        },
      ]}
      onPress={onPressHandler}>
      <MetropolisMediumText
        style={{
          fontSize: normalize(13),
          color: selected ? color.white : color.blue,
        }}>
        {title}
      </MetropolisMediumText>
    </TouchableOpacity>
  );
};

const CourseCategories = props => {
  const {t} = useTranslation();
  const userData = useSelector(state => state.user?.userData);

  const [selected, setSelected] = useState(props?.selectedCategory?.id ?? '0');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getTags()
      .then(res => {
        if (res && res.data && res.data.data) {
          setCategories([{id: 0, name: 'All'}, ...res.data.data]);
        }
      })
      .catch(() => {});
  }, [userData]);

  const renderItem = (item, index, arr) => {
    return (
      <CourseCategoryItem
        key={item.id}
        title={t('dynamic', {
          en: index === 0 ? t('common.all') : item.name,
          ar:
            index === 0
              ? t('common.all')
              : item?.translation?.value
              ? item?.translation?.value
              : item.name,
        })}
        index={index}
        arr={arr}
        isSelected={item.id == selected}
        onPress={() => {
          setSelected(item.id);
          props.onPress(item.id != 0 ? item : null);
        }}
      />
    );
  };

  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollViewContent}
      showsHorizontalScrollIndicator={false}
      horizontal>
      {categories.map(renderItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 13,
    marginRight: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.blue,
  },
  scrollViewStyle: {
    flexGrow: 0,
  },
  scrollViewContent: {
    height: vh(35),
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default CourseCategories;
