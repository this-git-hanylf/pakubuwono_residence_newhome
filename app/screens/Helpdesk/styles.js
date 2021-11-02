import {StyleSheet, Dimensions, PixelRatio} from 'react-native';
import {BaseColor} from '@config';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  contain: {
    flex: 1,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  subWrap: {
    marginVertical: 20,
  },
  subWrap2: {
    marginVertical: 10,
  },
  wrap: {
    marginHorizontal: 10,
    marginTop: 16,
    flex: 1,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 20,
    paddingTop: 20,
  },
  textArea: {
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
  },
  pickerWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2DFE4',
    backgroundColor: '#F6F6F6',
  },
  sel: {
    width: deviceWidth - 100,
    marginVertical: 10,
    paddingVertical: 10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: null,
  },
  pickerWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E2DFE4',
    backgroundColor: '#F6F6F6',
  },
  avatar: {
    width: deviceWidth - 100,
    height: 200,
    borderRadius: 5,
  },
  avatarContainer: {
    width: deviceWidth - 100,
    marginVertical: 10,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
  },
  iconRemove: {
    // backgroundColor: '#EE6B60',
    backgroundColor: '#fff',
    // color: '#ff1744',
    position: 'absolute',
    borderRadius: 50,
    padding: 5,
    right: 0,
    top: 0,
  },
});
