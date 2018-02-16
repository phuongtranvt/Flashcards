import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import TextButton from '../../../components/TextButton'
import Text from '../../../components/Text'
import Button from '../../../components/Button'
import { white, grey1, blue, grey4 } from '../../../config/colors';
import { goHome, setLocalNotification, clearLocalNotification } from '../../../utils/helpers'

class QuizResult extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    }
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { noOfQuestion, navigation } = this.props;
    const { noOfCorrectAnswer } = this.props.navigation.state.params;
    debugger;
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Image style={{width: 200, height: 200}} source={require('../../../images/education.png')}/>
          <Text h4 style={{color: grey4}}>YOUR SCORE</Text>
          <Text style={{fontSize: 120, marginLeft: 20}}>{Math.round(noOfCorrectAnswer*100/noOfQuestion)}%</Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.correctQuestionText}>Correct Questions:</Text>
              <Text style={styles.totalText}>Total Questions:</Text>
            </View>
            <View>
              <Text style={styles.correctQuestionText}>{noOfCorrectAnswer}</Text>
              <Text style={styles.totalText}>{noOfQuestion}</Text>
            </View>
          </View>
        </View>
        <View>
          <Button
            style={{marginBottom: 15}}
            title='Play Again'
            onPress={() => navigation.navigate(
            'QuizPlay',
            { restart: true }
          )}/>
          <Button
            style={{marginBottom: 15}}
            title='Restart Quiz'
            onPress={() => goHome(navigation)}/>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ quiz }) => ({
  noOfQuestion: quiz.noOfQuestion
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  correctQuestionText: {
    fontSize: 16,
    color: blue,
    marginBottom: 10,
    marginRight: 10
  },
  totalText: {
    fontSize: 16,
    color: blue,
  }
})

export default connect(mapStateToProps)(QuizResult)
