import React, { Component } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView, withNavigation } from 'react-navigation';
import { WebView } from 'react-native-webview';

class BrandsWebview extends Component {
  _didFocusSubscription;

  _willBlurSubscription;

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Brands Page'),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      canGoBack: false,
      // canGoForward: false,
    };

    this.webview = React.createRef();

    if (props.os === 'android') {
      this._didFocusSubscription = props.navigation.addListener(
        'didFocus',
        () =>
          BackHandler.addEventListener(
            'hardwareBackPress',
            this.brandsBackButtonCallback,
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
          this.brandsBackButtonCallback,
        ),
      );
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { uri, canGoBack, canGoForward } = this.state;

  //   return (
  //     uri !== nextState.uri ||
  //     canGoBack !== nextState.canGoBack ||
  //     canGoForward !== nextState.canGoForward
  //   );
  // }

  componentWillUnmount() {
    const { os } = this.props;

    if (os === 'android') {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
    }
  }

  brandsBackButtonCallback = () => {
    const { canGoBack } = this.state;
    const { navigation } = this.props;

    if (canGoBack) {
      this.onGoBack();
    } else {
      navigation.navigate('Setting');
    }

    return true;
  };

  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack,
      // canGoForward: navState.canGoForward,
    });
  };

  onGoBack = () => {
    this.webview.current.goBack();
  };

  onGoForward = () => {
    this.webview.current.goForward();
  };

  render() {
    const { brandUri } = this.props;
    const { webview, onNavigationStateChange } = this;

    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: brandUri }}
          ref={webview}
          onNavigationStateChange={onNavigationStateChange}
          allowsBackForwardNavigationGestures
          onLoadProgress={({ nativeEvent }) => {
            this.loadingProgress = nativeEvent.progress;
          }}
        />
        {/* <BottomMenu
          os={os}
          navigation={navigation}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
          onGoHome={onGoHome}
          onGoCart={onGoCart}
          onGoMyPage={onGoMyPage}
        /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

const mapStateToProps = state => ({
  os: state.initialize.os,
  brandUri: state.browse.brandUri,
});

export default connect(mapStateToProps)(withNavigation(BrandsWebview));
