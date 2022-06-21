import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ScrollView,
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  Picker,
  Dimensions,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  PlaceholderLine,
  Placeholder,
  Button,
  SafeAreaView,
  ProductSpecGrid,
  Text,
  Header,
  Image,
  Icon,
  Tag,
  colors,
  ListOptionSelected,
  VenueSelectOption,
  // LoadingCount,
} from '@components';
// holiday - village;
import IconFontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import {enableExperimental} from '@utils';

import axios from 'axios';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import {useNavigation, useRoute} from '@react-navigation/core';
import {ListTransactionExpand} from '../../components';
import {TabView, SceneMap} from 'react-native-tab-view';
import ModalProduct from './ModalProduct';

import {ProgressBar} from 'react-native-paper';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';

import ListTransaction from '@components/List/Transaction';

function BookingFacility({route}) {
  // console.log('route in booking facility', route.params);
  const [data, setData] = useState([]);
  const [databookdate, setDatabookDate] = useState([]);
  const [params, setParams] = useState(route?.params);
  // console.log('params for venue code ?', params);
  const [timedate, setTimeDate] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [selectedValue, setSelectedValue] = useState('');
  const [IDTab, setIDTab] = useState('');
  const [tabsDate, setTabDate] = useState([]);
  const [days, setDays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible_2, setModalVisible_2] = useState(false);

  const [spinner, setSpinner] = useState(true);
  const [spinnerHour, setSpinnerHours] = useState(true);

  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);

  const [venueChoosed, setVenueChoosed] = useState({dataVenue});
  const [dataVenue, setDataVenue] = useState([]);
  const [titlenull, setTitle] = useState(false);
  const [dataBooked1, setDataBooked1] = useState([]);
  const [dataBooked2, setDataBooked2] = useState([]);
  const [dataBooked3, setDataBooked3] = useState([]);
  const [dataBooked4, setDataBooked4] = useState([]);
  const isExpandInit = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isExpandReason, setIsExpandReason] = useState(false);
  const [isIconUp, setIconUp] = useState(false);
  const [entity, setEntity] = useState('');
  const [project_no, setProjectNo] = useState('');
  const [loadingTab, setLoadingTab] = useState(true);

  useEffect(() => {
    axios
      .get('http://103.111.204.131/apiwebpbi/api/facility/book/time')
      .then(time => {
        console.log('time from server?', time.data);
        setTime(time.data);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  const datatime = {
    timeget: time.tanggal,
    daily: time.jam,
  };
  // console.log('timeee', datatime);

  const d = datatime.daily;
  // console.log('daily', d);

  const setBody = {
    entity_cd: '01',
    project_no: '01',
    facility_cd: 'CA',
    book_date: datatime.timeget,
  };

  useEffect(() => {
    axios
      .get(
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_id?entity_cd=01&project_no=01&facility_cd=CA&book_date=2021-12-07&id=1`,
      )
      .then(data => {
        console.log('timedate', data.data);
        setTimeDate(data[0]);

        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // fetchDataDays();
  }, []);

  const TABS = [
    {
      id: 1,
      title: data[0]?.book_date,
    },
    {
      id: 2,
      title: data[1]?.book_date,
    },
    {
      id: 3,
      title: data[2]?.book_date,
    },
    {
      id: 4,
      title: data[3]?.book_date,
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  const tab1 = data.filter(x => x.id == '1');
  const tab2 = data.filter(x => x.id == '2');
  const tab3 = data.filter(x => x.id == '3');
  const tab4 = data.filter(x => x.id == '4');

  useEffect(() => {
    const id = route?.params?.id;
    console.log('id akan di foreach', route?.params);
    if (id) {
      TABS.forEach(tab => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);
  const obj = [{...data}];

  // console.log('losdsa', obj);

  const ItemView = ({item}) => {
    return (
      <View
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
          borderRadius: 15,
          borderColor: '#dbdbdb',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text bold>{item.slot_hours}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 15,
          }}>
          <Text whiteColor subheadline bold>
            Booking
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //-----FOR GET ENTITY & PROJJECT
  const getTower = async () => {
    const data = {
      email: email,
      //   email: 'haniyya.ulfah@ifca.co.id',
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
        // `http://103.111.204.131/apisysadmin/api/getProject/${data.email}`,
        `http://103.111.204.131/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
        {
          config,
        },
      )
      .then(res => {
        const datas = res.data;

        const arrDataTower = datas.Data;
        // let dataArr = {};
        arrDataTower.map(dat => {
          if (dat) {
            console.log('data trower', dat.entity_cd);
            setdataTowerUser(dat);
            setEntity(dat.entity_cd);
            setProjectNo(dat.project_no);
            getDateBook(dat);
            getdata(dat);
            // const jsonValue = JSON.stringify(dat);
            //   setdataFormHelp(saveStorage);
            // console.log('storage', saveStorage);
            // dataArr.push(jsonValue);
          }
        });

        // AsyncStorage.setItem('@DataTower', dataArr);
        setArrDataTowerUser(arrDataTower);

        setSpinner(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get tower api', error);
        // alert('error get');
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      getTower(users);

      // setSpinner(false);
    }, 3000);
  }, []);

  // useEffect(() => {
  //   getDateBook(dataTowerUser); // datatoweruser adalah paramaeter buat entity projek
  // }, [dataTowerUser]);

  const getDateBook = async datas => {
    console.log('datas entioty,', datas);
    const entity_cd = datas.entity_cd;
    // console.log('next abis tower datebook', entity_cd);
    const project_no = datas.project_no;
    const obj_data = params;

    await axios
      .get(
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours?entity_cd=` +
          '01' +
          `&project_no=` +
          '01' +
          `&facility_cd=` +
          obj_data.facility_cd,
      )
      .then(res => {
        // console.log('data get date book', res.data[0]);
        // console.log('datas nih dipake buat entity projek', datas);
        setData(res.data);
        setDatabookDate(res.data);
        // getdata();
        getBooked(datas, res.data, '');
        setSpinner(false);
      })
      // .catch(error => console.error(error))
      .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  const getdata = async datas => {
    const entity_cd = datas.entity_cd;
    console.log('entity dari setentity', entity);
    const project_no = datas.project_no;
    const obj_data = params;
    //ini bentuknya array, hany ambil yang array 0 aja, krn kayaknya sama semua deh facility_cd nya
    // console.log('obj data', obj_data);
    const params_api =
      '?' +
      'entity_cd=' +
      entity_cd +
      '&' +
      'project_no=' +
      project_no +
      '&' +
      'facility_cd=' +
      obj_data.facility_cd;
    // 'SB';
    console.log(
      'params daata',
      'http://103.111.204.131/apiwebpbi/api/facility/book/venue' + params_api,
    );
    await axios
      .get(
        'http://103.111.204.131/apiwebpbi/api/facility/book/venue' + params_api,
      )
      .then(res => {
        console.log('ress facility book venue:', res.data);
        // setData(res.data);
        setDataVenue(res.data.data);
        // console.log('datavenue', res.data.data);
      })
      .catch(error => console.error(error.response.data));
  };

  const getBooked = async (datas, databookdates, venue_klik) => {
    console.log('option', venue_klik);
    const entity_cd = datas.entity_cd;
    console.log('next abis tower', datas);
    const project_no = datas.project_no;
    const obj_data = params;
    // const databookdates = databookdate;
    // console.log('data obj_data', obj_data);
    console.log('data book date atas', databookdates);

    if (venue_klik == undefined || venue_klik == null || venue_klik == '') {
      console.log('option if', venue_klik);
      const entity_cd = datas.entity_cd;
      console.log('next abis tower if', entity_cd);
      const project_no = datas.project_no;
      const obj_data = params;
      // const databookdates = databookdate;
      // console.log('data obj_data', obj_data);
      console.log('data book date if', databookdates);

      // alert('undefined');
      const params_api =
        '?' +
        'entity_cd=' +
        '01' +
        '&' +
        'project_no=' +
        '01' +
        '&' +
        'facility_cd=' +
        obj_data.facility_cd +
        '&' +
        'venue_cd=' +
        obj_data.venue[0].venue_cd;
      //  venue_klik;
      // 'SB';

      // console.log(
      //   'params booked',
      //   params_api + '&' + 'book_date=' + databookdates.book_date + '&id=1',
      // );
      console.log(
        'url params',
        'http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue' +
          params_api +
          '&' +
          'book_date=' +
          // '2021-12-15' +
          databookdates[0].book_date +
          '&id=1',
      );
      let endpoints = [
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[0].book_date +
          // '2021-12-15' +
          `&id=1`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[1].book_date +
          // '2021-12-15' +
          `&id=2`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[2].book_date +
          // '2021-12-15' +
          `&id=3`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[3].book_date + // '2021-12-15' + // data[3]?.book_date +
          `&id=4`,
      ];
      axios
        .all(endpoints.map(endpoint => axios.get(endpoint)))
        .then(
          axios.spread(
            (
              {data: dataBooked1},
              {data: dataBooked2},
              {data: dataBooked3},
              {data: dataBooked4},
            ) => {
              // console.log('res1: ', dataBooked1);
              // console.log('res2: ', dataBooked2);
              // console.log('res3: ', dataBooked3);
              // console.log('res4: ', dataBooked4);

              if (dataBooked1) {
                setDataBooked1(dataBooked1);
              }
              if (dataBooked2) {
                setDataBooked2(dataBooked2);
              }
              if (dataBooked3) {
                setDataBooked3(dataBooked3);
              }
              if (dataBooked4) {
                setDataBooked4(dataBooked4);
              }
            },
          ),
          setSpinnerHours(false),
        )
        .catch(error => console.error(error.response.data))
        .finally(
          () => setLoading(false),
          // setSpinnerHours(false),
          // setSpinner(false),
        );
    } else {
      console.log('option else', venue_klik);
      const entity_cd = datas.entity_cd;
      console.log('next abis tower else', entity_cd);
      const project_no = datas.project_no;
      const obj_data = params;
      // const databookdates = databookdate;
      // console.log('data obj_data', obj_data);
      console.log('data book date else', databookdates);

      const params_api =
        '?' +
        'entity_cd=' +
        entity_cd +
        '&' +
        'project_no=' +
        project_no +
        '&' +
        'facility_cd=' +
        obj_data.facility_cd +
        '&' +
        'venue_cd=' +
        // obj_data.venue[0].venue_cd;
        venue_klik;
      // 'SB';

      // console.log('params booked', params_api);
      // console.log(
      //   'url params',
      //   'http://34.87.121.155:2121/apiwebpbi/api/facility/book/hours_venue' +
      //     params_api +
      //     '&' +
      //     'book_date=' +
      //     data[0].book_date +
      //     '&id=1',
      // );
      let endpoints = [
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[0].book_date +
          // '2021-12-15' +
          `&id=1`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[1].book_date +
          // '2021-12-15' +
          `&id=2`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[2].book_date +
          // '2021-12-15' +
          `&id=3`,
        `http://103.111.204.131/apiwebpbi/api/facility/book/hours_venue` +
          params_api +
          '&' +
          'book_date=' +
          databookdates[3].book_date + // '2021-12-15' + // data[3]?.book_date +
          `&id=4`,
      ];
      axios
        .all(endpoints.map(endpoint => axios.get(endpoint)))
        .then(
          axios.spread(
            (
              {data: dataBooked1},
              {data: dataBooked2},
              {data: dataBooked3},
              {data: dataBooked4},
            ) => {
              // console.log('res1 created if: ', dataBooked1);
              // console.log('res2 created: ', dataBooked2);
              // console.log('res3 created: ', dataBooked3);
              // console.log('res4 created: ', dataBooked4);

              if (dataBooked1) {
                setDataBooked1(dataBooked1);
              }
              if (dataBooked2) {
                setDataBooked2(dataBooked2);
              }
              if (dataBooked3) {
                setDataBooked3(dataBooked3);
              }
              if (dataBooked4) {
                setDataBooked4(dataBooked4);
              }
            },
          ),
          setSpinnerHours(false),
        )
        .catch(error => console.error(error.response.data))
        .finally(
          () => setLoading(false),
          // setSpinnerHours(false),
          // setSpinner(false),
        );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinnerHours(false);
    }, 5000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // setSpinnerHours(false);
      setLoadingTab(false);
    }, 8000);
  }, []);

  const onChangeOption = option => {
    console.log('option klik', option.venue_cd);
    const venue_klik = option.venue_cd;
    setVenueChoosed(option);
    setTitle(true);
    getBooked(dataTowerUser, databookdate, venue_klik);
    setTimeout(() => {
      setModalVisible_2(false);
    }, 200);
  };

  const onBookingPress = (items, jam_booking) => {
    console.log('items for booking detail', items);
    console.log('jam booking', jam_booking);
    const item = {
      items: items,
      jam_booking: jam_booking,
    };
    console.log('items all', item);
    // setModalVisible(true);
    navigation.navigate('BookingDetail', item);
  };

  const setExpandIcon = indexs => {
    console.log('indexs', indexs);
    setIsExpand(!isExpand);
    setIconUp(indexs ? !isIconUp : isIconUp);
  };

  const setExpandIconReason = indexs => {
    console.log('indexs', indexs);
    setIsExpandReason(!isExpandReason);
    setIconUp(indexs ? !isIconUp : isIconUp);
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Choose Schedule')}
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
      <ScrollView contentContainerStyle={styles.paddingSrollView}>
        {/* <View
          style={{
            backgroundColor: colors.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 15,
            padding: 10,
          }}>
          <Text headline whiteColor>
            Tennis
          </Text>
          <Text>{datatime.timeget}</Text>
        </View> */}
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <Text subheadline bold>
            Choose Venue
          </Text>
          <ListOptionSelected
            style={{marginTop: 10}}
            textLeft={
              titlenull == false
                ? params.venue[0].venue_name
                : venueChoosed?.venue_name
            }
            // textRight={venueChoosed?.venue_name}
            onPress={() => setModalVisible_2(true)}
          />

          <VenueSelectOption
            isVisible={modalVisible_2}
            options={dataVenue}
            onChange={onChangeOption}
            venueChoosed={venueChoosed}
            onSwipeComplete={() => setModalVisible_2(false)}
          />
        </View>

        <View style={{marginTop: 30, paddingHorizontal: 10}}>
          <Text subheadline bold>
            Today
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            borderRadius: 15,
            borderColor: colors.dark,
            borderBottomWidth: 1,
            padding: 10,
            marginBottom: 15,
            marginTop: 10,
          }}>
          {/* <Text headline whiteColor>
            Tennis
          </Text> */}
          <Text>{datatime.timeget}</Text>
          {/* <Text>{datatime.daily}</Text> */}

          <Icon
            name="calendar-week"
            size={20}
            color={colors.primary}
            enableRTL={true}
          />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{marginVertical: 20}}>
            {/* <Text title2>Ticket</Text>
          <Text headline style={{fontWeight: 'normal'}}>
            Book Screen
          </Text> */}
            {loadingTab ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
                <ProgressBar
                  progress={1}
                  color={colors.primary}
                  indeterminate={true}
                />
                {/* <Text>loading tab nih</Text> */}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                  flex: 1,
                  width: '100%',
                }}>
                {TABS.map((item, index) => (
                  <View key={index} style={{flex: 1, paddingHorizontal: 5}}>
                    <Tag
                      outline
                      style={{
                        height: 60,
                        width: 60,
                        marginBottom: 20,

                        flexDirection: 'column',
                        backgroundColor:
                          tab.id == item.id
                            ? colors.primary
                            : colors.background,
                      }}
                      onPress={() => {
                        enableExperimental();
                        setTab(item);
                      }}>
                      <View
                        style={{
                          flexGrow: 1,
                          flexDirection: 'row',
                        }}>
                        <Text
                          bold
                          body1={tab.id != item.id}
                          light={tab.id != item.id}
                          whiteColor={tab.id == item.id}
                          style={{textAlign: 'center', fontSize: 14}}>
                          {moment(item.title)
                            .format('ddd DD')
                            .replace(' ', '\n')}
                        </Text>
                      </View>
                    </Tag>
                  </View>
                ))}
              </View>
            )}

            {/* ---coba ya. khusus tab 1 pake nya loadingtab, supaya sama kayak tab tanggal munculnya */}
            {loadingTab ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
                {/* <Text>loading content tab 1</Text> */}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 5,
                }}>
                {tab.id == 1 && (
                  <Text style={{fontStyle: 'italic'}}>
                    Open Booking : {dataBooked1.open_book} -{' '}
                    {dataBooked1.close_book}
                  </Text>
                )}
                {tab.id == 1 && dataBooked1.close_status == 'Y'
                  ? dataBooked1?.slot_hours.map &&
                    dataBooked1?.slot_hours.map((items, indexs) => (
                      <View
                        key={indexs}
                        style={StyleSheet.flatten([
                          {
                            paddingVertical: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'space-between',
                            borderRadius: 15,
                            // borderColor: '#dbdbdb',
                            borderBottomColor: colors.text,
                            borderBottomWidth: 1,
                          },
                          !isExpand && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                          !isExpandReason && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                        ])}>
                        <Text key={items.id} bold>
                          {items.jam}
                        </Text>
                        {/* <Text>{items.status_avail}</Text> */}
                        {/* <Text key={items.id} bold>
                        {time.jam > items.jam
                          ? 'lebih dari jam'
                          : 'kurang dari jam'}
                      </Text> */}

                        <View>
                          {items.databook != ''
                            ? items.databook.map((itemdatabook, keys) => (
                                <View key={keys}>
                                  <Text
                                    bold
                                    style={{
                                      width: 250,
                                    }}>
                                    {itemdatabook.name}
                                  </Text>
                                  <Text bold>{itemdatabook.unit}</Text>
                                  {/* <Text>
                                    Created date :{' '}
                                    {moment(
                                      itemdatabook.reservation_date,
                                    ).format('DD MMM YYYY hh:mm:ss')}
                                  </Text> */}
                                  {/* minta tambahin kolom venue_name   */}
                                </View>
                              ))
                            : null}

                          {isExpand && (
                            <View>
                              {items.databook != ''
                                ? items.databook.map((itemdatabook, keys) => (
                                    <View key={keys} style={{width: '100%'}}>
                                      <Text>
                                        Created date :{' '}
                                        {moment(
                                          itemdatabook.reservation_date,
                                        ).format('DD MMM YYYY hh:mm:ss')}
                                      </Text>
                                      <Text>
                                        Duration : {itemdatabook.duration}{' '}
                                        {itemdatabook.duration > 1
                                          ? 'Hour'
                                          : 'Hours'}
                                      </Text>
                                      {/* minta tambahin kolom venue_name   */}
                                    </View>
                                  ))
                                : null}
                              {items.datapartner != ''
                                ? items.datapartner.map(
                                    (itemdatapartner, keys) => (
                                      console.log(
                                        'itemdata partner untuk status',
                                        itemdatapartner,
                                      ),
                                      (
                                        <View key={keys}>
                                          {console.log(
                                            'itemdata partner',
                                            itemdatapartner,
                                          )}
                                          <Text>
                                            Partner :{' '}
                                            {itemdatapartner.staff_first_name}{' '}
                                            {itemdatapartner.staff_last_name}
                                          </Text>

                                          <Text>
                                            Status :{' '}
                                            {itemdatapartner.staff_unconfirmed}
                                            {itemdatapartner.confirm_status ==
                                            'W'
                                              ? 'Waiting Confirm'
                                              : itemdatapartner.confirm_status ==
                                                'U'
                                              ? 'Unconfirm'
                                              : 'Confirm'}
                                          </Text>
                                          {/* <Text style={{width: 150}}>
                                          as a {itemdatapartner.position}
                                        </Text> */}
                                        </View>
                                      )
                                    ),
                                  )
                                : null}
                            </View>
                          )}

                          {items.status_avail == 'N' && items.reason != '' ? (
                            <View>
                              <Text
                                bold
                                style={{
                                  width: 250,
                                }}>
                                {items.reason}
                              </Text>
                            </View>
                          ) : null}

                          {isExpandReason &&
                            (items.reason != '' ? (
                              <Text key={indexs}>
                                {items.reason} {indexs}
                              </Text>
                            ) : null)}
                        </View>

                        {(items.status_avail == 'Y' && time.jam < items.jam) ||
                        dataBooked1.open_book > items.jam ||
                        dataBooked1.close_book < items.jam ? (
                          <TouchableOpacity
                            disabled={
                              items.status_avail != 'Y' || time.jam > items.jam
                                ? true
                                : false || dataBooked1.open_book > items.jam
                                ? true
                                : false || dataBooked1.close_book < items.jam
                                ? true
                                : false
                            }
                            onPress={() =>
                              onBookingPress(dataBooked1, items.jam)
                            }
                            style={StyleSheet.flatten([
                              {
                                height: 50,
                                backgroundColor:
                                  items.status_avail == 'Y' &&
                                  time.jam < items.jam
                                    ? colors.primary
                                    : items.databook[0].status == 'O'
                                    ? BaseColor.orangeColor
                                    : BaseColor.redColor,
                                padding: 15,
                                borderRadius: 15,
                                justifyContent: 'center',
                              },
                              isExpand && {
                                height: 50,
                                backgroundColor:
                                  items.status_avail == 'Y' &&
                                  time.jam < items.jam
                                    ? colors.primary
                                    : items.databook[0].status == 'O'
                                    ? BaseColor.orangeColor
                                    : BaseColor.redColor,
                                padding: 15,
                                borderRadius: 15,
                                justifyContent: 'center',
                              },
                            ])}>
                            <Text whiteColor subheadline bold>
                              Booking
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{marginRight: 5}}
                            // onPress={() => setExpandIcon(indexs)}
                            onPress={indexs =>
                              items.reason != ''
                                ? setExpandIconReason(indexs)
                                : setExpandIcon(indexs)
                            }>
                            {/* {console.log('boolean apasi ini', indexs)} */}
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 10,
                                backgroundColor: colors.primary,
                                alignSelf: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name={
                                  'chevron-down'
                                  // isIconUp ? 'chevron-up' : 'chevron-down'
                                }
                                color={'#fff'}></Icon>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : tab.id == 1 &&
                    dataBooked1.close_status == 'N' && (
                      <View
                        style={{
                          flex: 1,
                          marginTop: '50%',
                        }}>
                        <IconFontisto
                          name="holiday-village"
                          size={40}
                          color={colors.primary}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}></IconFontisto>
                        <Text
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Sorry! The Facility is closed.
                        </Text>
                      </View>
                    )}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
              </View>
            ) : (
              <View style={{flex: 1, paddingHorizontal: 5}}>
                {tab.id == 2 && (
                  <Text style={{fontStyle: 'italic'}}>
                    Open Booking : {dataBooked2.open_book} -{' '}
                    {dataBooked2.close_book}
                  </Text>
                )}
                {tab.id == 2 && dataBooked2.close_status == 'Y'
                  ? dataBooked2.slot_hours.map &&
                    dataBooked2.slot_hours.map((items, indexs) => (
                      <View
                        key={indexs}
                        style={StyleSheet.flatten([
                          {
                            paddingVertical: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'space-between',
                            borderRadius: 15,
                            // borderColor: '#dbdbdb',
                            borderBottomColor: colors.text,
                            borderBottomWidth: 1,
                          },
                          !isExpand && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                          !isExpandReason && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                        ])}>
                        <Text key={items.id} bold>
                          {items.jam}
                        </Text>

                        <View>
                          {items.databook != ''
                            ? items.databook.map((itemdatabook, keys) => (
                                <View key={keys}>
                                  <Text
                                    bold
                                    style={{
                                      width: 250,
                                    }}>
                                    {itemdatabook.name}
                                  </Text>
                                  <Text bold>{itemdatabook.unit}</Text>
                                  {/* <Text>
                                    Created date :{' '}
                                    {moment(
                                      itemdatabook.reservation_date,
                                    ).format('DD MMM YYYY hh:mm:ss')}
                                  </Text> */}
                                  {/* minta tambahin kolom venue_name   */}
                                </View>
                              ))
                            : null}

                          {isExpand && (
                            <View>
                              {items.databook != ''
                                ? items.databook.map((itemdatabook, keys) => (
                                    <View key={keys} style={{width: '100%'}}>
                                      <Text>
                                        Created date :{' '}
                                        {moment(
                                          itemdatabook.reservation_date,
                                        ).format('DD MMM YYYY hh:mm:ss')}
                                      </Text>
                                      <Text>
                                        Duration : {itemdatabook.duration}{' '}
                                        {itemdatabook.duration > 1
                                          ? 'Hour'
                                          : 'Hours'}
                                      </Text>
                                      {/* minta tambahin kolom venue_name   */}
                                    </View>
                                  ))
                                : null}
                              {items.datapartner != ''
                                ? items.datapartner.map(
                                    (itemdatapartner, keys) => (
                                      <View key={keys}>
                                        {console.log(
                                          'itemdata partner',
                                          itemdatapartner,
                                        )}
                                        <Text>
                                          Partner :{' '}
                                          {itemdatapartner.staff_first_name}{' '}
                                          {itemdatapartner.staff_last_name}
                                        </Text>

                                        <Text>
                                          Status :{' '}
                                          {itemdatapartner.staff_unconfirmed}
                                          {itemdatapartner.confirm_status == 'W'
                                            ? 'Waiting Confirm'
                                            : itemdatapartner.confirm_status ==
                                              'U'
                                            ? 'Unconfirm'
                                            : 'Confirm'}
                                        </Text>
                                        {/* <Text style={{width: 150}}>
                                          as a {itemdatapartner.position}
                                        </Text> */}
                                      </View>
                                    ),
                                  )
                                : null}
                            </View>
                          )}

                          {items.status_avail == 'N' && items.reason != '' ? (
                            <View>
                              <Text
                                bold
                                style={{
                                  width: 250,
                                }}>
                                {items.reason}
                              </Text>
                            </View>
                          ) : null}

                          {isExpandReason &&
                            (items.reason != '' ? (
                              <Text key={indexs}>
                                {items.reason} {indexs}
                              </Text>
                            ) : null)}
                        </View>

                        {items.status_avail == 'Y' ||
                        dataBooked2.open_book > items.jam ||
                        dataBooked2.close_book < items.jam ? (
                          <TouchableOpacity
                            disabled={
                              items.status_avail != 'Y'
                                ? true
                                : false || dataBooked2.open_book > items.jam
                                ? true
                                : false || dataBooked2.close_book < items.jam
                                ? true
                                : false
                            }
                            onPress={() =>
                              onBookingPress(dataBooked2, items.jam)
                            }
                            style={{
                              backgroundColor:
                                items.status_avail == 'Y'
                                  ? colors.primary
                                  : items.databook[0].status == 'O'
                                  ? BaseColor.orangeColor
                                  : BaseColor.redColor,
                              padding: 15,
                              borderRadius: 15,
                              justifyContent: 'center',
                            }}>
                            <Text whiteColor subheadline bold>
                              Booking
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{marginRight: 5}}
                            // onPress={() => setExpandIcon(indexs)}
                            onPress={indexs =>
                              items.reason != ''
                                ? setExpandIconReason(indexs)
                                : setExpandIcon(indexs)
                            }>
                            {/* {console.log('boolean apasi ini', indexs)} */}
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 10,
                                backgroundColor: colors.primary,
                                alignSelf: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name={
                                  'chevron-down'
                                  // isIconUp ? 'chevron-up' : 'chevron-down'
                                }
                                color={'#fff'}></Icon>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : tab.id == 2 &&
                    dataBooked2.close_status == 'N' && (
                      <View
                        style={{
                          flex: 1,
                          marginTop: '50%',
                        }}>
                        <IconFontisto
                          name="holiday-village"
                          size={40}
                          color={colors.primary}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}></IconFontisto>
                        <Text
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Sorry! The Facility is closed.
                        </Text>
                      </View>
                    )}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
              </View>
            ) : (
              <View style={{flex: 1, paddingHorizontal: 5}}>
                {tab.id == 3 && (
                  <Text style={{fontStyle: 'italic'}}>
                    Open Booking : {dataBooked3.open_book} -{' '}
                    {dataBooked3.close_book}
                  </Text>
                )}
                {tab.id == 3 && dataBooked3.close_status == 'Y'
                  ? dataBooked3.slot_hours.map &&
                    dataBooked3.slot_hours.map((items, indexs) => (
                      <View
                        key={indexs}
                        style={StyleSheet.flatten([
                          {
                            paddingVertical: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'space-between',
                            borderRadius: 15,
                            // borderColor: '#dbdbdb',
                            borderBottomColor: colors.text,
                            borderBottomWidth: 1,
                          },
                          !isExpand && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                          !isExpandReason && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                        ])}>
                        <Text key={items.id} bold>
                          {items.jam}
                        </Text>

                        <View>
                          {items.databook != ''
                            ? items.databook.map((itemdatabook, keys) => (
                                <View key={keys}>
                                  <Text
                                    bold
                                    style={{
                                      width: 250,
                                    }}>
                                    {itemdatabook.name}
                                  </Text>
                                  <Text bold>{itemdatabook.unit}</Text>
                                  {/* <Text>
                                    Created date :{' '}
                                    {moment(
                                      itemdatabook.reservation_date,
                                    ).format('DD MMM YYYY hh:mm:ss')}
                                  </Text> */}
                                  {/* minta tambahin kolom venue_name   */}
                                </View>
                              ))
                            : null}

                          {isExpand && (
                            <View>
                              {items.databook != ''
                                ? items.databook.map((itemdatabook, keys) => (
                                    <View key={keys} style={{width: '100%'}}>
                                      <Text>
                                        Created date :{' '}
                                        {moment(
                                          itemdatabook.reservation_date,
                                        ).format('DD MMM YYYY hh:mm:ss')}
                                      </Text>
                                      <Text>
                                        Duration : {itemdatabook.duration}{' '}
                                        {itemdatabook.duration > 1
                                          ? 'Hour'
                                          : 'Hours'}
                                      </Text>
                                      {/* minta tambahin kolom venue_name   */}
                                    </View>
                                  ))
                                : null}
                              {items.datapartner != ''
                                ? items.datapartner.map(
                                    (itemdatapartner, keys) => (
                                      <View key={keys}>
                                        {console.log(
                                          'itemdata partner',
                                          itemdatapartner,
                                        )}
                                        <Text>
                                          Partner :{' '}
                                          {itemdatapartner.staff_first_name}{' '}
                                          {itemdatapartner.staff_last_name}
                                        </Text>

                                        <Text>
                                          Status :{' '}
                                          {itemdatapartner.staff_unconfirmed}
                                          {itemdatapartner.confirm_status == 'W'
                                            ? 'Waiting Confirm'
                                            : itemdatapartner.confirm_status ==
                                              'U'
                                            ? 'Unconfirm'
                                            : 'Confirm'}
                                        </Text>
                                        {/* <Text style={{width: 150}}>
                                          as a {itemdatapartner.position}
                                        </Text> */}
                                      </View>
                                    ),
                                  )
                                : null}
                            </View>
                          )}

                          {items.status_avail == 'N' && items.reason != '' ? (
                            <View>
                              <Text
                                bold
                                style={{
                                  width: 250,
                                }}>
                                {items.reason}
                              </Text>
                            </View>
                          ) : null}

                          {isExpandReason &&
                            (items.reason != '' ? (
                              <Text key={indexs}>
                                {items.reason} {indexs}
                              </Text>
                            ) : null)}
                        </View>

                        {items.status_avail == 'Y' ||
                        dataBooked3.open_book > items.jam ||
                        dataBooked3.close_book < items.jam ? (
                          <TouchableOpacity
                            disabled={
                              items.status_avail != 'Y'
                                ? true
                                : false || dataBooked3.open_book > items.jam
                                ? true
                                : false || dataBooked3.close_book < items.jam
                                ? true
                                : false
                            }
                            onPress={() =>
                              onBookingPress(dataBooked3, items.jam)
                            }
                            style={{
                              backgroundColor:
                                items.status_avail == 'Y'
                                  ? colors.primary
                                  : items.databook[0].status == 'O'
                                  ? BaseColor.orangeColor
                                  : BaseColor.redColor,
                              padding: 15,
                              borderRadius: 15,
                              justifyContent: 'center',
                            }}>
                            <Text whiteColor subheadline bold>
                              Booking
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{marginRight: 5}}
                            // onPress={() => setExpandIcon(indexs)}
                            onPress={indexs =>
                              items.reason != ''
                                ? setExpandIconReason(indexs)
                                : setExpandIcon(indexs)
                            }>
                            {/* {console.log('boolean apasi ini', indexs)} */}
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 10,
                                backgroundColor: colors.primary,
                                alignSelf: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name={
                                  'chevron-down'
                                  // isIconUp ? 'chevron-up' : 'chevron-down'
                                }
                                color={'#fff'}></Icon>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : tab.id == 3 &&
                    dataBooked3.close_status == 'N' && (
                      <View
                        style={{
                          flex: 1,
                          marginTop: '50%',
                        }}>
                        <IconFontisto
                          name="holiday-village"
                          size={40}
                          color={colors.primary}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}></IconFontisto>
                        <Text
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Sorry! The Facility is closed.
                        </Text>
                      </View>
                    )}
              </View>
            )}

            {spinnerHour ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                {/* <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder> */}
              </View>
            ) : (
              <View style={{flex: 1, paddingHorizontal: 5}}>
                {tab.id == 4 && (
                  <Text style={{fontStyle: 'italic'}}>
                    Open Booking : {dataBooked4.open_book} -{' '}
                    {dataBooked4.close_book}
                  </Text>
                )}
                {tab.id == 4 && dataBooked4.close_status == 'Y'
                  ? dataBooked4.slot_hours.map &&
                    dataBooked4.slot_hours.map((items, indexs) => (
                      <View
                        key={indexs}
                        style={StyleSheet.flatten([
                          {
                            paddingVertical: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'space-between',
                            borderRadius: 15,
                            // borderColor: '#dbdbdb',
                            borderBottomColor: colors.text,
                            borderBottomWidth: 1,
                          },
                          !isExpand && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                          !isExpandReason && {
                            borderBottomWidth: 1,

                            borderBottomColor: colors.text,
                            // borderColor: '#dbdbdb',
                          },
                        ])}>
                        <Text key={items.id} bold>
                          {items.jam}
                        </Text>

                        <View>
                          {items.databook != ''
                            ? items.databook.map((itemdatabook, keys) => (
                                <View key={keys}>
                                  <Text
                                    bold
                                    style={{
                                      width: 250,
                                    }}>
                                    {itemdatabook.name}
                                  </Text>
                                  <Text bold>{itemdatabook.unit}</Text>
                                  {/* <Text>
                                    Created date :{' '}
                                    {moment(
                                      itemdatabook.reservation_date,
                                    ).format('DD MMM YYYY hh:mm:ss')}
                                  </Text> */}
                                  {/* minta tambahin kolom venue_name   */}
                                </View>
                              ))
                            : null}

                          {isExpand && (
                            <View>
                              {items.databook != ''
                                ? items.databook.map((itemdatabook, keys) => (
                                    <View key={keys} style={{width: '100%'}}>
                                      <Text>
                                        Created date :{' '}
                                        {moment(
                                          itemdatabook.reservation_date,
                                        ).format('DD MMM YYYY hh:mm:ss')}
                                      </Text>
                                      <Text>
                                        Duration : {itemdatabook.duration}{' '}
                                        {itemdatabook.duration > 1
                                          ? 'Hour'
                                          : 'Hours'}
                                      </Text>
                                      {/* minta tambahin kolom venue_name   */}
                                    </View>
                                  ))
                                : null}
                              {items.datapartner != ''
                                ? items.datapartner.map(
                                    (itemdatapartner, keys) => (
                                      <View key={keys}>
                                        {console.log(
                                          'itemdata partner',
                                          itemdatapartner,
                                        )}
                                        <Text>
                                          Partner :{' '}
                                          {itemdatapartner.staff_first_name}{' '}
                                          {itemdatapartner.staff_last_name}
                                        </Text>

                                        <Text>
                                          Status :{' '}
                                          {itemdatapartner.staff_unconfirmed}
                                          {itemdatapartner.confirm_status == 'W'
                                            ? 'Waiting Confirm'
                                            : itemdatapartner.confirm_status ==
                                              'U'
                                            ? 'Unconfirm'
                                            : 'Confirm'}
                                        </Text>
                                        {/* <Text style={{width: 150}}>
                                          as a {itemdatapartner.position}
                                        </Text> */}
                                      </View>
                                    ),
                                  )
                                : null}
                            </View>
                          )}

                          {items.status_avail == 'N' && items.reason != '' ? (
                            <View>
                              <Text
                                bold
                                style={{
                                  width: 250,
                                }}>
                                {items.reason}
                              </Text>
                            </View>
                          ) : null}

                          {isExpandReason &&
                            (items.reason != '' ? (
                              <Text key={indexs}>
                                {items.reason} {indexs}
                              </Text>
                            ) : null)}
                        </View>

                        {items.status_avail == 'Y' ||
                        dataBooked4.open_book > items.jam ||
                        dataBooked4.close_book < items.jam ? (
                          <TouchableOpacity
                            disabled={
                              items.status_avail != 'Y'
                                ? true
                                : false || dataBooked4.open_book > items.jam
                                ? true
                                : false || dataBooked4.close_book < items.jam
                                ? true
                                : false
                            }
                            onPress={() =>
                              onBookingPress(dataBooked4, items.jam)
                            }
                            style={{
                              backgroundColor:
                                items.status_avail == 'Y'
                                  ? colors.primary
                                  : items.databook[0].status == 'O'
                                  ? BaseColor.orangeColor
                                  : BaseColor.redColor,
                              padding: 15,
                              borderRadius: 15,
                              justifyContent: 'center',
                            }}>
                            <Text whiteColor subheadline bold>
                              Booking
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{marginRight: 5}}
                            // onPress={() => setExpandIcon(indexs)}
                            onPress={indexs =>
                              items.reason != ''
                                ? setExpandIconReason(indexs)
                                : setExpandIcon(indexs)
                            }>
                            {/* {console.log('boolean apasi ini', indexs)} */}
                            <View
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: 10,
                                backgroundColor: colors.primary,
                                alignSelf: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                              }}>
                              <Icon
                                name={
                                  'chevron-down'
                                  // isIconUp ? 'chevron-up' : 'chevron-down'
                                }
                                color={'#fff'}></Icon>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))
                  : tab.id == 4 &&
                    dataBooked4.close_status == 'N' && (
                      <View
                        style={{
                          flex: 1,
                          marginTop: '50%',
                        }}>
                        <IconFontisto
                          name="holiday-village"
                          size={40}
                          color={colors.primary}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                          }}></IconFontisto>
                        <Text
                          style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            fontSize: 16,
                            marginTop: 10,
                          }}>
                          Sorry! The Facility is closed.
                        </Text>
                      </View>
                    )}
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
      {/* <ModalProduct
        // colorChoosedInit={colorChoosed}
        // sizeChoosedInit={sizeChoosed}
        // item={productData}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          navigation.navigate('BookingDetail');
        }}
      /> */}
    </SafeAreaView>
  );
}

export default BookingFacility;
