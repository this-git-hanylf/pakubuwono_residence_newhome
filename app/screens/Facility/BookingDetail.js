import {
  Image,
  ListMenuIcon,
  Text,
  ListOptionSelected,
  LotNoSelectOption,
  ProfileGridSmall,
} from '@components';
import LabelUpper2Row from '@components/Label/Upper2Row';
import {BaseColor, Images, useTheme} from '@config';
import {FLinks} from '@data';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {Button, ProfileGroup} from '../../components';
import axios from 'axios';
import {EFilterColors, EFilterSizes, FRecentTransactions} from '@data';

export default BookingDetail = props => {
  const {navigation, route} = props;
  // const {params} = props;
  console.log('routes from booking facility', route.params);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(true);
  // const navigation = useNavigation();
  // const [params, setParams] = useState(route?.params);
  // console.log('params dari screen sblm', params);

  const [LotNo, setLotno] = useState([]);
  const [lotnoChoosed, setLotnoChoosed] = useState();

  const [modalVisible_2, setModalVisible_2] = useState(false);
  const [titlenull, setTitle] = useState(false);

  const [partners, setPartner] = useState([]);

  const getLotNo = () => {
    // const entity_cd = route?.params.entity_cd;
    // const project_no = route?.params.project_no;
    // const facility_cd = route?.params.facility_cd;
    // const book_date = route?.params.book_date;
    // const id = route?.params.id;
    // console.log('entity', entity_cd);
    // console.log('project_no', project_no);
    // console.log('facility_cd', facility_cd);
    // console.log('book_date', book_date);
    // console.log('id', id);

    axios
      .get(
        'http://34.87.121.155:2121/apiwebpbi/api/facility/book/unit?email=bagus.trinanda@ifca.co.id',
        // `http://34.87.121.155:2121/apiwebpbi/api/facility/book/hours_id?entity_cd=` +
        //   entity_cd +
        //   '&project_no=' +
        //   project_no +
        //   '&facility_cd=' +
        //   facility_cd +
        //   '&book_date=' +
        //   book_date +
        //   '&id=' +
        //   id,
      )
      .then(data => {
        // console.log('data lotno', data.data.data);
        const resLotno = data.data.data;
        setLotno(resLotno);
        // setTimeDate(data[0]);

        setSpinner(false);
      })
      .catch(error => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
    // http://34.87.121.155:2121/apiwebpbi/api/facility/book/unit?email=bagus.trinanda@ifca.co.id
  };
  useEffect(() => {
    getLotNo();
  }, []);

  const getPartners = () => {
    const entity_cd = route?.params.items.entity_cd;
    const project_no = route?.params.items.project_no;
    const facility_cd = route?.params.items.facility_cd;
    const book_date = route?.params.items.book_date;
    const id = route?.params.items.id;
    const jam_booking = route?.params.jam_booking;
    console.log('entity', entity_cd);
    console.log('project_no', project_no);
    console.log('facility_cd', facility_cd);
    console.log('book_date', book_date);
    console.log('id', id);
    console.log('jam_booking', jam_booking);

    console.log(
      'url api partner',
      `http://34.87.121.155:2121/apiwebpbi/api/facility/book/staffs?entity_cd=` +
        entity_cd +
        '&project_no=' +
        project_no +
        '&facility_cd=' +
        facility_cd +
        '&book_date=' +
        book_date +
        '&book_hour=' +
        jam_booking,
    );
    axios
      .get(
        //  'http://34.87.121.155:2121/apiwebpbi/api/facility/book/staffs?entity_cd=01&project_no=01&facility_cd=BDMT&venue_cd=796160&book_date=2021-12-14&book_hour=15:00',
        // http://34.87.121.155:2121/apiwebpbi/api/facility/book/staffs?entity_cd=01&project_no=01&facility_cd=BDMT&venue_cd=796160&book_date=2021-12-14&book_hour=15:00
        `http://34.87.121.155:2121/apiwebpbi/api/facility/book/staffs?entity_cd=` +
          entity_cd +
          '&project_no=' +
          project_no +
          '&facility_cd=' +
          facility_cd +
          '&book_date=' +
          book_date +
          '&book_hour=' +
          jam_booking,
      )
      .then(data => {
        console.log('data partners', data.data.data);
        const resPartner = data.data.data;
        setPartner(resPartner);
        // setTimeDate(data[0]);

        setSpinner(false);
      })
      .catch(error => console.error(error))
      // .catch(error => console.error(error.response.data))
      .finally(() => setLoading(false));
    // http://34.87.121.155:2121/apiwebpbi/api/facility/book/unit?email=bagus.trinanda@ifca.co.id
  };
  useEffect(() => {
    getPartners();
  }, []);

  const onChangeOption = option => {
    // console.log('option klik', option);

    setLotnoChoosed(option);
    setTitle(true);
    // getBooked(dataTowerUser, databookdate, venue_klik);
    setTimeout(() => {
      setModalVisible_2(false);
    }, 200);
  };
  const choosePartners = item => {
    console.log('choose partner', item);
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 15,
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Text title1>Booking Detail</Text>
              {/* <Text title3 style={{marginTop: 10}}>
                A peer-to-peer electric cash system
              </Text> */}
            </View>
            <Image source={Images.logo} style={{width: 40, height: 40}} />
          </View>
          {/* <Text body2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            tristique urna diam. Nunc dolor risus, consequat sit amet dui quis,
            euismod rutrum ipsum. Integer finibus magna imperdiet urna iaculis
            dignissim.
          </Text> */}
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <Text subheadline bold>
              Choose Lot No
            </Text>
            <ListOptionSelected
              style={{marginTop: 10}}
              textLeft={
                titlenull == false ? 'Choose Lot No' : lotnoChoosed?.lot_no
              }
              // textRight={venueChoosed?.venue_name}
              onPress={() => setModalVisible_2(true)}
            />

            <LotNoSelectOption
              isVisible={modalVisible_2}
              options={LotNo}
              onChange={onChangeOption}
              lotnoChoosed={lotnoChoosed}
              onSwipeComplete={() => setModalVisible_2(false)}
            />
          </View>

          <View style={{paddingVertical: 20}}>
            <Text>Choose Hitting Partners</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            {partners.map((item, index) =>
              item.hittingpartner == 1 ? (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ProfileGridSmall
                    image={item.url_picture}
                    name={item.staff_first_name}
                    desc={item.hittingpartner == 1 ? 'Hitting Partner' : null}
                    onPress={() => choosePartners(item)}
                  />
                </View>
              ) : null,
            )}
          </View>

          <View style={{paddingVertical: 20}}>
            <Text>Choose Ballboy</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            {partners.map(
              (item, index) =>
                item.ballboy == 1 ? (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View>Choose Ballboy</View>
                    <ProfileGridSmall
                      image={item.url_picture}
                      name={item.staff_first_name}
                      desc={item.ballboy == 1 ? 'Ballboy' : null}
                      onPress={() => choosePartners(item)}
                    />
                  </View>
                ) : (
                  <Text>Ballboy not available</Text>
                ),

              // null,
            )}
          </View>

          <View style={{paddingVertical: 20}}>
            <Text>Choose Coach</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            {partners.map((item, index) =>
              item.coach == 1 ? (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ProfileGridSmall
                    url_picture={item.url_picture}
                    name={item.staff_first_name}
                    desc={item.coach == 1 ? 'coach' : null}
                    onPress={() => choosePartners(item)}
                  />

                  {/* <ProfileGridSmall
                  image={item.url_picture}
                  name={item.staff_first_name}
                  desc={
                    item.hittingpartner == 1
                      ? 'Hitting Partner'
                      : item.ballboy == 1
                      ? 'Ballboy'
                      : item.coach == 1
                      ? 'Coach'
                      : item.hittingpartner == 1 && item.coach == 1
                      ? '&Hitting Partner'
                      : null
                  }
                  onPress={() => choosePartners(item)}
                /> */}
                </View>
              ) : null,
            )}
          </View>

          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            <Text title3>{t('Booking')}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 20,
              }}>
              <LabelUpper2Row
                style={{flex: 1}}
                label={t('Venue')}
                value="Putting Green"
              />
              <LabelUpper2Row
                style={{flex: 1}}
                label={t('Booking Detail')}
                value="Duration 1 hour"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <LabelUpper2Row
                style={{flex: 1}}
                label={t('Order Time')}
                value="2020-12-08"
              />
              <LabelUpper2Row
                style={{flex: 1}}
                label={t('Time')}
                value="09:00 - 10:00"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              marginBottom: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: colors.border,
              paddingTop: 15,
              paddingBottom: 10,
            }}>
            <ProfileGroup
              users={[
                {
                  image: Images.profile1,
                },
                {
                  image: Images.profile2,
                },
                {
                  image: Images.profile3,
                },
              ]}
              name="Selected Partner"
              detail="Your Selected Partner"
              style={{}}
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              //   onPress={() => {}}
              //   onPressLove={() => {}}
            />
          </View>
          {/* <Text title3>{t('links')}</Text>
          {FLinks.map(item => (
            <ListMenuIcon key={item.id} icon={item.icon} title={item.title} />
          ))} */}
          <Button
            full
            style={{marginTop: 10, marginBottom: 20}}
            onPress={() => {
              navigation.navigate('BookingFacility');
            }}>
            {t('Back To Schedule')}
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};
