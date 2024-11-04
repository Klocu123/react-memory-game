import React from "react";

type Score = {
    name: string;
    moves: number;
    time: number;
}

interface LeaderboardProps {
    leaderboard: Score[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard }) => {
    return (
        <div>
            <h2>Ranking</h2>
            <table>
                <thead>
                    <tr>
                        <th>Gracz</th>
                        <th>Ruchy</th>
                        <th>Czas (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((score, index) => (
                        <tr key={index}>
                            <td>{score.name}</td>
                            <td>{score.moves}</td>
                            <td>{score.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;