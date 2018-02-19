import store from './config/store'
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckAdd from './src/screens/decks/DeckAdd'
import DeckDetail from './src/screens/decks/DeckDetail'
import QuizSelectDeck from './src/screens/quiz/QuizSelectDeck'
import QuizSelectQuestionCount from './src/screens/quiz/QuizSelectQuestionCount'
import QuizPlay from './src/screens/quiz/QuizPlay'
import QuizResult from './src/screens/quiz/QuizResult'
import CardAdd from './src/screens/decks/CardAdd'
import { Constants } from 'expo'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from './src/data/reducer';
import { white, blue, darkBlue } from './src/config/colors'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './src/utils/helpers'
import { Root } from 'native-base'

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  QuizSelectDeck: {
    screen: QuizSelectDeck,
    navigationOptions: {
      tabBarLabel: 'Play Quiz',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor}/>
    }
  },
  DeckAdd: {
    screen: DeckAdd,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
},{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: blue,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  QuizSelectQuestionCount: {
    screen: QuizSelectQuestionCount,
  },
  QuizPlay: {
    screen: QuizPlay,
  },
  QuizResult: {
    screen: QuizResult,
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  CardAdd: {
    screen: CardAdd,
  },
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: white,
    headerStyle: {
      backgroundColor: blue,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontSize: 20
    }
  }
})

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
     return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor={blue} barStyle='light-content'/>
          <Root>
            <MainNavigator />
          </Root>
        </View>
      </Provider>
    );
  }
}
