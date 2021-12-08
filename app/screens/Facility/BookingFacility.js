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
} from '@components';
import moment from 'moment';
import {enableExperimental} from '@utils';

import axios from 'axios';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import {useNavigation, useRoute} from '@react-navigation/core';
import {ListTransactionExpand} from '../../components';
import {TabView, SceneMap} from 'react-native-tab-view';
import ModalProduct from './ModalProduct';

function BookingFacility({route}) {
  const [data, setData] = useState([]);
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

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    axios
      .get('http://34.87.121.155:2121/apiwebpbi/api/facility/book/time')
      .then(time => {
        console.log('time', time.data);
        setTime(time.data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const datatime = {
    timeget: time.tanggal,
    daily: time.jam,
  };
  console.log('timeee', datatime);

  const d = datatime.daily;
  console.log('daily', d);

  const setBody = {
    entity_cd: '01',
    project_no: '01',
    facility_cd: 'CA',
    book_date: datatime.timeget,
  };

  useEffect(() => {
    axios
      .get(
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/hours?entity_cd=01&project_no=01&facility_cd=CA`,
      )
      .then(res => {
        console.log('data', res.data[0]);
        setData(res.data);
        setSpinner(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/hours_id?entity_cd=01&project_no=01&facility_cd=CA&book_date=2021-12-07&id=1`,
      )
      .then(data => {
        console.log('timedate', data.data);
        setTimeDate(data[0]);

        setSpinner(false);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const fetchDataDays = async () => {
    try {
      const res = await axios.get(
        'http://34.87.121.155:2121/apiwebpbi/api/facility/book/hours_id?entity_cd=01&project_no=01&facility_cd=CA&book_date=2021-12-08&id=2',
      );
      setDays(res.data);
      console.log('dayss', res.data);
    } catch (error) {
      setErrors(error.ressponse.data);
      alert(hasError.toString());
    }
  };

  useEffect(() => {
    fetchDataDays();
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
    if (id) {
      TABS.forEach(tab => {
        tab.id == id && setTab(tab);
      });
    }
  }, [route?.params?.id]);
  const obj = [{...data}];

  console.log('losdsa', obj);

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
        <View
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
          {/* <Text>{datatime.timeget}</Text> */}
        </View>
        <View style={{marginVertical: 32}}>
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
            {spinner ? (
              <View>
                {/* <Spinner visible={this.state.spinner} /> */}
                <Placeholder style={{marginVertical: 4, paddingHorizontal: 10}}>
                  <PlaceholderLine width={100} noMargin style={{height: 40}} />
                </Placeholder>
              </View>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          style={{textAlign: 'center'}}>
                          {moment(item.title)
                            .format('DD MMM')
                            .replace(' ', '\n')}
                        </Text>
                      </View>
                    </Tag>
                  </View>
                ))}
              </View>
            )}
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {tab.id == 1 &&
                tab1.map(y =>
                  y.slot_hours.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        borderRadius: 15,
                        borderColor: '#dbdbdb',
                        borderBottomWidth: 1,
                      }}>
                      <Text key={item.id} bold>
                        {item}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
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
                  )),
                )}
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {tab.id == 2 &&
                tab2.map(y =>
                  y.slot_hours.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        borderRadius: 15,
                        borderColor: '#dbdbdb',
                        borderBottomWidth: 1,
                      }}>
                      <Text key={item.id} bold>
                        {item}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
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
                  )),
                )}
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {tab.id == 3 &&
                tab3.map(y =>
                  y.slot_hours.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        borderRadius: 15,
                        borderColor: '#dbdbdb',
                        borderBottomWidth: 1,
                      }}>
                      <Text key={item.id} bold>
                        {item}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
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
                  )),
                )}
            </View>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {tab.id == 4 &&
                tab4.map(y =>
                  y.slot_hours.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'space-between',
                        borderRadius: 15,
                        borderColor: '#dbdbdb',
                        borderBottomWidth: 1,
                      }}>
                      <Text key={item.id} bold>
                        {item}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setModalVisible(true)}
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
                  )),
                )}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      <ModalProduct
        // colorChoosedInit={colorChoosed}
        // sizeChoosedInit={sizeChoosed}
        // item={productData}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          navigation.navigate('BookingDetail');
        }}
      />
    </SafeAreaView>
  );
}

export default BookingFacility;
