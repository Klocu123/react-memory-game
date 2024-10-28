import { useState } from 'react';
import './App.css';
import { CardContainer } from './containers';
import { useMemoryCards } from './contexts/memoryContext';

function App() {
  const { startGame, turn } = useMemoryCards();
  const [boardSize, setBoardSize] = useState<string>('2x6');
  return (
    <div className='app'>
      <h1>Memory Game</h1>
      <label htmlFor='board-size'>Select Board Size: </label>
      <select id='board-size' value={boardSize} onChange={(e) => setBoardSize(e.target.value)}>
        <option value='2x6'>2x6</option>
        <option value='4x4'>4x4</option>
        <option value='6x6'>6x6</option>
      </select>
      
      <button onClick={startGame}>Start a New Game</button>
      <CardContainer />
      <h2>Turn : {turn}</h2>
    </div>
  );
}

export default App;
