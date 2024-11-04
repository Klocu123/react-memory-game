import { useEffect, useState } from 'react';
import './App.css';
import { CardContainer } from './containers';
import { useMemoryCards } from './contexts/memoryContext';

type Scoring = {
  name: string;
  moves: number;
  time: number;
};


function App() {
  const { startGame, setPlayerName, leaderboard } = useMemoryCards();
  const [name, setName] = useState<string>('');
  const [isPlaying, setsIsPlaying] = useState<boolean>(false);

  const HandleStartGame = () => {
    setPlayerName(name);
    setsIsPlaying(true);
    startGame();
  };



  return (
    <div className='App'>  
      {!isPlaying ? (
        <div>
          <h1>Gra Memory</h1>
          <input type='text' placeholder='Wpisz tu swoją nazwę' value={name} onChange={(e) => setPlayerName(e.target.value)}></input>
          <button onClick={HandleStartGame} disabled={!name}>Rozpocznij Grę</button>
          //TODO: leaderboard komponent
        </div>
      )}
    </div>
  );
}

export default App;
