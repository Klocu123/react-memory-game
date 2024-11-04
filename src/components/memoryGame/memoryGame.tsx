import React from "react";
import { IMemoryCard } from "../../types/memoryCard";
import { useMemoryCards } from "../../contexts/memoryContext";

interface MemoryGameProps {
    onGameEnd: () => void;
}

