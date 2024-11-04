import { createContext, useState, useContext, useEffect } from 'react';
import { IMemoryCard } from '../types/memoryCard';
import { CardArray } from '../utils/fake_db';


type MemoryProviderType = {
  children: React.ReactNode;
};

type Score = {
  name: string;
  moves: number;
  time: number;
}

type MemoryContextType = {
  cards: IMemoryCard[];
  setCards: React.Dispatch<React.SetStateAction<IMemoryCard[]>>;
  startGame: () => void;
  turn: number;
  handleCardItemClick: (card: IMemoryCard) => void;
  disabledCards: boolean;
  checkWin: () => boolean;
};

const initialState = {
  cards: CardArray as IMemoryCard[],
  setCards: () => {},
  startGame: () => {},
  turn: 0,
  handleCardItemClick: () => {},
  disabledCards: false,
  checkWin: () => false
};

const MemoryContext = createContext<MemoryContextType>(initialState);

const MemoryProvider = ({ children }: MemoryProviderType) => {
  const [cards, setCards] = useState<IMemoryCard[]>(initialState.cards);
  const [turn, setTurn] = useState<number>(initialState.turn);
  const [choiceOne, setChoiceOne] = useState<IMemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<IMemoryCard | null>(null);
  const [disabledCards, setDisabledCards] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [isPlaying, setsIsPlaying] = useState<boolean>(false);
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.timer;
    if (isPlaying) {
      timer = setInterval(()=> setTime(time => +1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying])

  const checkWin = () => {
    const isWin = cards.every(card => card.isMatched);
    if (isWin) {
      endGame();
    }
    return isWin;
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */
  const shuffleCards = () => {
    const shuffledCards = [...CardArray, ...CardArray]
      .sort(() => Math.random() - 0.5)
      .map(card => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffledCards);
    setTurn(0);
    setTime(0);
    setsIsPlaying(true);
  };

  /**
   * @description
   * This function is used to handle the click event on the card
   * It flips the card and checks if the card is a match
   * @param card
   */
  const handleCardItemClick = (card: IMemoryCard) => {
    if (!disabledCards) {
      setCards(prevCard =>
        prevCard.map(c => {
          if (c.id === card.id) {
            card.isFlipped = true;
            return card;
          }
          return c;
        })
      );
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /**
   * @description
   * This function is used to reset the cards
   * @returns void
   */
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(prevTurn => prevTurn + 1);
    setDisabledCards(false);
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */

  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledCards(true);
      if (choiceOne.image === choiceTwo.image) {
        setCards(prevCards =>
          prevCards.map(card => {
            if (card.id === choiceOne?.id || card.id === choiceTwo?.id) {
              card.isMatched = true;
              card.isFlipped = true;
            }
            return card;
          })
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prevCard => {
            return prevCard.map(card => {
              if (!card.isMatched) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */

  const endGame = () => {
    setsIsPlaying(false);
    const newScore: Score = { name: playerName, moves, time };
    const updateLeaderboard = [...leaderboard, newScore].sort(
      (a, b) => a.moves - b.moves || a.time - b.time
    );
    setLeaderboard(updateLeaderboard);
    setPlayerName('')
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  const value = {
    cards,
    setCards,
    startGame: shuffleCards,
    turn,
    handleCardItemClick,
    disabledCards,
    checkWin
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
};

const useMemoryCards = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemoryCards must be used within a MemoryProvider');
  }
  return context;
};

export { MemoryContext, MemoryProvider, useMemoryCards };
