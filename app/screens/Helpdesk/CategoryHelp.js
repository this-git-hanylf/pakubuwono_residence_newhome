import {
  Text,
  // TextInput,
  // CheckBox,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  // RefreshControl,
  Header,
  Icon,
} from '@components';
import {BaseColor, BaseStyle, useTheme} from '@config';
import {CheckBox} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  TouchableHighlight,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import axios from 'axios';
import client from '../../controllers/HttpClient';
import styles from './styles';

import {RadioButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDarkMode} from 'react-native-dark-mode';

export default function CategoryHelp({route}) {
  const {t, i18n} = useTranslation();
  const {colors} = useTheme();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [urlApi, seturlApi] = useState(client);

  const [spinner, setSpinner] = useState(true);

  const [dataCategory, setDataCategory] = useState([]);

  const [typeLocation, setTypeLocation] = useState('');
  const [passPropStorage, setPassPropStorage] = useState();
  const [passProp, setpassProp] = useState(route.params.saveStorage);
  const [entity_cd, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [arrayholder, setArrayHolder] = useState([]);
  const isDarkMode = useDarkMode();
  const [loadingMore, setLoadingMore] = useState(true);
  const [allLoaded, setAllLoaded] = useState(true);
  //   console.log('passprop kategori help', passProp);
  const styleItem = {
    ...styles.profileItem,
    borderBottomColor: colors.border,
  };
  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
      app: 'O',
    };

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        // token: "",
      },
    };

    await axios
      .get(
        `http://103.111.204.131/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
          }
        });

        setArrDataTowerUser(arrDataTower);
        setSpinner(false);

        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        alert('error get');
      });
  };

  const getDataStorage = async () => {
    const value = await AsyncStorage.getItem('@helpdeskStorage');
    const DataTower = await AsyncStorage.getItem('@DataTower');
    console.log('data tower', DataTower);

    const passPropStorage = JSON.parse(value);

    setPassPropStorage(passPropStorage);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);
      getDataStorage();
      defaultLocation();
      searchFilterFunction();

      // getCategoryHelp;
      // setSpinner(false);
    }, 3000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // initialiseList();
  }, []);

  const defaultLocation = () => {
    getTower(users);
    getCategoryHelp('U');
  };
  // const handleSetRadio = (checked, type) => {
  //   // setSpinner(true);
  //   setTypeLocation('U');
  //   //   console.log('type u');
  //   getTower(users);
  //   getCategoryHelp(type);
  //   // if (type === 'P') {
  //   //   //   console.log('type p');
  //   //   //   getCategoryHelp();
  //   //   setTypeLocation('P');
  //   //   getTower(users);
  //   //   getCategoryHelp(type);
  //   // } else {
  //   //   setTypeLocation('U');
  //   //   //   console.log('type u');
  //   //   getTower(users);
  //   //   getCategoryHelp(type);
  //   //   //   getCategoryHelp(type);
  //   // }
  // };

  const searchFilterFunction = text => {
    setSpinner(true);
    console.log('text', text);

    const newData = arrayholder.filter(item => {
      const itemData = `${item.descs.toUpperCase()}`;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });
    console.log('new data', newData);
    setDataCategory(newData);
    setSpinner(false);
  };

  const getCategoryHelp = async type => {
    const params = {
      // entity: dataTowerUser.entity_cd || passProp.entity_cd,
      // project: dataTowerUser.project_no || passProp.project_no,
      entity_cd: dataTowerUser.entity_cd || passProp.entity_cd,
      project_no: dataTowerUser.project_no || passProp.project_no,
      location_type: type, //ini nanti pake radiobutton
    };
    console.log('params category', params);

    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
      },
    };

    await axios
      .post(
        // 'http://103.111.204.131/apiwebpbi/api/csentry-getCategoryHelp',
        'http://103.111.204.131/apiwebpbi/api/csentry-getCategoryDetail',
        params,
        {
          config,
        },
      )
      .then(res => {
        // console.log('res coba detail', res.data.Data);
        const datas = res.data;
        const dataCategorys = datas.Data;
        // console.log('data kategori', dataCategorys);

        setDataCategory(dataCategorys);
        setArrayHolder(dataCategorys);
        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error.response);
        alert('error get');
      });
  };

  const handleClick = async (data, index) => {
    // console.log('data group code?', data.group_cd);
    console.log('category_grop_cd', data.category_group_cd);
    console.log('loc_type', data.location_type);
    console.log('passprops', passProp);
    const saveParams = {
      // passProp,
      // category_group_cd: data.category_group_cd,
      // location_type: data.location_type,
      ...passPropStorage, //ini untuk langsung ke submit, krn screen select category di skip
      data, //ini untuk langsung ke submit, krn screen select category di skip
    };
    const saveStorage = {
      ...passPropStorage,
      //   ...passProp,
      data,
      category_group_cd: data.category_group_cd,
      location_type: data.location_type,
    };
    console.log('urutan kedua props', saveStorage);
    console.log('urutan kedua params', saveParams);

    const jsonValue = JSON.stringify(saveStorage);
    await AsyncStorage.setItem('@helpdeskStorage', jsonValue);

    const jsonValueNullLocation = JSON.stringify('');
    await AsyncStorage.setItem('@locationStorage', jsonValueNullLocation);

    // navigation.navigate('SelectCategory', {
    //   // screen: 'Settings',
    //   saveParams,
    // }); //ini di skip krn mau langsung gapake category, jadi langsung ke submit
    navigation.navigate('SubmitHelpdesk', {
      // screen: 'Settings',
      // saveParams,
      saveStorage,
    });
  };

  const initialiseList = async () => {
    // [for testing purposes] reset AsyncStorage on every app refresh
    await AsyncStorage.removeItem('saved_list');
    // get current persisted list items (will be null if above line is not removed)
    const curItems = await AsyncStorage.getItem('saved_list');
    if (curItems === null) {
      // no current items in AsyncStorage - fetch initial items
      json = fetchResults(0);
      // set initial list in AsyncStorage
      await AsyncStorage.setItem('saved_list', JSON.stringify(json));
    } else {
      // current items exist - format as a JSON object
      json = JSON.parse(curItems);
    }
    // update Redux store (Redux will ignore if `json` is same as current list items)
    dispatch({
      type: 'UPDATE_LIST_RESULTS',
      items: json,
    });
  };

  const loadMoreResults = async info => {
    console.log('info ini apa', info);
    //if already loading more, or all loaded, return
    if (loadingMore || allLoaded) return;
    // set loading more (also updates footer text)
    setLoadingMore(true);
    // get next results
    // const newItems = fetchResults(totalItems);
    // mimic server-side API request and delay execution for 1 second
    await delay(1000);
    if (newItems.length === 0) {
      // if no new items were fetched, set all loaded to true to prevent further requests
      setAllLoaded(true);
    } else {
      // process the newly fetched items
      // await persistResults(newItems);
    }
    // load more complete, set loading more to false
    setLoadingMore(false);
  };

  // const persistResults = async newItems => {
  //   // get current persisted list items
  //   const curItems = await AsyncStorage.getItem('saved_list');
  //   // format as a JSON object
  //   let json = curItems === null ? {} : JSON.parse(curItems);
  //   // add new items to json object
  //   for (let item of newItems) {
  //     json.push(item);
  //   }
  //   // persist updated item list
  //   await AsyncStorage.setItem('saved_list', JSON.stringify(json));
  //   // update Redux store
  //   dispatch({
  //     type: 'UPDATE_LIST_RESULTS',
  //     items: json,
  //   });
  // };

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('category_help')} //belum dibuat lang
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
      />
      <View style={styles.wrap}>
        <Text title2>Ticket</Text>
        <Text headline style={{fontWeight: 'normal'}}>
          Category Help
        </Text>
        <Text headline style={{fontWeight: 'normal', paddingTop: 20}}>
          Choose Location Type
        </Text>

        <View style={{flexDirection: 'row'}}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}> */}
          {/* <View style={{flexDirection: 'row'}}>
            <RadioButton
              color={BaseColor.hijau_pkbw}
              //   uncheckedColor={'blue'}
              value="P"
              status={typeLocation == 'P' ? 'checked' : 'unchecked'}
              // onPress={() => }
              onPress={() => handleSetRadio(true, 'P')}
            />
            <Text headline style={{alignSelf: 'center', fontWeight: 'normal'}}>
              Public Area
            </Text>
          </View> */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <RadioButton
              color={BaseColor.hijau_pkbw}
              value="U"
              // status={typeLocation == 'U' ? 'checked' : 'unchecked'}
              status={'checked'}
              // onPress={() => setTypeLocation('U')}
              // onPress={() => handleSetRadio(true, 'U')}
            />
            <Text headline style={{alignSelf: 'center', fontWeight: 'normal'}}>
              Unit
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          {/* {!typeLocation ? (
            <Text
              headline
              style={{
                fontWeight: 'normal',
                paddingTop: 20,
                color: 'red',
                textAlign: 'center',
              }}>
              Choose Location Type First
            </Text>
          ) : */}

          {spinner ? (
            <View>
              {/* <Spinner visible={this.state.spinner} /> */}
              <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                <PlaceholderLine width={100} noMargin style={{height: 40}} />
              </Placeholder>
            </View>
          ) : (
            <View style={{marginHorizontal: 10}}>
              {/* <Text headline style={{fontWeight: 'normal', paddingTop: 20}}>
                Choose Category
              </Text> */}
              <TextInput
                placeholder="Search Category"
                style={{
                  color: isDarkMode ? '#fff' : '#555',
                  fontSize: 14,
                  borderColor: '#000',
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
                // onChangeText={this.handleSearch}
                onChangeText={text => searchFilterFunction(text.toUpperCase())}
                autoCorrect={false}
              />

              {/* {dataCategory.map((data, index) => (
                // <ScrollView>
                <View key={index}>
                  <TouchableOpacity
                    style={styleItem}
                    onPress={() => handleClick(data, index)}>
                    <Text body1>{data.descs}</Text>
                    <Icon
                      name="angle-right"
                      size={18}
                      color={colors.primary}
                      style={{marginLeft: 5}}
                      enableRTL={true}
                    />
                  </TouchableOpacity>
                </View>
                // </ScrollView>
              ))} */}

              <FlatList
                data={dataCategory}
                keyExtractor={item => item.rowID}
                onEndReachedThreshold={0.01}
                onEndReached={info => {
                  loadMoreResults(info);
                }}
                renderItem={({item, index}) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styleItem}
                      onPress={() => handleClick(item, index)}>
                      <Text body1>{item.descs}</Text>
                      <Icon
                        name="angle-right"
                        size={18}
                        color={colors.primary}
                        style={{marginLeft: 5}}
                        enableRTL={true}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
