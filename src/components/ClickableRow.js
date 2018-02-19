import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Text,
} from 'react-native';
import fonts from '../config/fonts';
import { grey1 } from '../config/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';

// This file use code taken from 'react native elemnts' and customize a bit to my needs.

const Row = props => {
  const {
    title,
    center,
    right,
    style,
    textStyle,
    onPress,
    onLongPress,
    onLongIconPress,
    children,
    icon,
    size,
    ...attributes,
  } = props;

  let Icon = icon;

  return (
    <TouchableOpacity
      {...attributes}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.container, style && style]}
    >
      <View
        style={[
          styles.wrapper,
          right && { justifyContent: 'flex-end' },
          center && { justifyContent: 'center' },
        ]}
      >

      {icon && <Icon size={size || 24} />}

      {React.isValidElement(title)
        ? title
        : <Text
            style={[
              styles.text,
              textStyle && textStyle
            ]}
          >
            {title}
          </Text>}

        {children && children}

      </View>
    </TouchableOpacity>
  );
};

Row.defaultProps = {
  right: false,
  center: false,
};

Row.propTypes = {
  checked: PropTypes.bool,
  iconRight: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 12,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: grey1,
  },
});

export default Row;
