import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import fonts from '../config/fonts';
import { grey1 } from '../config/colors'

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        ...fonts.android.regular,
      },
    }),
  },
  bold: {
    ...Platform.select({
      android: {
        ...fonts.android.bold,
      },
      ios: {
        fontWeight: 'bold'
      }
    }),
  },
});

const TextElement = props => {
  const { style = {}, children, h1, h2, h3, h4, bold, ...rest } = props;

  return (
    <Text
      style={[
        styles.text,
        h1 && { fontSize: 40 },
        h2 && { fontSize: 34 },
        h3 && { fontSize: 28 },
        h4 && { fontSize: 22 },
        h1 && styles.bold,
        h2 && styles.bold,
        h3 && styles.bold,
        h4 && styles.bold,
        bold && styles.bold,
        style
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

TextElement.propTypes = {
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  children: PropTypes.any,
};

export default TextElement;
