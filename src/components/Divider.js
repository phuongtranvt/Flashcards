import React from 'react';
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import { grey5 } from '../config/colors';

const Divider = ({ style={} }) =>
  <View style={[styles.container, style && style]} />;

Divider.propTypes = {
  style: ViewPropTypes.style,
};

styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: grey5,
  },
});

export default Divider;
