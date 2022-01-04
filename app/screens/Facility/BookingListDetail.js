import {Image, SafeAreaView, Header, Button} from '@components';
import Icon from '@components/Icon';
// import LabelUpper2Row from '@components/Label/Upper2Row';
import {BaseColor, Images, useTheme, BaseStyle} from '@config';
// import {FLinks} from '@data';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  // CheckBox,
  // Button,
  // Modal,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
// // import { Checkbox } from '@react-native-community/checkbox';
// import CheckBox from '@react-native-community/checkbox';
// import {Button, ProfileGroup} from '../../components';
import axios from 'axios';
// import {EFilterColors, EFilterSizes, FRecentTransactions} from '@data';
// import ModalProduct from './ModalProduct';

// // or any pure javascript modules available in npm
import {Card} from 'react-native-paper';
import styles from './styles';
// import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';

import * as Utils from '@utils';
import moment from 'moment';

import CheckBox from '@react-native-community/checkbox';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default BookingListDetail = props => {
  const {navigation, route} = props;
  // const {params} = props;
  //   console.log('routes from booking list', route.params);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);

  const [onDetailBooking, setDetailBooking] = useState([]);
  const [partners, setPartnerBooking] = useState([]);

  const reservation_no = route.params.reservation_no;

  const [refreshing, setRefreshing] = useState(false);
  //   const deviceWidth = Dimensions.get('window').width;

  const getDetailList = async () => {
    const reservation_no = route.params.reservation_no;
    console.log(
      'url datalist detail',
      `http://34.87.121.155:2121/apiwebpbi/api/facility/book/id/` +
        reservation_no,
    );
    try {
      const res = await axios.get(
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/id/` +
          reservation_no,
      );
      if (res) {
        // console.log('res post', res.data.Data);
        setDetailBooking(res.data.Data);
        setSpinner(false);
      }
      return res;
    } catch (err) {
      console.log('error disini ya', err.response);
    }
  };

  const getPartnerBooking = async () => {
    const reservation_no = route.params.reservation_no;
    await axios
      .get(
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/edit/getstaffs/` +
          reservation_no,
      )
      .then(data => {
        console.log('data on partner booking', data.data.Data);
        setPartnerBooking(data.data.Data);
        setSpinner(false);
      })
      .catch(error => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getDetailList();
  }, []);

  useEffect(() => {
    getPartnerBooking();
  }, []);

  const renderFilterPartner = renderData => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => onFilter('Coach')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Coach</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFilter('Hitting Partner')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Hitting Partner</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFilter('Ball Boy')}>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Text>Ballboy</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onFilter = statusPartner => {
    console.log('sebagai', statusPartner);

    const newArray = partners.filter(function (item) {
      // console.log('item filter be', item);
      // console.log('item filter', item.position);
      console.log('item hittinh partner', item.hittingpartner);
      let itemFilter = {};
      if (item.coach == '1') {
        itemFilter = 'Coach';
        // console.log('item filter ya', itemFilter);
      } else if (item.hittingpartner == '1') {
        itemFilter = 'hitting';
        // console.log('item filter ya', itemFilter);
      }

      console.log('item filter ya', itemFilter);
      return itemFilter === statusPartner;
    });
    console.log('new array', newArray);
  };

  const handleChangePartner = rowID => {
    let temp = partners.map(partners => {
      if (rowID === partners.rowID) {
        return {...partners, isChecked: !partners.isChecked};
      }
      return partners;
    });
    console.log('handlechange partner', temp);
    setPartnerBooking(temp);
  };

  let selectedpartner = partners.filter(
    partners => partners.isChecked,
    partners.staff_first_name,
  );

  const renderFlatListPartner = renderData => {
    return (
      <FlatList
        data={renderData}
        keyExtractor={(item, index) => item.rowID}
        renderItem={({item, key}) => (
          <Card style={{margin: 5}} key={key}>
            <View
              style={{
                padding: 10,
                margin: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              key={key}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <CheckBox
                  style={{justifyContent: 'center', alignSelf: 'center'}}
                  value={item.isChecked}
                  onChange={() => {
                    handleChangePartner(item.rowID);
                  }}
                />
                <TouchableOpacity onPress={() => chooseCoba(item)}>
                  <Image
                    source={{uri: item.url_picture}}
                    style={{width: 60, height: 60, borderRadius: 50}}
                  />
                  <Text style={{textAlign: 'center'}}>
                    {item.staff_first_name} {item.staff_last_name}
                  </Text>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.ballboy == 1
                      ? 'Ballboy'
                      : item.coach == 1
                      ? 'Coach'
                      : item.hittingpartner == 1
                      ? 'Hitting Partner'
                      : null}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  const onEditPartner = async (reservation_no, datapartner) => {
    console.log('reserv', reservation_no);
    console.log('data partner yg sudah terpilih', datapartner);
    const datapartner_choosed = datapartner;
    navigation.navigate('ChooseEditPartner', {
      reservation_no,
      datapartner_choosed,
    });
  };

  const onRemovePartner = async (data, reservation_no) => {
    console.log('data remove', data);
    console.log('reserv', reservation_no);

    await axios
      .delete(
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/removepartner/` +
          reservation_no +
          '/' +
          data.staff_id,
      )
      .then(data => {
        console.log('data remove partner', data);
        //    setPartnerBooking(data.data.Data);
        setSpinner(false);
        onRefresh();
        getPartnerBooking();
      })
      .catch(error => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onAddPartner = () => {
    navigation.navigate('ChoosePartner', {reservation_no});
  };

  const onCancelBooking = async onDetailBooking => {
    // alert('ubah status cancel');
    //   console.log('data cancel', onDetailBooking);

    // const beforeHours = jambooking - h * 60 * 60 * 1000;
    const jambooking = onDetailBooking.databooking[0].start_date;
    console.log('jambooking', jambooking);

    const currentDateObj = new Date(jambooking);
    const numberOfMlSeconds = currentDateObj.getTime();
    const addMlSeconds = 60 * 60 * 1000;
    const newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    console.log(
      'newdateibj',
      currentDateObj,
      //   moment(newDateObj).format('YYYY-MM-DD, hh:mm:ss'),
    );

    const data = {
      reservation_no: onDetailBooking.databooking[0].reservation_no,
      remarks: 'Cancel',
      userid: onDetailBooking.databooking[0].audit_user,
    };

    console.log('data cancel booking', data);

    // try {
    //   const res = await axios.post(
    //     'http://34.87.121.155:2121/apiwebpbi/api/facility/book/cancel',
    //     data,
    //   );
    //   if (res) {
    //     console.log('res post', res.data.Data);
    //     //  setDetailBooking(res.data.Data);
    //     //  setSpinner(false);
    //   }
    //   return res;
    // } catch (err) {
    //   console.log('error cancel booking ya', err.response);
    // }
  };

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Booking List Detail')}
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

      <View>
        {spinner || onDetailBooking?.databooking?.length == 0 ? (
          <Text>loading</Text>
        ) : onDetailBooking.databooking != undefined ||
          onDetailBooking.databooking != null ? (
          <View>
            {onDetailBooking?.databooking?.map((datas, index) => (
              <View key={index}>
                <Card
                  style={{margin: 5, padding: 10}}
                  key={index}
                  //   onPress={() => onDetailList(datas)}
                >
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: colors.primary,
                      }}>
                      # {datas.reservation_no}
                    </Text>
                  </View>

                  <View style={{marginVertical: 5}}>
                    <Text style={{fontSize: 14}}>
                      {datas.status == 'B' ? 'Booked' : 'Canceled'} by{' '}
                      {datas.name}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      {datas.facility_name} - {datas.venue_name}
                    </Text>
                  </View>

                  {/* <View>
                    <Text>
                      Duration time: {}
                      {moment().format('MMMM Do YYYY, h:mm:ss a')}
                    </Text>
                  </View> */}

                  {/* ------ untuk partner  */}
                  {onDetailBooking?.datapartner?.length != 0 ? (
                    <View
                      refreshControl={
                        <RefreshControl
                          colors={[colors.primary]}
                          tintColor={colors.primary}
                          refreshing={refreshing}
                          onRefresh={() => {}}
                        />
                      }>
                      {/* <Text>{datapartner.staff_first_name}</Text> */}
                      {/* <View>{renderFilterPartner(onDetailBooking.datapartner)}</View> */}
                      <View
                        style={{
                          paddingVertical: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={{fontWeight: 'bold'}}>
                            Your Partners
                          </Text>
                        </View>

                        <Button
                          onPress={() =>
                            onEditPartner(
                              reservation_no,
                              onDetailBooking.datapartner,
                            )
                          }
                          style={{height: 35, width: 120}}>
                          <Text style={{fontSize: 14}}>Add Partner</Text>
                        </Button>
                      </View>

                      {/* <ScrollView> */}

                      {onDetailBooking.datapartner.map((data, key) => (
                        <View
                          key={key}
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <Image
                              source={{uri: data.url_picture}}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 50,
                              }}></Image>
                            <View
                              style={{
                                flexDirection: 'column',
                                paddingHorizontal: 10,

                                alignSelf: 'center',
                              }}>
                              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                {data.staff_first_name} {data.staff_last_name}
                              </Text>
                              <Text>as a {data.position}</Text>
                            </View>
                          </View>

                          <View>
                            <Button
                              onPress={() =>
                                onRemovePartner(data, reservation_no)
                              }
                              style={{
                                height: 35,
                                width: 120,
                                backgroundColor: BaseColor.yellowColor,
                              }}>
                              <Text style={{fontSize: 15}}>Remove</Text>
                            </Button>
                          </View>
                        </View>
                      ))}
                      {/* </ScrollView> */}
                    </View>
                  ) : (
                    <View>
                      <Button onPress={() => onAddPartner()}>
                        <Text>Add Partner</Text>
                      </Button>
                      <View
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                          }}>
                          You don't have a partner! Please choose partner
                        </Text>
                      </View>
                    </View>
                  )}
                  {/* ----- tutup untuk partner  */}

                  <View style={{flexDirection: 'row', paddingTop: 30}}>
                    <View style={{justifyContent: 'flex-start', flex: 1}}>
                      <View style={{flexDirection: 'row'}}>
                        {/* <Icon
                name="clock"
                size={20}
                color={colors.primary}
                enableRTL={true}
              /> */}
                        <Text
                          style={{
                            marginLeft: 18,
                            fontSize: 12,
                            color: BaseColor.grayColor,
                          }}>
                          Reservation Time
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Icon
                          name="clock"
                          size={17}
                          color={BaseColor.grayColor}
                          enableRTL={true}
                        />
                        <Text
                          style={{color: BaseColor.grayColor, fontSize: 12}}>
                          {' '}
                          {moment(datas.reservation_date).format(
                            'DD MMM YYYY,  hh:mm:ss',
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                      <Button
                        onPress={() => onCancelBooking(onDetailBooking)}
                        style={{
                          height: 30,
                          width: 150,

                          backgroundColor: BaseColor.redColor,
                        }}>
                        <Text style={{fontSize: 15}}>Cancel Booking</Text>
                      </Button>
                    </View>
                  </View>
                </Card>
              </View>
            ))}
          </View>
        ) : (
          <Text>Not Available Data Booking</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
