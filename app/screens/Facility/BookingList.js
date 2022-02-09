import {Image, SafeAreaView, Header} from '@components';
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

export default BookingList = props => {
  const {navigation, route} = props;
  //   // const {params} = props;
  //   console.log('routes from booking facility', route.params);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  const users = useSelector(state => getUser(state));
  const [email, setEmail] = useState(users.user);

  //   const deviceWidth = Dimensions.get('window').width;

  const [dataBooking, setdataBooking] = useState([]);

  const getListBooking = () => {
    axios
      .get(`http://103.111.204.131/apiwebpbi/api/facility/book/all/` + email)
      .then(data => {
        console.log('data book list', data.data.Data);
        setdataBooking(data.data.Data);
        setSpinner(false);
      })
      .catch(error => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getListBooking();
  }, []);

  const renderItemList = ({item, index}) => {
    return (
      <Card
        style={{margin: 5, padding: 10}}
        key={index}
        onPress={() => onDetailList(item)}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color:
                    item.status == 'B'
                      ? colors.primary
                      : item.status == 'C'
                      ? BaseColor.redColor
                      : item.status == 'D'
                      ? BaseColor.blueColor
                      : BaseColor.orangeColor,
                }}>
                # {item.reservation_no}
              </Text>
            </View>

            <View style={{marginVertical: 5}}>
              <Text style={{fontSize: 14}}>
                {item.status == 'B'
                  ? 'Booked'
                  : item.status == 'C'
                  ? 'Canceled'
                  : item.status == 'O'
                  ? 'Ongoing'
                  : item.status == 'D'
                  ? 'Done'
                  : null}{' '}
                by {item.last_update_by}
                {/* nanti name berubah pake kolom baru */}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {item.facility_name} - {item.venue_name}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-between', marginTop: 10}}>
            <Image
              source={{uri: item.facility_picture}}
              style={{height: 100, width: 140, borderRadius: 10}}></Image>
          </View>
        </View>

        <View style={{flexDirection: 'row', flex: 1, paddingTop: 25}}>
          <View style={{justifyContent: 'flex-start', flex: 1}}></View>
          <View style={{justifyContent: 'flex-end'}}>
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
                {' '}
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
              <Text style={{color: BaseColor.grayColor, fontSize: 12}}>
                {' '}
                {moment(item.reservation_date).format('DD MMM YYYY,  hh:mm:ss')}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const onDetailList = item => {
    //   console.log('item for detail list', item);
    navigation.navigate('BookingListDetail', item);
  };
  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView, {flex: 1}]}
      edges={['right', 'top', 'left']}>
      <Header
        title={t('Booking List')}
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

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={dataBooking}
          keyExtractor={item => item.rowID}
          renderItem={renderItemList}
          //   renderItem={({item, index}) => (
          //     <View key={index}>
          //       <Text>{item.facility_name}</Text>
          //     </View>

          //   )}
        />
      </View>

      {/* <View>
        <Text>ini booking list</Text>
      </View> */}
    </SafeAreaView>
  );
};
