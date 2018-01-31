import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'


import { Entypo } from '@expo/vector-icons'

class DeckList extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      title: `Deck List`,
      headerRight:
        <TouchableOpacity onPress={() => navigation.navigate(
          'DeckAdd',
        )}>
          <Entypo name='plus' size={35} />
        </TouchableOpacity>
    }
  }


  render() {
    const { decks } = this.props;
    debugger;
    return (
      <View>
        {decks && decks.map(({ title, cardNo }) => (
          <TouchableOpacity
            key={title}
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckTitle: title }
            )}>
            <Text>{title}</Text>
            <Text>{cardNo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    decks: Object.values(state).map(deck => ({
      title: deck.title,
      cardNo: deck.questions ? deck.questions.length : 0
    }))
  }
}

export default connect(mapStateToProps)(DeckList)
