import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MetropolisMediumText from '../../Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../Text/MetropolisSemiBoldText';

import {slider} from '../../../constants/images';
import color from '../../color';

const DATA = [
  {
    title: 'Biophysics',
    image: slider.bio,
  },
  {
    title: 'Biostatistics',
    image: slider.bio,
  },
  {
    title: 'Biophysics',
    image: slider.bio,
  },
  {
    title: 'Biostatistics',
    image: slider.bio,
  },
];

const BrowseCategories = props => {
  // const [categories, setCategories] = useState(props.categories);
  // useEffect(() => {
  //   if (props.categories) {
  //     setCategories(props.categories);
  //   }
  // }, [props]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.item}>
      <View style={styles.leftContainer}>
        <Image source={item.image} style={styles.categoryImg} />
        <MetropolisMediumText style={styles.title}>
          {item.title}
        </MetropolisMediumText>
      </View>
      <Icon name="chevron-forward-outline" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MetropolisSemiBoldText style={styles.headingText}>
        {'Browse Categories'}
      </MetropolisSemiBoldText>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    color: color.blue,
    fontSize: 16,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginLeft: 15,
    color: color.black,
    fontSize: 13,
  },
  categoryImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

export default BrowseCategories;
