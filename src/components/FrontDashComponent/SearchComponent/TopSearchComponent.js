import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import MetropolisMediumText from '../../Text/MetropolisMediumText';
import MetropolisSemiBoldText from '../../Text/MetropolisSemiBoldText';

import color from '../../color';

const DATA = ['Biophysics', 'Biostatistics'];

const TopSearchComponent = props => {
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   if (props.courses) {
  //     setCourses(props.courses);
  //   }
  // }, [props.courses]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity key={index} style={styles.item}>
      <MetropolisMediumText style={styles.title}>{item}</MetropolisMediumText>
    </TouchableOpacity>
  );

  const renderListHeaderComponent = () => {
    return (
      <MetropolisSemiBoldText style={styles.headingText}>
        {'Top Searches'}
      </MetropolisSemiBoldText>
    );
  };

  return (
    <View style={styles.container}>
      {renderListHeaderComponent()}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topSearchesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  headingText: {
    color: color.blue,
    fontSize: 16,
  },
  topSearchesContainer: {
    marginTop: 15,
    marginLeft: 2,
    marginBottom: 15,
  },
  item: {
    backgroundColor: color.greyNew,
    height: 38,
    paddingHorizontal: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    color: color.black,
    fontSize: 13,
  },
});

export default TopSearchComponent;
