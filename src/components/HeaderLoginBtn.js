import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

// Components
import MetropolisRegularText from '../components/Text/MetropolisRegularText';

const HeaderLoginBtn = props => {
  const {onPress} = props;
  const {t} = useTranslation();
  return (
    <Pressable style={styles.btnRightMargin} onPress={onPress}>
      <MetropolisRegularText style={styles.loginText}>
        {t('common.login')}
      </MetropolisRegularText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnRightMargin: {
    marginRight: 14,
  },
  loginText: {
    fontSize: 15,
  },
});

export default HeaderLoginBtn;
