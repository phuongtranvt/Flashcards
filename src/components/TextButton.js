import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { white } from '../config/colors'

export default function TextButton({children, bold, onPress, style = {}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, bold && {fontWeight: 'bold'}, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginRight: 10,
    color: white,
    fontSize: 16
  }
})
