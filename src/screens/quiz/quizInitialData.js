const initialData = {
  'Ice Breakers': {
    title: 'Ice Breakers',
    questions: [
      {
        question: 'Who was the legendary Benedictine monk who invented champagne?',
        answer: 'Dom Perignon'
      },
      {
        question: 'Name the largest freshwater lake in the world?',
        answer: 'Lake Superior'
      },
      {
        question: 'Where would you find the Sea of Tranquility?',
        answer: 'The Moon'
      },
      {
        question: 'What is someone who shoes horses called? ',
        answer: 'A farrier'
      },
      {
        question: 'What item of clothing was named after its Scottish inventor?',
        answer: 'A Mackintosh'
      },
      {
        question: 'What kind of weapon is a falchion?',
        answer: 'A sword'
      },
      {
        question: 'Which word goes before vest, beans and quartet?',
        answer: 'String'
      },
      {
        question: 'What is another word for lexicon?',
        answer: 'Dictionary'
      },
      {
        question: 'Name the seventh planet from the sun?',
        answer: 'Uranus'
      },
      {
        question: 'Who invented the rabies vaccination?',
        answer: 'Louis Pasteur'
      },
    ]
  },
  Countries: {
    title: 'Countries',
    questions: [
      {
        question: `Which is the only American state to begin with the letter 'p'?`,
        answer: 'Pennsylvania'
      },
      {
        question: `Name the world's biggest island?`,
        answer: 'Greenland'
      },
      {
        question: `What is the world's longest river?`,
        answer: 'Amazon'
      },
      {
        question: `Name the world's largest ocean?`,
        answer: 'Pacific'
      },
      {
        question: 'What is the diameter of Earth?',
        answer: '8,000 miles'
      },
      {
        question: `Where would you find the world's most ancient forest?`,
        answer: 'Daintree Forest north of Cairns, Australia'
      },
      {
        question: 'Which four British cities have underground rail systems?',
        answer: 'Liverpool, Glasgow, Newcastle and London'
      },
      {
        question: 'What is the capital city of Spain?',
        answer: 'Madrid'
      },
      {
        question: 'Which country is Prague in?',
        answer: 'Czech Republic'
      },
      {
        question: 'Which English town was a forerunner of the Parks Movement and the first city in Europe to have a street tram system?',
        answer: 'Birkenhead'
      },
    ]
  },
  Movies: {
    title: 'Movies',
    questions: [
      {
        question: 'Name the actor who starred in 142 films including The Quiet Man, The Shootist, The Searchers and Stagecoach?',
        answer: 'John Wayne'
      },
      {
        question: `Name the film noir actress who starred in I Married a Witch, The Glass Key, So Proudly We Hail! and Sullivan's Travels?`,
        answer: 'Veronica Lake'
      },
      {
        question: 'What is the oldest film ever made, and when was it made?',
        answer: 'Roundhay Garden Scene made in 1888'
      },
      {
        question: 'Which actress has won the most Oscars?',
        answer: 'Katharine Hepburn, with 4 Oscars and 12 nominations'
      },
      {
        question: `Which actress said, "Fasten your seatbelts. It's going to be a bumpy night," in All About Eve?`,
        answer: 'Bette Davis (as Margo Channing.)'
      },
      {
        question: 'Name the director of the Lord of the Rings trilogy?',
        answer: 'Peter Jackson'
      },
      {
        question: 'Who played Neo in The Matrix?',
        answer: 'Keanu Reeves'
      },
      {
        question: 'Name the actress whose career began at the age of 3, and who went on to star in films such as Contact, Maverick and The Silence of the Lambs?',
        answer: 'Jodie Foster'
      },
      {
        question: 'Bray Studios, near Windsor in Berkshire, was home to which famous brand of horror films?',
        answer: 'Hammer Horror'
      },
      {
        question: `In which film did Humphrey Bogart say, "We'll always have Paris"?`,
        answer: 'Casablanca'
      },
    ]
  },
  'Food and Drink': {
    title: 'Food and Drink',
    questions: [
      {
        question: 'If you had Lafite-Rothschild on your dinner table, what would it be?',
        answer: 'Wine'
      },
      {
        question: 'What is sushi traditionally wrapped in?',
        answer: 'Edible seaweed'
      },
      {
        question: `May Queen, Wisley Crab, Foxwhelps and Lane's Prince Albert are all species of what?`,
        answer: 'Apples'
      },
      {
        question: 'What is allspice alternatively known as?',
        answer: 'Pimento'
      },
      {
        question: 'What colour is Absynthe?',
        answer: 'Green'
      },
      {
        question: 'What flavour is Cointreau?',
        answer: 'Orange'
      },
      {
        question: 'If you were to cut a hare into pieces, marinate it in wine and juniper berries then stew this slowly in a sealed container, what would this recipe be called?',
        answer: 'Jugged hare'
      },
      {
        question: `Fried tarantulas, eggs boiled just before they're due to hatch, live octopus, and puffin hearts eaten raw when still-warm are all traditional foods—true or false?`,
        answer: 'True'
      },
      {
        question: 'How many crocus flowers does it take to make a pound of saffron?',
        answer: 'Up to 75,000 flowers, which is enough to fill an entire football pitch.'
      },
      {
        question: 'Costing around $2,600 per pound and made only to order by Knipschildt, what is the name of this chocolate truffle?',
        answer: 'Chocopologie'
      },
    ]
  }
}

export const getInitialQuizData = () => {
  return initialData;
}
