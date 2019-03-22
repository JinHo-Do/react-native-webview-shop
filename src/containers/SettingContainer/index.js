import React, { Component } from 'react';
import { BackHandler, Linking, Alert, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import CookieManager from 'react-native-cookies';

import * as browseActions from '../../modules/browse';

import SettingScreen from '../../components/SettingScreen';

class SettingContainer extends Component {
  _didFocusSubscription;

  _willBlurSubscription;

  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
    };

    if (props.os === 'android') {
      this._didFocusSubscription = props.navigation.addListener(
        'didFocus',
        () =>
          BackHandler.addEventListener(
            'hardwareBackPress',
            this.onNavigateBack,
          ),
      );
    }
  }

  componentDidMount() {
    const { os, navigation } = this.props;

    CookieManager.getAll().then(res => {
      console.log('CookieManager.getAll =>', res);
    });

    if (os === 'android') {
      this._willBlurSubscription = navigation.addListener('willBlur', () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onNavigateBack,
        ),
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { switchValue } = this.state;
    return switchValue !== nextState.switchValue;
  }

  componentWillUnmount() {
    const { os } = this.props;

    if (os === 'android') {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
    }
  }

  onNavigateBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');

    return true;
  };

  onCacheClear = () => {
    CookieManager.clearAll().then(res => {
      console.log('res: ', res);
      Alert.alert('캐시 초기화가 완료되었습니다.');
    });
  };

  onCallPress = () => {
    const { os } = this.props;
    const phone = '025336148';
    let phoneNumber = phone;

    if (os !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('02-533-6148');
          return null;
        }
        return Linking.openURL(phoneNumber);
      })
      .catch(err => console.log(err));
  };

  onValueChange = value => {
    this.setState({ switchValue: value });
  };

  onPressBrand = (uri, title) => {
    const {
      navigation,
      BrowseActions: { setUri },
    } = this.props;

    setUri(uri);
    navigation.navigate('Brands', {
      uri,
      title,
    });
  };

  onOpenInstagram = url => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`);
      }
      return Linking.openURL(url);
    });
  };

  render() {
    const { switchValue } = this.state;
    const {
      onCallPress,
      onValueChange,
      onPressBrand,
      onOpenInstagram,
      // onCacheClear,
    } = this;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <SettingScreen
          switchValue={switchValue}
          onCallPress={onCallPress}
          onValueChange={onValueChange}
          onPressBrand={onPressBrand}
          onOpenInstagram={onOpenInstagram}
          onCacheClear={onCacheClear}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  os: state.initialize.os,
});

const mapDispatchToProps = dispatch => ({
  BrowseActions: bindActionCreators(browseActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SettingContainer));
