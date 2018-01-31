import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { addCardToDeck } from '../../data/actions'
import { connect } from 'react-redux'
import { addCardToStorage } from '../../services/LocalStorageAPI'

class CardAdd extends Component {
  state = {
    question: null,
    answer: null,
  }

  render() {
    const { question, answer } = this.state;

    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput
          value={question}
          onChangeText={(text) => this.setState({ question: text })}
          palceholder="Please enter question"
        />
        <FormLabel>Answer</FormLabel>
        <FormInput
          value={answer}
          onChangeText={(text) => this.setState({ answer: text })}
          palceholder="Please enter answer"
        />
        <Button title="SUBMIT" onPress={this.submit}/>
      </View>
    )
  }

  submit = () => {
    debugger;
    const { deckTitle } = this.props.navigation.state.params;

    // Update redux
    // card: { "Deck Name" { question: "Content", answer: "AnswerContent"}}
    const card = {
        question: this.state.question,
        answer: this.state.answer,
      }

    this.props.dispatch(addCardToDeck(card, deckTitle))

    // Reset state
    this.setState({
      question: null,
      answer: null
    })

    // Write to AsyncStorage
    addCardToStorage(card, deckTitle)
  }
}

export default connect()(CardAdd);
