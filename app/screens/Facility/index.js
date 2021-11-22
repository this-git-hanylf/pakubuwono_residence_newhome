import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  News43,
  ListFacility,
  SafeAreaView,
  Text,
  Header,
  Icon,
  colors,
} from '@components';
import {BaseStyle, useTheme} from '@config';
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

const Facility = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axios('http://10.0.2.2:3000/check');
      console.log('response: ', response);
      setData(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    // getdata();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // const getdata = () => {
  //   axios.get('http://10.0.2.2:3000/check').then(res => {
  //     console.log('ress :', res);
  //   });
  // };

  const goPost = item => () => {
    navigation.navigate('Post', {item: item});
  };

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
  };

  const goToCategory = () => {
    navigation.navigate('Category');
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
          <View>
            <Text bold headline>
              Choose Facility
            </Text>
            <Text subtitle>Reserve Facility for Your Activity</Text>
          </View>
          <View style={{flex: 1, padding: 15, paddingTop: 10}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {/* <View>
                <Text>{data.title}</Text>
              </View> */}
              {data?.map((item, index) => {
                return (
                  <View key={index} style={{width: '50%'}}>
                    <ProductGrid1
                      style={{
                        width: '100%',
                        paddingRight: index % 2 == 0 ? 10 : 0,
                        paddingLeft: index % 2 != 0 ? 10 : 0,
                      }}
                      description={item.availabel}
                      title={item.title}
                      image={item.image}
                      // costPrice={item.costPrice}
                      // salePrice={item.salePrice}
                      // isFavorite={item.isFavorite}
                      onPress={() => navigation.navigate('DetailFacility')}
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
