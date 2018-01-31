import React from 'react'
import { View, Text } from 'react-native'

const List = (props) => {
  const { children, ...rest } = props;

  return (
    <View {...rest} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {children}
    </View>
  )
}

export default List;
