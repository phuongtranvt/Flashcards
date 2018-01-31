export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

// deck: { title: "Title" }
export const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    deck,
  }
}

// card: { question: "Content", answer: "AnswerContent"}
export const addCardToDeck = (card, deckTitle) => {
  return {
    type: ADD_CARD,
    card,
    deckTitle
  }
}

export const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}
