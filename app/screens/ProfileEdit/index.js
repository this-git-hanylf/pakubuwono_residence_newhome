import {
  Button,
  Header,
  Icon,
  Image,
  SafeAreaView,
  Text,
  TextInput,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
// Load sample data
import {UserData} from '@data';
import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';

const ProfileEdit = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const [image, setImage] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => getUser(state));
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.handphone);

  useEffect(() => {
    if (user === null) {
      props.navigation.navigate('Auth');
    }
  });

  const saveProfiles = () => {
    const data = {
      email: user.user,
      name: name,
      phone: phone,
      gender: 'Male',
    };
    dispatch(saveProfile(data));
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('edit_profile')}
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <ScrollView>
        <View style={styles.contain}>
          <View>
            <Image source={{uri: `${user.pict}`}} style={styles.thumb} />
          </View>
          {/* <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('account')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setName(text)}
            autoCorrect={false}
            placeholder={t('input_id')}
            // placeholder={user.name}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
            selectionColor={colors.primary}
          /> */}
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('name')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setName(text)}
            autoCorrect={false}
            placeholder={t('input_name')}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
            selectionColor={colors.primary}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('email')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            // onChangeText={text => setEmail(text)}
            autoCorrect={false}
            editable={false}
            selectTextOnFocus={false}
            placeholder={t('input_email')}
            placeholderTextColor={BaseColor.grayColor}
            value={user.user}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('Handphone')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => setPhone(text)}
            autoCorrect={false}
            placeholder={t('input_address')}
            placeholderTextColor={BaseColor.grayColor}
            value={phone}
            selectionColor={colors.primary}
          />
        </View>
      </ScrollView>
      <View style={{padding: 20}}>
        <Button
          loading={loading}
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              // navigation.goBack();
              onPress = {saveProfiles};
            }, 500);
          }}>
          {t('confirm')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
