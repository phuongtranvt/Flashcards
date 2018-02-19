import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Text,
  ViewPropTypes
} from 'react-native';
import * as colors from '../config/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import normalize from '../utils/normalizeText'

// This file use code taken from 'react native elemnts' and customize a bit to my needs.

const Button = props => {
  const {
    disabled,
    loading,
    loadingRight,
    activityIndicatorStyle,
    style,
    borderRadius,
    title,
    onPress,
    icon,
    iconComponent,
    secondary,
    secondary2,
    secondary3,
    primary1,
    primary2,
    backgroundColor,
    color,
    fontSize,
    underlayColor,
    raised,
    textStyle,
    large,
    iconRight,
    fontWeight,
    disabledStyle,
    disabledTextStyle,
    fontFamily,
    containerViewStyle,
    rounded,
    outline,
    transparent,
    textNumberOfLines,
    textEllipsizeMode,
    allowFontScaling,
    ...attributes
  } = props;
  let { Component, rightIcon, leftIcon } = props;

  let leftIconElement;
  if (!leftIcon && icon) {
    leftIcon = icon;
  }
  if (leftIcon) {
    let Icon;
    if (iconComponent) {
      Icon = iconComponent;
    } else if (!leftIcon.type) {
      Icon = MaterialIcon;
    }

    leftIconElement = (
      <Icon
        {...leftIcon}
        color={leftIcon.color || 'white'}
        size={leftIcon.size || (large ? 26 : 18)}
        style={[styles.icon, leftIcon.style && leftIcon.style]}
      />
    );
  }
  let rightIconElement;
  if (iconRight || rightIcon) {
    if (!rightIcon) {
      rightIcon = iconRight;
    }
    let Icon;
    if (iconComponent) {
      Icon = iconComponent;
    } else if (!rightIcon.type) {
      Icon = MaterialIcon;
    } else {
      Icon = getIconType(rightIcon.type);
    }
    rightIconElement = (
      <Icon
        {...rightIcon}
        color={rightIcon.color || 'white'}
        size={rightIcon.size || (large ? 26 : 18)}
        style={[styles.iconRight, rightIcon.style && rightIcon.style]}
      />
    );
  }
  let loadingElement;
  if (loading) {
    loadingElement = (
      <ActivityIndicator
        animating={true}
        style={[styles.activityIndicatorStyle, activityIndicatorStyle]}
        color={color || 'white'}
        size={(large && 'large') || 'small'}
      />
    );
  }
  if (!Component && Platform.OS === 'ios') {
    Component = TouchableHighlight;
  }
  if (!Component && Platform.OS === 'android') {
    Component = TouchableNativeFeedback;
  }
  if (!Component) {
    Component = TouchableHighlight;
  }

  if (Platform.OS === 'android' && (borderRadius && !attributes.background)) {
    if (Platform.Version >= 21) {
      attributes.background = TouchableNativeFeedback.Ripple(
        'ThemeAttrAndroid',
        true
      );
    } else {
      attributes.background = TouchableNativeFeedback.SelectableBackground();
    }
  }

  const baseFont = {
    color: (textStyle && textStyle.color) || color || stylesObject.text.color,
    size:
      (textStyle && textStyle.fontSize) ||
      fontSize ||
      (!large && stylesObject.smallFont.fontSize) ||
      stylesObject.text.fontSize,
  };

  let textOptions = {};
  if (textNumberOfLines) {
    textOptions.numberOfLines = textNumberOfLines;
    if (textEllipsizeMode) {
      textOptions.ellipsizeMode = textEllipsizeMode;
    }
  }

  return (
    <View
      style={[
        styles.container,
        raised && styles.raised,
        containerViewStyle,
        borderRadius && { borderRadius },
      ]}
    >
      <Component
        {...attributes}
        underlayColor={underlayColor || 'transparent'}
        onPress={onPress || log}
        disabled={disabled || false}
      >
        <View
          pointerEvents="box-only"
          style={[
            styles.button,
            secondary && { backgroundColor: colors.secondary },
            secondary2 && { backgroundColor: colors.secondary2 },
            secondary3 && { backgroundColor: colors.secondary3 },
            primary1 && { backgroundColor: colors.primary1 },
            primary2 && { backgroundColor: colors.primary2 },
            backgroundColor && { backgroundColor: backgroundColor },
            borderRadius && { borderRadius },
            !large && styles.small,
            rounded && {
              borderRadius: baseFont.size * 3.8,
              paddingHorizontal: !large
                ? stylesObject.small.padding * 1.5
                : stylesObject.button.padding * 1.5,
            },
            outline && {
              borderWidth: 1,
              backgroundColor: 'transparent',
              borderColor: baseFont.color,
            },
            transparent && {
              borderWidth: 0,
              backgroundColor: 'transparent',
            },
            style && style,
            disabled && { backgroundColor: colors.disabled },
            disabled && disabledStyle,
          ]}
        >
          {(icon && !iconRight) || leftIconElement ? leftIconElement : null}
          {loading && !loadingRight && loadingElement}
          <Text
            style={[
              styles.text,
              color && { color },
              !large && styles.smallFont,
              fontSize && { fontSize },
              textStyle && textStyle,
              fontWeight && { fontWeight },
              fontFamily && { fontFamily },
              disabled && disabledTextStyle,
            ]}
            {...textOptions}
            allowFontScaling={allowFontScaling}
          >
            {title}
          </Text>
          {loading && loadingRight && loadingElement}
          {(icon && iconRight) || rightIconElement ? rightIconElement : null}
        </View>
      </Component>
    </View>
  );
};

Button.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  onPress: PropTypes.any,
  icon: PropTypes.object,
  leftIcon: PropTypes.object,
  rightIcon: PropTypes.object,
  iconRight: PropTypes.object,
  iconComponent: PropTypes.any,
  secondary: PropTypes.bool,
  secondary2: PropTypes.bool,
  secondary3: PropTypes.bool,
  primary1: PropTypes.bool,
  primary2: PropTypes.bool,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.any,
  underlayColor: PropTypes.string,
  raised: PropTypes.bool,
  textStyle: Text.propTypes.style,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  activityIndicatorStyle: ViewPropTypes.style,
  loadingRight: PropTypes.bool,
  Component: PropTypes.any,
  borderRadius: PropTypes.number,
  large: PropTypes.bool,
  fontWeight: PropTypes.string,
  disabledStyle: ViewPropTypes.style,
  disabledTextStyle: Text.propTypes.style,
  fontFamily: PropTypes.string,
  containerViewStyle: ViewPropTypes.style,
  rounded: PropTypes.bool,
  outline: PropTypes.bool,
  transparent: PropTypes.bool,
  allowFontScaling: PropTypes.bool,
  textNumberOfLines: PropTypes.number,
  textEllipsizeMode: PropTypes.string,
};

const stylesObject = {
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    padding: 25,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: normalize(16),
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  small: {
    padding: 10,
  },
  smallFont: {
    fontSize: normalize(14),
  },
  activityIndicatorStyle: {
    marginHorizontal: 10,
    height: 0,
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 2,
      },
    }),
  },
};

const styles = StyleSheet.create(stylesObject);

export default Button;
