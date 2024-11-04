import React, { useEffect } from "react";
import { IMemoryCard } from "../../types/memoryCard";
import { useMemoryCards } from "../../contexts/memoryContext";
import Card from "../card";

interface MemoryGameProps {
    onGameEnd: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameEnd }) => {
    const {
        cards,
        handleCardItemClick,
        turn,
        checkWin,
    } = useMemoryCards();
    
    useEffect(() => {
        if (checkWin()) {
            onGameEnd();
        }
    }, [cards, checkWin, onGameEnd]);
        return (
            <div>
                <h2>Twoje ruchy: {turn}</h2>
                <div className="card-grid">
                    {cards.map((card) => (
                        <div key={card.id} className={"card ${card.isFlipped ? 'flipped' : ''}"} onClick={( => handleCardItemClick(card))}>
                            {card.isFlipped || card.isMatched ? (
                                <img src={card.image} alt={card.name} />
                            ) : (
                                <div className="card-back"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
}

export default MemoryGame;