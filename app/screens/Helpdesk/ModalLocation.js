import {
  Header,
  Icon,
  ListTextButton,
  SafeAreaView,
  Tag,
  Text,
  Button,
  CategoryGrid,
  ModalFilterLocation,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';
import {FFriends} from '@data';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {haveChildren} from '@utils';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {SceneMap} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import {API_URL} from '@env';
import styles from './styles';
import client from '../../controllers/HttpClient';

import ModalDropdown_debtor from '@components/ModalDropdown_debtor';
import ModalDropdown_lotno from '@components/ModalDropdown_lotno';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalLocation(props) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataLocation, setLocation] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [urlApi, seturlApi] = useState(client);

  const [arrayholder, setArrayHolder] = useState([]);
  const [getLocationFilter, setLocationFilter] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [itemBank, setItemBank] = useState('');

  const [propsparams, setPropsParams] = useState(props);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getLocation();
      searchFilterFunction();
    }, 1000);
  }, []);
  const getLocation = async () => {
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // token: "",
      },
    };

    await axios
      .get(urlApi + '/csentry-getLocation', {
        config,
      })
      .then(res => {
        if (!res.Error) {
          const datas = res.data;
          const arrLocation = datas.Data;

          //   console.log('bank arrLocation', arrLocation);

          setSpinner(false);
          setLocationFilter(arrLocation);
          // this.setState({isLoaded: !this.state.isLoaded}, () => {
          //   // alert(res.Pesan)
          //   this.setState({getbank: resData});
          // });
        } else {
          setSpinner(false);
          alert(res.Pesan);
        }

        setArrayHolder(res.data.Data);
      })
      .catch(error => {
        console.log('error get location api', error);
        // alert('error get');
      });
  };

  const searchFilterFunction = text => {
    console.log('text', text);
    // console.log('arrayholder', arrayholder);
    const newData = arrayholder.filter(item => {
      const itemData = `${item.descs}`;
      const textData = text;
      return itemData;
    });
    setLocationFilter(newData);
  };

  const selectedItem = async item => {
    console.log('item select loc', item);

    // alert(val);
    setPropsParams(item);
    // alert(val);
    if (item) {
      //   console.log('props', propsparams);
      const itemLocation = item;
      const jsonValue = JSON.stringify(itemLocation);
      //   setdataFormHelp(saveStorage);
      // console.log('storage', saveStorage);

      await AsyncStorage.setItem('@locationStorage', jsonValue);
      navigation.goBack({passLocation: item});

      //   navigation.navigate('SubmitHelpdesk', {passLocation: item});
    }

    // this.setModalVisible(!this.state.modalVisible)
  };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        // title={t('choose_friend')}
        title={t('location')} //belum ada lang translatenya
        renderLeft={() => {
          return (
            <Icon
              name="angle-left"
              size={20}
              color={colors.text}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        placeholder="Search"
        style={{color: '#fff', fontSize: 14}}
        // onChangeText={this.handleSearch}
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}
      />
      {getLocationFilter == 0 ? (
        <ActivityIndicator color="#fff" style={{paddingTop: 10}} />
      ) : (
        <View containerStyle={{borderTopWidth: 0, borderBottomWidth: 0}}>
          <FlatList
            data={getLocationFilter}
            keyExtractor={item => item.location_cd}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() => selectedItem(item)}
                  style={{width: '100%'}}>
                  <View>
                    <Text style={{color: '#fff'}}>{item.descs}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
