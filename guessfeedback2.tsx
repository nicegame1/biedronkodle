import GuessFeedback from "../GuessFeedback";

export default function GuessFeedbackExample() {
  const mockGuesses = [
    {
      guessedPrice: 8.0,
      actualPrice: 5.49,
      difference: 2.51,
      isCorrect: false,
    },
    {
      guessedPrice: 5.0,
      actualPrice: 5.49,
      difference: -0.49,
      isCorrect: false,
    },
    {
      guessedPrice: 5.49,
      actualPrice: 5.49,
      difference: 0,
      isCorrect: true,
    },
  ];

  return <GuessFeedback guesses={mockGuesses} />;
}
