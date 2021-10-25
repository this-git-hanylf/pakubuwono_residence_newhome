import {Icon, Image, Text} from '@components';
import {BaseColor, Images, useTheme} from '@config';
import React, {Fragment} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import getUser from '../../selectors/UserSelectors';
import {useSelector} from 'react-redux';

const HeaderHome = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {colors} = useTheme();
  const {onPressRight = () => {}, style = {}, ComponentRight} = props;
  const user = useSelector(state => getUser(state));

  return (
    <Fragment>
      <View style={[styles.header, style]}>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => navigation.navigate('Profile')}>
          <Image source={{uri: `${user.pict}`}} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.contentHeader}>
          <Text subhead light>
            {t('hello')}
          </Text>
          <Text body2>{user.name}</Text>
        </View>

        {ComponentRight ? (
          ComponentRight
        ) : (
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={() => navigation.navigate('Notification')}>
            <Icon name={'bell'} solid size={20} color={BaseColor.grayColor} />
            <View
              style={[
                styles.notyHeader,
                {
                  borderColor: BaseColor.whiteColor,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
};

export default HeaderHome;
