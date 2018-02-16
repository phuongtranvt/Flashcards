import { AsyncStorage } from 'react-native'
import { getInitialQuizData } from './quizInitialData'


const DATA_STORAGE_KEY = "Flashcards:data"

export const addDeckToStorage = (deck) => {
  return AsyncStorage.mergeItem(
    DATA_STORAGE_KEY, JSON.stringify({
      [deck.title]: deck
    })
  )
}

export const addCardToStorage = (card, deckTitle) => {
  fetchDataFromStorage()
    .then(data => {
      const questions = data[deckTitle].questions || [];

      data[deckTitle] = {
        ...data[deckTitle],
        questions: [...questions, card]
      }

      AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    })
}

const setInitialDataToStorage = () => {
  const data = getInitialQuizData();
  AsyncStorage.setItem(
    DATA_STORAGE_KEY, JSON.stringify(getInitialQuizData()))

  return data;
}

export const fetchDataFromStorage = () => {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(results => console.log('fetchDataFromStorage', JSON.parse(results)) || (results ? JSON.parse(results) : setInitialDataToStorage()))
}

export const removeData = () => {
  return AsyncStorage.removeItem(DATA_STORAGE_KEY);
}

/*
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'Question1',
        answer: 'Answer2'
      },
      {
        question: 'Question1',
        answer: 'Answer1'
      }
    ]
  },
  Redux: {
    title: 'Redux'
  }
}
*/
