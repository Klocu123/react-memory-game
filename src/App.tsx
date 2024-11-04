import { useEffect, useState } from 'react';
import './App.css';
import { useMemoryCards } from './contexts/memoryContext';
import Leaderboard from './components/leaderboard';
import MemoryGame from './components/memoryGame';

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
        <div>
          <h1>Gra Memory</h1>
          <input type='text' placeholder='Wpisz tu swoją nazwę' value={name} onChange={(e) => setPlayerName(e.target.value)}></input>
          <button onClick={HandleStartGame} disabled={!name}>Rozpocznij Grę</button>
          <Leaderboard leaderboard={leaderboard} />
        </div>   
        <MemoryGame onGameEnd={() =>setsIsPlaying(false)} />     
    </div>
  );
}

export default App;
