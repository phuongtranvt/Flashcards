import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { ListItem, ListView } from 'react-native-elements'
import { selectNoOfQuestion } from '../../../data/quiz/actions'
import { connect } from 'react-redux'
import Row from '../../../../src/components/ClickableRow'
import List from '../../../../src/components/List'
import { white, grey1 } from '../../../config/colors'
import { getQuestionCountOptions } from './questionCountOptions'

class QuizSelectQuestionCount extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Choose questions count',
      headerTitleStyle: {
        fontSize: 16
      }
    }
  }

  selectQuestion = (key) => {
    const { navigation, allQuestionsCount } = this.props;

    key === 'all'
    ? this.props.selectNoOfQuestion(allQuestionsCount)
    : this.props.selectNoOfQuestion(key);

    this.props.navigation.navigate(
      'QuizPlay'
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: white}}>
        <List>
          {getQuestionCountOptions().map(item => (
            <Row
              key={item.key}
              onPress={() => this.selectQuestion(item.key)}
              title={item.title}
              textStyle={{color: grey1, fontSize: 14}}
            />
          ))}
        </List>
      </View>

    )
  }
}

const mapStateToProps = ({ decks, quiz }) => {
  let allQuestionsCount = 0;
  let questions;
  quiz.selectedDecks.forEach(deckTitle => {
    questions = decks[deckTitle].questions || []
    allQuestionsCount += questions.length;
  })

  return {
    allQuestionsCount
  }
}

const mapDispatchToProps = { selectNoOfQuestion }

export default connect(mapStateToProps, mapDispatchToProps)(QuizSelectQuestionCount)
