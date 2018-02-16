import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import Text from '../../../components/Text'
import { FormInput, FormValidationMessage } from 'react-native-elements'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import { addDeck } from '../../../data/decks/actions'
import { addDeckToStorage } from '../../../services/LocalStorageAPI'
import { white, grey1 } from '../../../config/colors'

class DeckAdd extends Component {
  state = {
    title: null,
    error: null,
  }

  canSubmit = () => {
    const { title } = this.state;
    const { decksTitle } = this.props;
    debugger;
    return title.length !== 0 && !decksTitle.some(item => item === title )
  }

  submit = () => {
    const { title } = this.state;

    if (!this.canSubmit()) {
      this.setState({ error: true });
      return;
    }

    // deck: { title: "Title" }
    const deck = { title }

    // Update redux
    this.props.addDeck(deck)

    // Reset setState
    this.setState({ title: null })

    // Update Async Storage
    addDeckToStorage(deck)

    // Go to Add Question screen
    this.props.navigation.navigate(
      'DeckDetail',
      { deckTitle: title }
    )
  }
  render() {
    const { title, error } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.deckName}>Deck Name</Text>
          <FormInput
            inputStyle={{fontSize: 17}}
            placeholder="Please enter new Deck Name"
            value={title}
            onChangeText={text => this.setState({ title: text })}/>
          {error &&
            <FormValidationMessage>
              Deck name must be unique and not empty
            </FormValidationMessage>
          }
        </View>

        <Button style={{marginBottom: 20}} title='SUBMIT' onPress={this.submit}/>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({ decks }) => ({
  decksTitle: Object.keys(decks)
})

const mapDispatchToProps = {addDeck}

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  deckName: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginBottom: 3
  }
})
