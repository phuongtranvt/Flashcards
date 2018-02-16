import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { greyOutline, white } from '../config/colors';

const List = ({ children, style={}, ...attributes}) => {
  return (
    <View
      {...attributes}
      style={[styles.listContainer, style]}
    >
      {children}
    </View>
  );
};

List.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  listContainer: {
    borderColor: greyOutline,
    backgroundColor: white,
  },
});

export default List;
