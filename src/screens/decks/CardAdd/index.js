import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FormInput } from 'react-native-elements'
import { addCardToDeck } from '../../../data/decks/actions'
import { connect } from 'react-redux'
import { addCardToStorage } from '../../../services/LocalStorageAPI'
import { Ionicons } from '@expo/vector-icons'
import Button from '../../../components/Button'
import TextButton from '../../../components/TextButton'
import Text from '../../../components/Text'
import { white } from '../../../config/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Toast } from 'native-base'

class CardAdd extends Component {
  state = {
    question: null,
    answer: null,
    isInputValidated: false,
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Add New Card',
      headerLeft:
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons style={{marginLeft: 10}} name="close" size={30} color={white}/>
        </TouchableOpacity>,
    }
  }

  render() {
    const { question, answer, isInputValidated } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={80}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Question</Text>
          <FormInput
            value={question}
            onChangeText={this.handleInputChange('question')}
            placeholder="Please enter question"
          />
          <Text style={[styles.label, {marginTop: 30}]}>Answer</Text>
          <FormInput
            value={answer}
            onChangeText={this.handleInputChange('answer')}
            placeholder="Please enter answer"
          />
        </View>
        <Button
          style={{marginBottom: 20}}
          disabled={!isInputValidated}
          title='SUBMIT'
          onPress={this.submitAddCard}/>
      </KeyboardAvoidingView>
    )
  }

  submitAddCard = () => {
    const { deckTitle } = this.props.navigation.state.params;

    // Update redux
    // card: { "Deck Name" { question: "Content", answer: "AnswerContent"}}
    const card = {
        question: this.state.question,
        answer: this.state.answer,
      }

    this.props.addCardToDeck(card, deckTitle)

    // Write to AsyncStorage
    addCardToStorage(card, deckTitle)

    // Reset state
    this.setState({
      question: null,
      answer: null,
      isInputValidated: false,
    })

    Toast.show({
      text: "Card added successfully",
      position: 'top',
    })

  }

  handleInputChange = field => inputText => {
    const { question, answer } = this.state;
    let isValidated = false;

    if (field === 'question') {
      isValidated = inputText && answer && answer.length > 0
    } else if (field === 'answer') {
      isValidated = inputText && question && question.length > 0
    }

    this.setState(
      {
        [field]: inputText,
        isInputValidated: isValidated,
      });
  }
}

const mapDispatchToProps = {addCardToDeck}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 3
  }
})

export default connect(null, mapDispatchToProps)(CardAdd);
