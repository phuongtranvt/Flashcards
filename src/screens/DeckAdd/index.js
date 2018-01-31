import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { addDeck, receiveDecks } from '../../data/actions'
import { addDeckToStorage } from '../../services/LocalStorageAPI'

class DeckAdd extends Component {
  state = {
    title: null,
  }
  submit = () => {
    debugger;

    const { title } = this.state;

    // deck: { title: "Title" }
    const deck = {
      title
    }

    // Update redux
    this.props.dispatch(addDeck(deck))

    // Reset setState
    this.setState({ title: null })

    // Update Async Storage
    addDeckToStorage(deck)
  }

  render() {
    const { title } = this.state;
    return (
      <View style={{flex: 1}}>
        <FormLabel>Deck Name</FormLabel>
        <FormInput
          placeholder="Please enter new Deck Name"
          value={title}
          onChangeText={text => this.setState({ title: text })}/>
        <Button title='SUBMIT' onPress={this.submit}/>
      </View>
    )
  }
}

export default connect()(DeckAdd)
