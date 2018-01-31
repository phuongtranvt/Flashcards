import { AsyncStorage } from 'react-native'

const DATA_STORAGE_KEY = "Flashcards:data"

export const addDeckToStorage = (deck) => {
  return AsyncStorage.mergeItem(
    DATA_STORAGE_KEY, JSON.stringify({
      [deck.title]: deck
    })
  )
}

export const addCardToStorage = (card, deckTitle) => {
  AsyncStorage.getItem(DATA_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    const questions = data[deckTitle].questions || [];

    data[deckTitle] = {
      ...data[deckTitle],
      questions: [...questions, card]
    }

    AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
  })
}

export const getDecksFromStorage = () => {
  return AsyncStorage.getItem(DATA_STORAGE_KEY)
    .then(JSON.parse)
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
