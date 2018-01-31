import { ADD_DECK, ADD_CARD, RECEIVE_DECKS } from './actions'

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

const decks = (state = {}, action) => {
  debugger;
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    // deck: { title: "Title" }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    // card: { question: "Content", answer: "AnswerContent"}
    case ADD_CARD:
      const { deckTitle } = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: questions(state[deckTitle].questions, action)
        }
      }
    default:
      return state;
  }
}

const questions = (state = [], action) => {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.card];
    default:
      return state;
  }
}

export default decks;
