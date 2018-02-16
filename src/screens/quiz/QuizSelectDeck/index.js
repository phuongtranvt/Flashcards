import React, { Component } from 'react'
import { View, Picker, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { fetchDataFromStorage } from '../../../services/LocalStorageAPI'
import { receiveDecks, selectDecks } from '../../../data/quiz/actions'
import { Entypo } from '@expo/vector-icons'
import TextButton from '../../../../src/components/TextButton'
import CheckBoxRow from '../../../../src/components/ClickableCheckBoxRow'
import Text from '../../../../src/components/Text'
import Button from '../../../../src/components/Button'
// import {Button} from 'react-native-elements'
//import {Button } from 'native-base';
import * as colors from '../../../config/colors';

class QuizSelectDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }

  state = {
    selectedDecks: [],
  }

  componentDidMount() {
    //Get data from AsyncStorage and merge to Redux store
    fetchDataFromStorage()
      .then(results => this.props.receiveDecks(results))

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.decks !== nextProps.decks) {
      const { decks } = nextProps;
      const { selectedDecks } = this.state;

      this.setState({ selectedDecks: nextProps.decks.map(deck => ({
        title: deck.title,
        questions: deck.questions,
        selected: false,
       }))})

    }
  }

  handleNext = () => {
    const { selectDecks, navigation } = this.props;

    selectDecks(this.state.selectedDecks
      .filter(deck => deck.selected)
      .map(d => d.title))

    navigation.navigate(
      'QuizSelectQuestionCount'
    )
  }

  render() {
    const { selectedDecks } = this.state;
    const { decks, navigation } = this.props;
    const isNextBtnEnable = selectedDecks.some(d => d.selected);

    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={{padding: 40, backgroundColor: colors.blue}}>
          <Text h3 bold style={styles.title}>Select deck(s) to start Quiz!</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <ScrollView>
          {selectedDecks && selectedDecks.map((deck) => (
              <CheckBoxRow
                style={{margin: 0}}
                key={deck.title}
                checked={deck.selected}
                onPress={() => this.toggleDeckSelected(deck)}
              >
                <View style={styles.deckContainer}>
                  <View>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.deckCardCount}>{deck.questions} cards</Text>
                  </View>
                  <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    { deckTitle: deck.title }
                  )}>
                    <MaterialIcons name='keyboard-arrow-right' size={30} color={colors.icon}/>
                  </TouchableOpacity>
                </View>
              </CheckBoxRow>
            ))}
          </ScrollView>

          <Button
            disabled={!isNextBtnEnable}
            style={{marginBottom: 20, marginTop: 20}}
            title='NEXT'
            onPress={this.handleNext}/>
        </View>

      </View>
    )
  }

  toggleDeckSelected = (toggleDeck) => {
    console.log('toogle', this.state)

    this.setState(preState => ({
      selectedDecks: preState.selectedDecks.map(deck => (
        toggleDeck.title === deck.title
        ? {
            ...deck,
            selected: !deck.selected
          }
        : deck
      ))
    }))
  }

}

const mapStateToProps = ({ decks }) => {
  return {
    decks: Object.values(decks).map(deck => (
      {
        title: deck.title,
        questions: deck.questions ? deck.questions.length : 0
      }
    ))
  }
}

const mapDispatchToProps = {receiveDecks, selectDecks}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: colors.white
  },
  deckContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deckTitle: {
    fontWeight: 'bold',
    fontSize: 17
  },
  deckCardCount: {
    color: colors.grey3,
    fontSize: 14,
    marginTop: 4
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QuizSelectDeck)
