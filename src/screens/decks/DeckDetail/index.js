import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { goHome } from '../../../utils/helpers'
import { lightBlue, white, grey4, grey5, greyOutline } from '../../../config/colors'
import Text from '../../../components/Text'
import TextButton from '../../../components/TextButton'
import Button from '../../../components/Button'
import { selectNoOfQuestion, selectDecks } from '../../../data/quiz/actions'

const QuestionCard = ({ question }) => {
  return (
    <View style={styles.questionCardContainer}>
      <Text>{question}</Text>
    </View>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;

    return {
      title: `${deckTitle} Deck`,
      headerLeft:
        <TouchableOpacity onPress={() => goHome(navigation)}>
          <MaterialIcons style={{marginLeft: 10}} name="close" size={30} color={white}/>
        </TouchableOpacity>,

      headerRight:
        <TextButton onPress={() => navigation.navigate(
          'CardAdd',
          { deckTitle: deckTitle }
        )}>Add Card</TextButton>
    }
  }

  startQuiz = () => {
    const { selectDecks, selectNoOfQuestion, navigation, cards } = this.props;

    // Update Redux store
    selectDecks([ navigation.state.params.deckTitle ])
    selectNoOfQuestion(cards.length);

    navigation.navigate(
      'QuizPlay'
    )
  }

  render() {
    const { cards } = this.props;

    return (
      <View style={{flex: 1, backgroundColor: lightBlue, }}>
        <View style={styles.deck}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={styles.cardCount}>{cards ? cards.length : 0} cards</Text>
            { cards && (
              <Button
                style={styles.startQuizBtn}
                containerViewStyle={{marginRight: 5}}
                title='START QUIZ'
                onPress={this.startQuiz}
              />
            )}
          </View>

          <FlatList
            data={cards}
            renderItem={({item}) => (
              <QuestionCard question={item.question}/>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({decks}, props) => {
  const { deckTitle } = props.navigation.state.params;
  return {
    cards: decks[deckTitle].questions
  }
}

const mapDispatchToProps = { selectNoOfQuestion, selectDecks }

const styles = StyleSheet.create({
  questionCardContainer: {
    padding: 12,
    backgroundColor: white,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
    borderColor: greyOutline
  },
  deck: {
    backgroundColor: grey5,
    margin: 10,
    marginTop: 15,
    borderColor: greyOutline,
    borderRadius: 3
  },
  cardCount: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold'
  },
  startQuizBtn: {
    marginRight: 0,
    marginTop: 5,
    marginBottom: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)
