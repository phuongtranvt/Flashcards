import { combineReducers } from 'redux';
import decks from './decks/reducer'
import quiz from './quiz/reducer'

export default combineReducers({
  decks,
  quiz
})
