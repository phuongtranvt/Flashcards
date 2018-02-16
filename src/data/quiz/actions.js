export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SELECT_DECKS = 'SELECT_DECKS'
export const SELECT_NO_OF_QUESTION = 'SELECT_NO_OF_QUESTION'

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const selectDecks = (selectedDecks) => {
  return {
    type: SELECT_DECKS,
    selectedDecks
  }
}

export const selectNoOfQuestion = (noOfQuestion) => {
  return {
    type: SELECT_NO_OF_QUESTION,
    noOfQuestion
  }
}
