import {
  SELECT_DECKS,
  SELECT_NO_OF_QUESTION,
 } from './actions'

 const initialState = {
   selectedDecks: [],
   noOfQuestion: 0,
   noOfCorrectAnswer: 0,
 }

const quiz = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DECKS:
      return {
        ...state,
        selectedDecks: action.selectedDecks,
      }
    case SELECT_NO_OF_QUESTION:
      return {
        ...state,
        noOfQuestion: action.noOfQuestion
      }
    default:
      return state;
  }
}

export default quiz;
