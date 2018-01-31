import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux'

const Card = ({ question }) => {
  return (
    <View>
      <Text>{question}</Text>
    </View>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;

    return {
      title: `${deckTitle} Deck`,
      headerRight:
        <TouchableOpacity onPress={() => navigation.navigate(
          'CardAdd',
          { deckTitle: deckTitle }
        )}>
          <Entypo name='plus' size={35} />
        </TouchableOpacity>
    }
  }

  render() {
    const { cards } = this.props;

    return (
      <View>
        <Text>{cards ? cards.length : 0} cards</Text>
        {cards && cards.map(({ question }) => (
          <Card key={question} question={question} />
        ))}
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { deckTitle } = props.navigation.state.params;

  return {
    cards: state[deckTitle].questions
  }
}

export default connect(mapStateToProps)(DeckDetail)
