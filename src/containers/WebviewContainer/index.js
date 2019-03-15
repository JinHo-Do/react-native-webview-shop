import React, { Component } from 'react';
import { StyleSheet, BackHandler, Alert, StatusBar } from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';
import { SHOP } from 'react-native-dotenv';
import BottomMenu from '../../components/BottomMenu';

class Webview extends Component {
  _didFocusSubscription;

  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      uri: SHOP,
      canGoBack: false,
      canGoForward: false,
    };

    this.webview = React.createRef();

    if (props.os === 'android') {
      this._didFocusSubscription = props.navigation.addListener(
        'didFocus',
        () =>
          BackHandler.addEventListener(
            'hardwareBackPress',
            this.androidBackButtonCallback,
          ),
      );
    }
  }

  componentDidMount() {
    const { os, navigation } = this.props;

    if (os === 'android') {
      this._willBlurSubscription = navigation.addListener('willBlur', () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.androidBackButtonCallback,
        ),
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { uri, canGoBack, canGoForward } = this.state;

    return (
      uri !== nextState.uri ||
      canGoBack !== nextState.canGoBack ||
      canGoForward !== nextState.canGoForward
    );
  }

  componentWillUnmount() {
    const { os } = this.props;
    if (os === 'android') {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
    }
  }

  androidBackButtonCallback = () => {
    const { canGoBack } = this.state;

    if (canGoBack) {
      this.onGoBack();
    } else {
      this.exitAlert();
    }

    return true;
  };

  handleAndroidBackButton = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { canGoBack } = this.state;

      if (canGoBack) {
        this.onGoBack();
      } else {
        this.exitAlert();
      }

      return true;
    });
  };

  removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {});
  };

  exitAlert = () => {
    Alert.alert('종료', '정말 종료하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: () => BackHandler.exitApp() },
    ]);
  };

  onNavigationStateChange = navState => {
    const { url, canGoBack, canGoForward } = navState;

    /**
     * TODO:
     * - check android login
     */

    // if (url === `${SHOP}exec/front/Member/login/`) {
    //   console.log('as;ldfjasl;dfjsdl;j');
    //   console.log('navState: ', navState);
    //   // const newURL = SHOP;
    //   const newURL = `${SHOP}myshop/index.html`;
    //   const redirectTo = `window.location = "${newURL}"`;
    //   this.webview.current.injectJavaScript(redirectTo);
    // } else {
    this.setState({
      uri: url,
      canGoBack,
      canGoForward,
    });
    // }
  };

  onGoBack = () => {
    this.webview.current.goBack();
  };

  onGoForward = () => {
    this.webview.current.goForward();
  };

  onGoHome = () => {
    this.setState({
      uri: SHOP,
    });
  };

  onGoCart = () => {
    this.setState({
      uri: `${SHOP}order/basket.html`,
    });
  };

  onGoMyPage = () => {
    this.setState({
      uri: `${SHOP}myshop/index.html`,
    });
  };

  render() {
    const { uri, canGoBack, canGoForward } = this.state;
    const { navigation } = this.props;
    const {
      webview,
      onGoBack,
      onGoForward,
      onGoHome,
      onGoCart,
      onGoMyPage,
      onNavigationStateChange,
    } = this;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <WebView
          source={{ uri }}
          ref={webview}
          onNavigationStateChange={onNavigationStateChange}
          allowsBackForwardNavigationGestures
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
        <BottomMenu
          navigation={navigation}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
          onGoHome={onGoHome}
          onGoCart={onGoCart}
          onGoMyPage={onGoMyPage}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
    backgroundColor: '#000000',
  },
});

export default withNavigation(Webview);
