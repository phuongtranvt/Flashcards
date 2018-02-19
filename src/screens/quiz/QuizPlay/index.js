import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { createQuizData } from '../../../utils/helpers'
import TextButton from '../../../components/TextButton'
import {createSelector} from 'reselect';
import { Ionicons } from '@expo/vector-icons'
import { goHome } from '../../../utils/helpers'
import Button from '../../../../src/components/Button'
import { darkBlue, white, grey1, grey5, grey4, blue, pink, darkPink } from '../../../config/colors';
import fonts from '../../../config/fonts';

const Card = ({ cardInfo, content, toogleShowQuestion, buttonText }) => (
  <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text>{cardInfo}</Text>
        </View>
        <Text style={[styles.cardTitle]}>
          {content}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onPress={toogleShowQuestion}
        >
          <Ionicons name="ios-redo" size={30} color={grey1}/>
          <Text style={styles.cardQuestionBtn}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
  </View>
)


class QuizPlay extends Component {
  constructor() {
    super();

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => this.value = value)
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  noOfCorrectAnswer = 0;

  state = {
    cardIndex: 0,
    showQuestion: true,
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'Playing Quiz',
      headerLeft: null,
      headerRight:
        <TextButton onPress={() => {
          Alert.alert(
            'End Quiz',
            'Are you sure you want to end this Quiz?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () => goHome(navigation)}
            ]
          )
        }}>
          {params.endQuizBtnDisable ? '' : 'End Quiz'}</TextButton>
    }
  }

  componentWillMount() {
    if (!this.props.cards || !this.props.cards.length) {
      this.props.navigation.setParams({
        endQuizBtnDisable: true
      })
    }

    console.log('componentWillMount - QuizPlay')
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }
  }

  toogleShowQuestion = () => {
    this.setState(preState => ({ showQuestion: !preState.showQuestion }))
    this.flipCard();
  }

  render() {
    const { cards, incrementCorrectAnswer, navigation } = this.props;
    const { cardIndex, showQuestion, emptyDeck } = this.state;

    if (!cards || !cards.length) {
      return (
        <View style={styles.emptyDeck}>
          <Text h4> There is no question in this deck</Text>
          <Button style={{marginTop: 30}}
            title='Select different decks'
            onPress={() => navigation.navigate('QuizSelectDeck')}
          />
        </View>
      )
    }

    return (
      <View  style={styles.container}>
        <View style={{flex: 1}}>
        </View>
        <View style={{flex: 3}}>
          {showQuestion
            ? <Animated.View style={{flex: 1, transform: [{rotateY: this.frontInterpolate}]}}>
                <Card
                  content={cards[cardIndex].question}
                  cardInfo={`${cardIndex + 1}/${cards.length}`}
                  toogleShowQuestion={this.toogleShowQuestion}
                  buttonText={'Show Answer'}
                />
              </Animated.View>
            : <Animated.View style={{flex: 1, transform: [{rotateY: this.backInterpolate}]}}>
              <Card
                content={cards[cardIndex].answer}
                cardInfo={`${cardIndex + 1}/${cards.length}`}
                toogleShowQuestion={this.toogleShowQuestion}
                buttonText={'Show Question'}
              />
            </Animated.View>
          }
        </View>

        <View style={{flex: 3, justifyContent: 'flex-end'}}>
          <Button style={{marginBottom: 15}} title='Correct' onPress={() => {
            this.noOfCorrectAnswer++;
            this.nextQuestion();
          }}/>
          <Button style={{backgroundColor: pink, marginBottom: 20}} textStyle={{color: darkPink}}  title='Incorrect' onPress={this.nextQuestion}/>
        </View>
      </View>
    )
  }

  nextQuestion = () => {
    debugger;
    const { cards, navigation } = this.props;

    if (this.state.cardIndex < cards.length - 1) {
      // Go to next card
       if (!this.state.showQuestion) {
         this.flipCard();
       }

       this.setState(preState => ({
         cardIndex: preState.cardIndex + 1,
         showQuestion: true,
        }))

    } else {
      // Finish quiz
      navigation.navigate(
        'QuizResult',
        { noOfCorrectAnswer: this.noOfCorrectAnswer }
      )
    }
  }
}

const getCacheQuizData = createSelector(
  state => state.decks,
  state => state.quiz.selectedDecks,
  state => state.quiz.noOfQuestion,
  (decks, selectedDecks, noOfQuestion) => {
    return createQuizData(decks, selectedDecks, noOfQuestion);
  }
)

const mapStateToProps = (state, {navigation}) => ({
  cards: (navigation.state.params && navigation.state.params.restart)
          ? createQuizData(state.decks, state.quiz.selectedDecks, state.quiz.noOfQuestion)
          : getCacheQuizData(state)
})


export default connect(mapStateToProps)(QuizPlay)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  emptyDeck: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#9BC768',
    borderColor: grey5,
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 15,
    margin: 15,
    marginBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.24)',
        shadowOffset: { height: 3, width: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardContent: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'transparent'
  },
  cardQuestionBtn: {
    justifyContent: 'center',
    color: darkBlue,
    fontSize: 20,
    marginLeft: 8,
    marginTop: 3,
  },
  cardTitle: {
    fontSize: 22,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        ...fonts.android.black,
      },
    }),
    textAlign: 'center',
    marginBottom: 15,
    color: grey1,
  }
})
