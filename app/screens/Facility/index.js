import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  PlaceholderLine,
  Placeholder,
  Text,
  Header,
  Icon,
  colors,
} from '@components';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import List from '../../components/Product/List';
import styles from './styles';
import ProductGrid1 from './Grid1';
import {Button} from '../../components';

import {useSelector} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import getProject from '../../selectors/ProjectSelector';
import * as Utils from '@utils';

import {
  // Placeholder,
  PlaceholderMedia,
  // PlaceholderLine,
  // Fade,
  Loader,
  Shine,
  ShineOverlay,
} from 'rn-placeholder';

const Facility = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);
  const users = useSelector(state => getUser(state));
  // console.log('users',)
  const [email, setEmail] = useState(users.user);
  const [dataTowerUser, setdataTowerUser] = useState([]);
  const [arrDataTowerUser, setArrDataTowerUser] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const project = useSelector(state => getProject(state));
  console.log('project selector', project);

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
        // console.log('tower entity projek', datas);
        const arrDataTower = datas.Data;
        arrDataTower.map(dat => {
          if (dat) {
            setdataTowerUser(dat);
            getdata(dat);
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

  useEffect(() => {
    getTower();
    // getdata();
    // getTower();
    // setTimeout(() => {
    //   // setLoading(false);
    //   getTower();
    // }, 3000);
  }, []);

  const getdata = data => {
    const entity_cd = data.entity_cd;
    console.log('next abis tower', entity_cd);
    const project_no = data.project_no;
    axios
      .get(
        'http://103.111.204.131/apiwebpbi/api/fb-facilitylist/' +
          entity_cd +
          '/' +
          project_no,
      )
      .then(res => {
        console.log('ress fcacility:', res.data);
        setData(res.data);
        setSpinner(false);
      });
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        <Header
          title={t('Facility')}
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
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text bold headline>
                Choose Facility
              </Text>
              <Text subtitle>Reserve Facility for Your Activity</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('BookingList')}>
              <View
                style={{
                  // width: 100,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                  // padding: 10,
                  paddingVertical: 6,
                  paddingHorizontal: 20,
                }}>
                <Text subtitle style={{color: BaseColor.whiteColor}}>
                  {' '}
                  Booking List
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, padding: 15, paddingTop: 10}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {data?.map((item, index) => {
                return (
                  <View key={index} style={{width: '50%', height: 290}}>
                    <ProductGrid1
                      key={index}
                      style={{
                        width: '100%',
                        paddingRight: index % 2 == 0 ? 10 : 0,
                        paddingLeft: index % 2 != 0 ? 10 : 0,
                      }}
                      description={item.available}
                      title={item.title}
                      image={item.image}
                      // image={require('@assets/images/avata-01.jpeg')}
                      // costPrice={item.costPrice}
                      // salePrice={item.salePrice}
                      // isFavorite={item.isFavorite}
                      onPress={() =>
                        navigation.navigate('DetailFacility', item)
                      }
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Facility;
