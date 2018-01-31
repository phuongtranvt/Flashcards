import React, { Component } from 'react'
import { View, Text, Picker, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'
import List from '../../../src/components/List'
import { Button } from 'react-native-elements'
import { getDecksFromStorage } from '../../services/LocalStorageAPI'
import { receiveDecks } from '../../data/actions'

class QuizSelectDeck extends Component {
  state = {
    decksSelected: {},
  }

  componentDidMount() {
    //Get data from AsyncStorage and merge to Redux store
    getDecksFromStorage()
      .then(results => this.props.dispatch(receiveDecks(results)))

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.decks !== nextProps.decks) {
      const { decks } = nextProps;
      const { decksSelected } = this.state;

      decks.forEach(deck => decksSelected[deck] = false)

    }
  }

  render() {
    const { decksSelected } = this.state;
    const { decks, navigation } = this.props;


    // TODO: delete List components
    return (
      <View>
        {decks && decks.map((deck) => (
          <List key={deck}>
            <CheckBox title={deck} checked={decksSelected[deck]}
              onPress={() => this.toggleDeckSelected(deck)}/>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckTitle: deck }
            )}>
              <MaterialIcons name='keyboard-arrow-right' size={30}/>
            </TouchableOpacity>
          </List>
        ))}
        <Button title='Next' onPress={() => navigation.navigate(
          'QuizSelectQuestionCount'
        )}/>
      </View>
    )
  }

  toggleDeckSelected = (selectedDeck) => {
    console.log('toogle', this.state)
    this.setState(preState => ({
      decksSelected: {
        ...preState.decksSelected,
        [selectedDeck]: !preState.decksSelected[selectedDeck]
      }
    }))
  }
}

const mapStateToProps = (state) => {
  return {
    decks: Object.keys(state)
  }
}

export default connect(mapStateToProps)(QuizSelectDeck)
