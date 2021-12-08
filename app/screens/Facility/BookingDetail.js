import {Image, ListMenuIcon, Text} from '@components';
import LabelUpper2Row from '@components/Label/Upper2Row';
import {BaseColor, Images, useTheme} from '@config';
import {FLinks} from '@data';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {Button, ProfileGroup} from '../../components';

export default BookingDetail = () => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

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
          <Text body2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            tristique urna diam. Nunc dolor risus, consequat sit amet dui quis,
            euismod rutrum ipsum. Integer finibus magna imperdiet urna iaculis
            dignissim.
          </Text>
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
