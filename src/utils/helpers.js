import { NavigationActions } from 'react-navigation'
import { Alert, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = "Flashcard:notification"

export const createQuizData = (decks, selectedDecks, noOfQuestion) => {
  debugger;
  let allCards = [];
  let results = [];

  selectedDecks.forEach(d => {
    let questions = decks[d].questions || [];
    allCards = [...allCards, ...questions];
  })

  let noOfQuiz = (noOfQuestion === 'all' || noOfQuestion >= allCards.length)
                  ? allCards.length
                  : noOfQuestion;

  getRandomArray(noOfQuiz, allCards.length).forEach(index => {
    results.push(allCards[index])
  });

  console.log('createQuizData');
  return results;
}

const getRandomArray = (arrayLength, maxValue) => {
  let randomArray = [];

  let i = 0;
  let num;
  while (i < arrayLength) {
    num = Math.floor(Math.random() * maxValue);
    if (randomArray.indexOf(num) === -1) {
      randomArray.push(num);
      i++;
    }
  }

  return randomArray;
}

export const goHome = (navigation) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Home'})
    ]
  })
  navigation.dispatch(resetAction)

}

export const clearLocalNotification = () => {

}

const createLocalNotification = () => {
  return {
    title: 'Play Quiz',
    body: "👋 Dont' forget to play your Quiz today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
