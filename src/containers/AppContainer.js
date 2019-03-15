import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform } from 'react-native';
import * as initializeActions from '../modules/initialize';

import WebviewContainer from './WebviewContainer';

class AppContainer extends Component {
  componentDidMount() {
    // const {
    //   InitializeActions: { setPlatform },
    // } = this.props;
    // setPlatform(Platform.OS);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const { os } = this.props;

    return (
      <>
        <WebviewContainer os={os} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  os: state.initialize.os,
});

// const mapDispatchToProps = dispatch => ({
//   InitializeActions: bindActionCreators(initializeActions, dispatch),
// });

export default connect(mapStateToProps)(AppContainer);
