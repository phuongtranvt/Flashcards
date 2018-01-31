import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDecksFromStorage, removeData } from '../../services/LocalStorageAPI'
import { receiveDecks } from '../../data/actions'
import { connect } from 'react-redux'

class QuizIntro extends Component {
  componentDidMount() {
    // Get data from AsyncStorage and merge to Redux store
    getDecksFromStorage()
      .then(results => this.props.dispatch(receiveDecks(results)))

  }

  render() {
    return (
      <View>
        <Text>QuizIntro</Text>
      </View>
    )
  }
}

export default connect()(QuizIntro)
