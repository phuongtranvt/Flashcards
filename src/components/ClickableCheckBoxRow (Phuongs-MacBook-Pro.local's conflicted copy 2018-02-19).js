import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Text as NativeText,
} from 'react-native';
import fonts from '../config/fonts';
import { grey1 } from '../config/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Row from './ClickableRow'
//heeh
const CheckBoxRow = props => {
  const {
    checked,
    checkedIcon,
    uncheckedIcon,
    checkedColor,
    uncheckedColor,
    checkedTitle,
    children,
    icon,
    size,
    ...attributes,
  } = props;

  let Icon = FAIcon;

  let iconName = uncheckedIcon;
  if (checked) {
    iconName = checkedIcon;
  }
  return (
    <Row
      {...attributes}
      icon={() => <Icon
        color={checked ? checkedColor : uncheckedColor}
        name={iconName}
        size={size || 24}
      />}
    >
      {children}
    </Row>
  );
};

CheckBoxRow.defaultProps = {
  checked: false,
  iconRight: false,
  right: false,
  center: false,
  checkedColor: 'green',
  uncheckedColor: '#bfbfbf',
  checkedIcon: 'check-square-o',
  uncheckedIcon: 'square-o',
  size: 24,
};

CheckBoxRow.propTypes = {
  component: PropTypes.any,
  checked: PropTypes.bool,
  iconRight: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  center: PropTypes.bool,
  right: PropTypes.bool,
  textStyle: NativeText.propTypes.style,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  checkedIcon: PropTypes.string,
  uncheckedIcon: PropTypes.string,
  size: PropTypes.number,
  checkedColor: PropTypes.string,
  uncheckedColor: PropTypes.string,
  checkedTitle: PropTypes.string,
  onIconPress: PropTypes.func,
  onLongIconPress: PropTypes.func,
  fontFamily: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    // margin: 5,
    // marginLeft: 10,
    // marginRight: 10,
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 12,
    //borderRadius: 3,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    color: grey1,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        ...fonts.android.bold,
      },
    }),
  },
});

export default CheckBoxRow;
