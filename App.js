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
import DeckAdd from './src/screens/DeckAdd'
import DeckList from './src/screens/DeckList'
import DeckDetail from './src/screens/DeckDetail'
import QuizIntro from './src/screens/QuizIntro'
import QuizSelectDeck from './src/screens/QuizSelectDeck'
import QuizSelectQuestionCount from './src/screens/QuizSelectQuestionCount'
import CardAdd from './src/screens/CardAdd'
import { Constants } from 'expo'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from './src/data/reducer';


function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({

  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Data'
    }
  }
})

const MainNavigator = StackNavigator({
  QuizSelectDeck: {
    screen: QuizSelectDeck,
    navigationOptions: {
      tabBarLabel: 'Quiz'
    }
  },
  QuizSelectQuestionCount: {
    screen: QuizSelectQuestionCount,
  },
  DeckList: {
    screen: DeckList,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple',
      }
    }
  },
  DeckAdd: {
    screen: DeckAdd,
  },
  CardAdd: {
    screen: CardAdd,
  },
})




export default class App extends Component {
  render() {
     return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashcardsStatusBar backgroundColor='#292477' barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});


/*
const QuizNavigator = StackNavigator({
  // Home: {
  //   screen: QuizIntro,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  QuizSelectDeck: {
    screen: QuizSelectDeck,
  }
})

const DataNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'purple',
      }
    }
  },
  DeckAdd: {
    screen: DeckAdd,
  },
  CardAdd: {
    screen: CardAdd,
  },
})

const Tabs = TabNavigator({
  QuizNavigator: {
    screen: QuizNavigator,
    navigationOptions: {
      tabBarLabel: 'Quiz'
    }
  },
  DataNavigator: {
    screen: DataNavigator,
    navigationOptions: {
      tabBarLabel: 'Data'
    }
  }
})

*/
