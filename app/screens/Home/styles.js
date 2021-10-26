import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 24,
  },
  topicsView: {
    marginVertical: 24,
  },
  title: {marginBottom: 5},
  notyHeader: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    right: 0,
  },
  container: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  contentHeader: {paddingLeft: 8, flex: 1},
  notyHeader: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    right: 0,
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 50,
    borderColor: BaseColor.grayColor,
    borderWidth: 2,
  },
  titleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  headerCard: {
    borderRadius: 10,
    height: 108,
    width: '100%',
    marginVertical: 15,
    backgroundColor: BaseColor.fieldColor,
    justifyContent: 'center',
    padding: 15,
  },
  headerCardPrimary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCardCenter: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: 'auto',
    marginVertical: 0,
  },
  paddingContent: {
    paddingHorizontal: 20,
  },
});
