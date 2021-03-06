import {
  CardChannelGrid,
  CardSlide,
  CategoryList,
  CardReport06,
  News43,
  Price2Col,
  Icon,
  PlaceholderLine,
  Placeholder,
  NewsList,
  SafeAreaView,
  Text,
  Transaction2Col,
  SearchInput,
  TextInput,
} from '@components';
import {BaseColor, BaseStyle, useTheme, Typography, FontWeight} from '@config';
import {
  HomeChannelData,
  HomeListData,
  HomePopularData,
  HomeTopicData,
  PostListData,
} from '@data';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ScrollView,
  View,
  Image,
  Animated,
  ImageBackground,
  RefreshControl,
  // ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import getUser from '../../selectors/UserSelectors';
import HeaderCard from './HeaderCard';
import HeaderHome from './HeaderHome';
import styles from './styles';
import Swiper from 'react-native-swiper';
import Categories from './Categories';
import axios from 'axios';
import * as Utils from '@utils';
import numFormat from '../../components/numFormat';
import messaging from '@react-native-firebase/messaging';
import {notifikasi_nbadge, actionTypes} from '../../actions/NotifActions';
import apiCall from '../../config/ApiActionCreator';
import getNotifRed from '../../selectors/NotifSelectors';

import LinearGradient from 'react-native-linear-gradient';
import ModalSelector from 'react-native-modal-selector';

import SliderNews from './SliderNews';

import getProject from '../../selectors/ProjectSelector';
import {data_project} from '../../actions/ProjectActions';

import MasonryList from '@react-native-seoul/masonry-list';
import {ActivityIndicator} from 'react-native-paper';

import Modal from 'react-native-modal';

import {Platform} from 'react-native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const greetingsdummy = [
  {email: 'kky@zinus.com', status: 'New', first_logindate: ''},
];

const imagegreetings = [
  {
    images: '',
  },
];

const Home = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [topics, setTopics] = useState(HomeTopicData);
  const [channels, setChannels] = useState(HomeChannelData);
  const [popular, setPopular] = useState(HomePopularData);
  const [list, setList] = useState(HomeListData);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => getUser(state));
  console.log('user dihome', user);

  const project = useSelector(state => getProject(state));
  console.log('project selector', project);

  const [fotoprofil, setFotoProfil] = useState(
    user != null
      ? {uri: user.pict}
      : require('../../assets/images/image-home/Main_Image.png'),
  );
  const [name, setName] = useState(user != null ? user.name : '');
  const notif = useSelector(state => getNotifRed(state));
  console.log('cobanotif di home', notif);
  // const email = user.user;
  const [email, setEmail] = useState(user != null ? user.user : '');
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const [getDataNotDue, setDataNotDue] = useState([]);
  const [getDataDue, setDataDue] = useState([]);
  const [getDataHistory, setDataHistory] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [lotno, setLotno] = useState([]);
  console.log('lotno array 0', lotno);
  const [text_lotno, setTextLotno] = useState('');

  const [entity_cd, setEntity] = useState(project.Data[0].entity_cd);
  const [project_no, setProjectNo] = useState(project.Data[0].project_no);

  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const [default_text_lotno, setDefaultLotno] = useState(true);
  const [newsannounce, setNewsAnnounce] = useState([]);
  const [newsannounceslice, setNewsAnnounceSlice] = useState([]);
  const [loadNewsAnnounce, setLoadNews] = useState(true);

  const [promoclubfac, setPromoClubFac] = useState([]);
  const [promoclubfacslice, setPromoClubFacSlice] = useState([]);
  const [loadpromoclubAnnounce, setLoadPromoClub] = useState(true);
  const [imagePromoClubFac, setImagePromoClubFac] = useState([]);

  const [eventresto, setEventRestaurant] = useState([]);
  const [eventrestoslice, setEventRestaurantSlice] = useState([]);
  const [loadeventresto, setLoadEventResto] = useState(true);
  const [imageEventResto, setImageEventResto] = useState([]);

  const [dummyStatusUser, setDummyStatusUser] = useState('Old');

  const [statusUser, setStatusUser] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [imageGreetings, setImageGreetings] = useState([]);
  const [modalShowImage, setmodalShowImage] = useState(false);
  const [urlImageGreetings, setUrlGreetingsImage] = useState('');

  //untuk load data get chairman message
  // (sebenernya terpakai hanya sekali, saat open screen pertama kali.
  // jika tidak dibatasi dengan akhir[] maka akan menimbulkan load limit.
  // tidak error parah, cuma mengganggu saja)
  useEffect(async () => {
    // console.log(
    //   'url greetings chairman',
    //   `http://34.87.121.155:2121/apiwebpbi/api/first_login_Get/` + email,
    // );
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/first_login_Get/` + email)
      .then(res => {
        console.log('res greetings', res.data.data);
        const status_user = res.data.data[0].status;
        // console.log('status user new old', status_user);
        setStatusUser(status_user);

        if (status_user == 'N') {
          setModalImage(true); // sementara di jadiin false dulu, untuk hide modal.
          getImageGreetings();
        } else {
          setModalImage(false);
        }
        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error res greeting', error);
        // alert('error get');
      });
  }, []);

  const getImageGreetings = async () => {
    // console.log(
    //   'url greetings chairman',
    //   `http://103.111.204.131/apiwebpbi/api/first_login_Get/` + email,
    // );
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/greetings_mobile`)
      .then(res => {
        // console.log('res greetings', res.data.data);
        const image_greetings = res.data.data;
        console.log('image_greetings', image_greetings);
        setImageGreetings(image_greetings);
        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error res image greeting', error);
        // alert('error get');
      });
  };

  const pressChairmanMessage = async () => {
    //sementara ditutup dulu prosesnya update status dan tanggalnya
    // setModalImage(false);

    await axios
      .post(`http://103.111.204.131/apiwebpbi/api/first_login/` + email)
      .then(res => {
        console.log('res update tanggal greetings', res.data.data);
        // console.log('status user new old', status_user);
        setModalImage(false);
        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error update tanggal greetings', error);
        // alert('error get');
      });

    //setelah itu jalanin disini update data status jadi Old dan tanggal first_logindate today where email
  };

  const previewZoomGreeting = item => {
    setUrlGreetingsImage(item);
    setmodalShowImage(true);
    // navigation.navigate('PreviewImageHome', {images: item});
  };

  const {width} = Dimensions.get('window');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://103.111.204.131/ifcaprop-api/api/about')
  //     .then(({data}) => {
  //       console.log('data images', data[0].images);
  //       setData(data[0].images);
  //       setLoading(false);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const loadProject = useCallback(
    () => dispatch(data_project({emails: email})),
    [{emails: email}, dispatch],
  );

  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('Notification', remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.navigate('Notification', remoteMessage);
        }
        setLoading(false);
      });
  }, []);

  //untuk load badge notif
  useEffect(() => {
    dispatch(
      apiCall(
        `http://103.111.204.131/apiwebpbi/api/notification?email=${email}&entity_cd=01&project_no=01`,
      ),
    );
  }, []);

  // const getTower = async () => {
  //   const data = {
  //     email: user.user,
  //     app: 'O',
  //   };
  //   console.log('params for tower', data);
  //   const config = {
  //     headers: {
  //       accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       // token: "",
  //     },
  //   };

  //   await axios
  //     .get(
  //       `http://103.111.204.131/apiwebpbi/api/getData/mysql/${data.email}/${data.app}`,
  //     )
  //     .then(res => {
  //       const datas = res.data;

  //       const arrDataTower = datas.Data;
  //       arrDataTower.map(dat => {
  //         if (dat) {
  //           setdataTowerUser(dat);
  //           setEntity(dat.entity_cd);
  //           setProjectNo(dat.project_no);
  //           console.log('entity dari tower map', dat.entity_cd);
  //           console.log('project dari tower map', dat.project_no);
  //           notifUser(dat.entity_cd, dat.project_no);
  //         }
  //       });
  //       setArrDataTowerUser(arrDataTower);
  //       setSpinner(false);
  //       getLotNo();
  //       // return res.data;
  //     })
  //     .catch(error => {
  //       console.log('error get tower api', error);
  //       // alert('error get');
  //     });
  // };

  async function getLotNo() {
    console.log(
      'url api lotno',
      'http://103.111.204.131/apiwebpbi/api/facility/book/unit?entity=' +
        entity_cd +
        '&' +
        'project=' +
        project_no +
        '&' +
        'email=' +
        email,
    );
    try {
      const res = await axios.get(
        `http://103.111.204.131/apiwebpbi/api/facility/book/unit?entity=` +
          entity_cd +
          '&' +
          'project=' +
          project_no +
          '&' +
          'email=' +
          email,
      );
      const resLotno = res.data.data;
      console.log('reslotno', resLotno);
      setLotno(resLotno);
      if (default_text_lotno == true) {
        setTextLotno(resLotno[0]);
      }
      setSpinner(false);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  const getNewsAnnounce = async () => {
    // console.log('kok ini gada');
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/news-announce`)
      .then(res => {
        console.log('res news', res.data.data);
        const datanews = res.data.data;
        const slicedatanews = datanews.slice(0, 6);
        console.log('slice data', slicedatanews);
        setNewsAnnounceSlice(slicedatanews);
        setNewsAnnounce(datanews);
        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get news announce home', error);
        // alert('error get');
      });
  };

  const dataPromoClubFacilities = async () => {
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/promoclubfacilities`)
      .then(res => {
        console.log('res promoclubfacilities', res.data.data);
        const datapromoclub = res.data.data;
        const slicedatapromo = datapromoclub.slice(0, 6);
        console.log('slice data promo', slicedatapromo);

        // filter by category

        const filterForPromo = datapromoclub
          .filter(item => item.category === 'P')
          .map(items => items);

        const filterForClubFacilities = datapromoclub
          .filter(item => item.category === 'CF')
          .map(items => items);

        const filterForEvent = datapromoclub
          .filter(item => item.category == 'E')
          .map(items => items);

        const filterForRestaurant = datapromoclub
          .filter(item => item.category == 'R')
          .map(items => items);

        // join data atau data gabungan all per 2 category

        const joinFilterDataPromoClubFac = [
          ...filterForPromo,
          ...filterForClubFacilities,
        ];

        const joinFilterDataEventRestaurant = [
          ...filterForEvent,
          ...filterForRestaurant,
        ];

        // slice data for image

        const slicedatapromoclubfac = joinFilterDataPromoClubFac.slice(0, 6);
        const slicedataeventresto = joinFilterDataEventRestaurant.slice(0, 6);

        // pecah array images from data slice

        const arrayImagePromoClubFac = slicedatapromoclubfac.map(
          (item, key) => {
            return {
              ...item.images[0],
            };
          },
        );

        const arrayImageEventResto = slicedataeventresto.map((item, key) => {
          return {
            ...item.images[0],
          };
        });

        // const slicedatapromo = datapromoclub.slice(0, 6);
        // console.log('slice data promo', slicedatapromo);
        // console.log('image promo club', datapromoclub.image);

        // const tes = slicedatapromo.map((item, key) => {
        //   return {
        //     ...item.images[0],
        //   };
        // });
        // console.log('tes gambar map', tes);

        console.log('image club fac', arrayImagePromoClubFac);

        setImagePromoClubFac(arrayImagePromoClubFac);
        setPromoClubFacSlice(slicedatapromoclubfac);
        setPromoClubFac(joinFilterDataPromoClubFac);

        setImageEventResto(arrayImageEventResto);
        setEventRestaurantSlice(slicedatapromoclubfac);
        setEventRestaurant(joinFilterDataEventRestaurant);

        setLoadNews(false);
        // return res.data;
      })
      .catch(error => {
        console.log('error get news announce home', error);
        // alert('error get');
      });
  };

  // useEffect(() => {
  //   axios
  //     .get('http://103.111.204.131/ifcaprop-api/api/about')
  //     .then(({data}) => {
  //       console.log('data', data);
  //       setData(data[0].images);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  const notifUser = useCallback(
    (entity_cd, project_no) =>
      dispatch(notifikasi_nbadge(email, entity_cd, project_no)),
    [email, entity_cd, project_no, dispatch],
  );

  const dataImage = async () => {
    await axios
      .get(`http://103.111.204.131/apiwebpbi/api/about/image`)
      .then(res => {
        console.log('res image', res.data.data);
        // console.log('data images', res.data[0].images);
        setData(res.data.data);
        // return res.data;
      })
      .catch(error => {
        console.log('error get about us image', error);
        // alert('error get');
      });
  };

  async function fetchDataNotDue() {
    try {
      const res = await axios.get(
        `http://103.111.204.131/apiwebpbi/api/getDataCurrentSummary/IFCAPB/${user.user}`,
      );
      setDataNotDue(res.data.Data);
      console.log('data get data not due', res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  async function fetchDataDue() {
    try {
      const res = await axios.get(
        `http://103.111.204.131/apiwebpbi/api/getDataDueSummary/IFCAPB/${user.user}`,
      );
      setDataDue(res.data.Data);
      console.log('data get data due', res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }
  async function fetchDataHistory() {
    try {
      const res = await axios.get(
        `http://103.111.204.131/apiwebpbi/api/getSummaryHistory/IFCAPB/${user.user}`,
      );
      setDataHistory(res.data.Data);
      console.log('data get history', res.data.Data);
    } catch (error) {
      setErrors(error);
      // alert(hasError.toString());
    }
  }

  const galery = [...data];

  //TOTAL DATE DUE
  const sum =
    getDataDue == 0
      ? 0
      : getDataDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  console.log('sum', sum);

  //TOTAL DATE NOT DUE

  console.log('getDataNotDue asa', getDataNotDue);
  const sumNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : getDataNotDue.reduceRight((max, bills) => {
          return (max += parseInt(bills.mbal_amt));
        }, 0);

  console.log('sumNotDue', sumNotDue);

  const math_total = Math.floor(sumNotDue) + Math.floor(sum);
  console.log('math total', math_total);

  const sumHistory =
    getDataHistory == null
      ? 0
      : getDataHistory.reduceRight((max, bills) => {
          return (max += parseInt(bills.mdoc_amt));
        }, 0);

  console.log('sumHistory', sumHistory);

  //LENGTH
  const onSelect = indexSelected => {};

  const unique =
    getDataDue == 0 ? 0 : [...new Set(getDataDue.map(item => item.doc_no))];
  console.log('unique', unique);

  const uniqueNotDue =
    getDataNotDue == 0 || getDataNotDue == null
      ? 0
      : [...new Set(getDataNotDue.map(item => item.doc_no))];
  console.log('uniqueNotDue', uniqueNotDue);

  const invoice = unique == 0 ? 0 : unique.length;
  console.log('invoice', invoice);

  const invoiceNotDue = uniqueNotDue == 0 ? 0 : uniqueNotDue.length;
  console.log('invoiceNotDue', invoiceNotDue);

  const total_outstanding = Math.floor(invoice) + Math.floor(invoiceNotDue);
  console.log('total_outstanding', total_outstanding);

  const uniqueHistory =
    getDataHistory == null
      ? 0
      : [...new Set(getDataHistory.map(item => item.doc_no))];
  console.log('uniqueHistory', uniqueHistory);

  const invoiceHistory = uniqueHistory.length;
  console.log('invoiceHistory', invoiceHistory);

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  useEffect(() => {
    console.log('galery', galery);
    dataImage();
    getNewsAnnounce();
    dataPromoClubFacilities();
    console.log('datauser', user);
    console.log('about', data);
    fetchDataDue();
    fetchDataNotDue();
    fetchDataHistory();
    // getTower();
    // fetchAbout();

    loadProject();
    getLotNo();
    notifUser();
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   getNewsAnnounce();
  // }, []);

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
  };

  const goToMoreNewsAnnounce = item => {
    // console.log('item go to', item.length);
    navigation.navigate('NewsAnnounce', {items: item});
  };

  const goToEventResto = item => {
    // console.log('item go to', item.length);
    navigation.navigate('EventResto', {items: item});
  };

  const goToPromoClubFac = item => {
    console.log('item go to', item.length);
    navigation.navigate('ClubFacilities', {items: item});
  };

  const onChangeText = text => {
    setKeyword(text);
    // setCategory(
    //   text
    //     ? category.filter(item => item.title.includes(text))
    //     : CategoryData,
    // );
  };

  const onChangelot = lot => {
    console.log('lot', lot);
    setDefaultLotno(false);
    setTextLotno(lot);
  };

  const CardItem = ({i, item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PreviewImageHome', {images: item.pict})
        }>
        <View key={i} style={([styles.shadow], {})}>
          <Image
            source={{uri: item.pict}}
            style={
              ([styles.shadow],
              {
                height: i % 2 ? 300 : 200,
                width: 200,
                margin: 5,
                borderRadius: 10,
                alignSelf: 'stretch',
              })
            }
            resizeMode={'cover'}></Image>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    const mainNews = PostListData[0];

    return (
      <SafeAreaView
        style={[BaseStyle.safeAreaView, {flex: 1}]}
        edges={['right', 'top', 'left']}>
        {user == null || user == '' ? (
          <Text>data user dihome null</Text>
        ) : // <HeaderHome />
        null}

        {/* Modal Greeting Chairman  */}
        <View>
          <Modal
            isVisible={modalImage}
            animationType={'slide'}
            style={{height: '100%', padding: 0, margin: 0}}
            onBackdropPress={() => pressChairmanMessage()}>
            <View
              style={{
                backgroundColor: BaseColor.whiteColor,
                height: '100%',
                borderRadius: 30,
                // justifyContent: 'center',
              }}>
              {/* Button close X  */}
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 5}}>
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    flex: 1,
                  }}></View>
                {/* <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    marginRight: 10,
                  }}>
                  <Pressable onPress={() => pressChairmanMessage()}>
                    <View style={{width: 30, height: 20}}>
                      <Icon name={'times'} size={20}></Icon>
                    </View>
                  </Pressable>
                </View>
              */}
              </View>
              {imageGreetings.map((item, index) => (
                <View style={{flex: 1}} key={index}>
                  <ImageBackground
                    source={{uri: item.greetings_file}}
                    // source={require('@assets/images/ChairmanMessage.jpeg')}
                    style={{
                      width: Dimensions.get('window').width,
                      height: '100%',
                      resizeMode: 'cover',
                      // paddingVertical: 10,
                    }}>
                    {/* Button Next Here  */}
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginBottom: 36,
                      }}>
                      <View style={{flexDirection: 'row', width: '100%'}}>
                        <View
                          style={{
                            marginTop: 10,
                            justifyContent: 'space-between',
                            flex: 1,
                            // backgroundColor: 'red',
                            // width: '50%',
                          }}>
                          {/* <Text>halo</Text> */}
                          <Pressable
                            onPress={() =>
                              previewZoomGreeting(item.greetings_file)
                            }>
                            <View
                              style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  paddingHorizontal: 10,
                                  fontSize: 16,
                                  color: colors.primary,
                                }}>
                                Preview Zoom
                              </Text>
                              <Icon
                                name="search"
                                solid
                                size={16}
                                color={colors.primary}
                              />
                            </View>
                          </Pressable>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            justifyContent: 'space-between',
                            // marginRight: 10,
                            // flex: 1,
                            // backgroundColor: 'blue',
                            // width: '50%',
                          }}>
                          <Pressable onPress={() => pressChairmanMessage()}>
                            <View
                              style={{
                                alignItems: 'center',
                                marginRight: 20,
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  paddingHorizontal: 10,
                                  fontSize: 16,
                                  color: colors.primary,
                                }}>
                                Next
                              </Text>
                              <Icon
                                name="arrow-right"
                                solid
                                size={16}
                                color={colors.primary}
                              />
                            </View>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </View>
          </Modal>
        </View>
        {/* Close Modal Greeting Chairman  */}

        {/* Modal Show Image Greeting Chairman  */}
        <View>
          <Modal
            // style={{margin: 10, padding: 10}}
            isVisible={modalShowImage}
            onBackdropPress={() => setmodalShowImage(false)}>
            <View>
              {/* Button close X  */}
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 10}}>
                <View
                  style={{
                    // marginTop: 10,
                    justifyContent: 'space-between',
                    flex: 1,
                  }}></View>
                <View
                  style={{
                    // marginTop: 10,
                    justifyContent: 'space-between',
                    marginRight: 10,
                  }}>
                  <Pressable onPress={() => setmodalShowImage(false)}>
                    <View style={{width: 30, height: 20}}>
                      <Icon name={'times'} size={20} color={'white'}></Icon>
                    </View>
                  </Pressable>
                </View>
              </View>
              <Image
                // key={key}
                style={{width: '100%', height: '95%'}}
                resizeMode="cover"
                source={{uri: urlImageGreetings}}
              />
            </View>
          </Modal>
        </View>
        {/* Modal Show Image Greeting Chairman  */}

        <ScrollView
          // contentContainerStyle={styles.paddingSrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{flex: 1}}>
            <ImageBackground
              // source={require('../../assets/images/image-home/Main_Image.png')}
              source={require('../../assets/images/image-home/Pakubuwono.jpeg')}
              style={
                {
                  // height: '100%',
                  // height: 400,
                  // width: '100%',
                  // flex: 1,
                  // resizeMode: 'cover',
                  // borderBottomLeftRadius: 500,
                  // borderBottomRightRadius: 175,
                }
              }
              imageStyle={{
                height: 400,
                width: '100%',
                borderBottomLeftRadius: 175,
                borderBottomRightRadius: 175,
              }}>
              <LinearGradient
                colors={['rgba(73, 73, 73, 0)', 'rgba(73, 73, 73, 1)']}
                // colors={['#4c669f', '#3b5998', '#192f6a']}
                // {...otherGradientProps}
                style={{
                  height: 400,
                  // height: '85%',
                  width: '100%',

                  flexDirection: 'column',
                  // flex: 1,
                  justifyContent: 'center',
                  // top: 30,
                  borderBottomLeftRadius: 175,
                  borderBottomRightRadius: 175,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'center',
                    top: 30,
                  }}>
                  {/* ------- TEXT WELCOME HOME ------- */}
                  <View
                    style={{
                      // flex: 1,
                      alignItems: 'center',

                      left: 47,
                      justifyContent: 'center',

                      // width: '50%',
                      width: Dimensions.get('window').width / 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 50,
                        color: 'white',
                        fontFamily: 'DMSerifDisplay',
                        lineHeight: 55,
                      }}>
                      Welcome Home
                    </Text>
                  </View>
                  {/* ------- CLOSE TEXT WELCOME HOME ------- */}

                  {/* ----- SEARCH INPUT ----- */}
                  {/* <View
                    style={{
                      // flex: 1,
                      alignItems: 'center',
                      left: 47,
                      justifyContent: 'center',
                      width: '80%',
                    }}>
                    <SearchInput
                      style={[BaseStyle.textInput, Typography.body1]}
                      onChangeText={onChangeText}
                      autoCorrect={false}
                      placeholder={t('Explore your luxury lifestyle')}
                      placeholderTextColor={BaseColor.grayColor}
                      value={keyword}
                      selectionColor={colors.primary}
                      onSubmitEditing={() => {}}
                      icon={
                        <Icon
                          name="search"
                          solid
                          size={24}
                          color={colors.primary}
                        />
                      }
                    />
                  </View> */}

                  <View style={{alignItems: 'center', top: 15}}>
                    <Image
                      style={{
                        height: 70,
                        width: '60%',
                      }}
                      source={require('../../assets/images/image-home/vector-logo-pbi.png')}></Image>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 35,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
              // source={require('../../assets/images/image-home/Main_Image.png')}
              source={fotoprofil}></Image>
            <View style={{alignSelf: 'center', marginLeft: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginVertical: 3,
                    fontFamily: 'DMSerifDisplay',
                  }}>
                  {/* Nama pemilik */}
                  {name}
                </Text>
                <Icon
                  name="star"
                  solid
                  size={18}
                  color={colors.primary}
                  style={{marginHorizontal: 5}}
                />
              </View>

              <View
                style={{
                  backgroundColor: '#315447',
                  height: 30,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}>
                <View style={{flexDirection: 'row', paddingLeft: 10}}>
                  <Text
                    style={{
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 14,
                      justifyContent: 'center',
                      paddingRight: 10,

                      fontWeight: '800',
                      fontFamily: 'KaiseiHarunoUmi',
                    }}>
                    Unit
                  </Text>

                  <ModalSelector
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                    childrenContainerStyle={{
                      color: '#CDB04A',
                      alignSelf: 'center',
                      fontSize: 16,
                      // top: 10,
                      // flex: 1,
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontFamily: 'KaiseiHarunoUmi',
                    }}
                    data={lotno}
                    optionTextStyle={{color: '#333'}}
                    selectedItemTextStyle={{color: '#3C85F1'}}
                    accessible={true}
                    keyExtractor={item => item.lot_no}
                    labelExtractor={item => item.lot_no} //khusus untuk lotno
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    initValue={'ahlo'}
                    onChange={option => {
                      onChangelot(option);
                    }}>
                    <Text
                      style={{
                        color: '#CDB04A',
                        alignSelf: 'center',
                        fontSize: 16,
                        // top: 10,
                        // flex: 1,
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontFamily: 'KaiseiHarunoUmi',
                      }}>
                      {text_lotno.lot_no}
                    </Text>
                  </ModalSelector>

                  <Icon
                    name="caret-down"
                    solid
                    size={26}
                    // color={colors.primary}
                    style={{marginLeft: 5}}
                    color={'#CDB04A'}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.paddingContent}>
            {user == null || user == '' ? (
              <Text>user not available</Text>
            ) : (
              <Categories style={{marginTop: 10}} />
            )}
          </View>

          <View style={{marginBottom: 10, flex: 1}}>
            <View style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 24,
                  // color: 'white',
                  fontFamily: 'DMSerifDisplay',
                }}>
                Our Bulletin
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text>News and Announcement</Text>
                {
                  newsannounce.length >= 6 ? (
                    <TouchableOpacity
                      onPress={() => goToMoreNewsAnnounce(newsannounce)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>
            <View style={{marginVertical: 10, marginLeft: 20}}>
              {loadNewsAnnounce ? (
                <ActivityIndicator />
              ) : (
                <SliderNews
                  data={newsannounceslice}
                  local={true}
                  // onPress={console.log('klik')}
                />
              )}
            </View>
          </View>

          <View style={{marginBottom: 20, flex: 1}}>
            <View style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 24,
                  // color: 'white',
                  fontFamily: 'DMSerifDisplay',
                }}>
                This Weekend
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text>Event And Restaurant</Text>
                {
                  eventresto.length >= 6 ? (
                    <TouchableOpacity
                      onPress={() => goToEventResto(eventresto)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>

            <View style={{marginVertical: 10, marginHorizontal: 10}}>
              <ScrollView horizontal>
                <MasonryList
                  data={imageEventResto}
                  style={{alignSelf: 'stretch'}}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                    alignSelf: 'stretch',
                    // alignSelf: 'flex-start',
                  }}
                  keyExtractor={(item, index) => index}
                  numColumns={3}
                  renderItem={CardItem}
                />
              </ScrollView>
            </View>
          </View>

          <View style={{marginBottom: 20, flex: 1}}>
            <View style={{marginLeft: 30, marginTop: 20, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: 24,
                  // color: 'white',
                  fontFamily: 'DMSerifDisplay',
                }}>
                Club And Facilities
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 20,
                }}>
                <Text>Check Our Promo Here</Text>
                {
                  promoclubfac.length >= 6 ? (
                    <TouchableOpacity
                      onPress={() => goToPromoClubFac(promoclubfac)}>
                      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                        <Text style={{marginHorizontal: 5, fontSize: 14}}>
                          More
                        </Text>
                        <Icon
                          name="arrow-right"
                          solid
                          size={16}
                          color={colors.primary}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null
                  // <Text>kurang dari 6</Text>
                }
              </View>
            </View>
            <View style={{marginVertical: 10, marginHorizontal: 10}}>
              <ScrollView horizontal>
                <FlatList
                  pagingEnabled={true}
                  decelerationRate="fast"
                  bounces={false}
                  data={imagePromoClubFac}
                  numColumns={3}
                  contentContainerStyle={{
                    paddingHorizontal: 10,
                  }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PreviewImageHome', {
                          images: item.pict,
                        })
                      }>
                      <View key={item.rowID} style={{}}>
                        <Image
                          source={{uri: item.pict}}
                          style={
                            ([styles.shadow],
                            {
                              height: 300,
                              margin: 5,
                              width: 220,
                              borderRadius: 10,
                            })
                          }
                          resizeMode={'cover'}></Image>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index}
                />
              </ScrollView>
            </View>
          </View>

          {/* {loading ? renderPlaceholder() : renderContent()} */}
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}> */}
      {renderContent()}
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Home;
