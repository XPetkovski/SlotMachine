import {useState} from "react";
import './BetButton.css';

interface BetProps {
    currentWager: number;
    increment?: number;
    bets: number[];
    onWagerChanged(newWager: number): void;
    betsContainerHeight: string;
    betsContainerWidth: string;
}
export function BetButton(props: BetProps) {
    const [showBets, setShowBets] = useState<boolean>(false);
    const [highlightedWager, setHighlightedWager] = useState<number | undefined>(undefined);

    function findNextHigherBet(currentBet: number): number {
        const higherBets = props.bets.filter(bet => bet > currentBet);
        return higherBets.length > 0 ? Math.min(...higherBets) : currentBet;
    }

    function incrementWager() {
        let nextBet = findNextHigherBet(props.currentWager);

        // If the next bet is not the last one, highlight it
        if (nextBet !== props.bets[props.bets.length - 1]) {
            setHighlightedWager(props.bets.indexOf(nextBet));
        } else {
            // If it is the last one, highlight it
            setHighlightedWager(props.bets.length - 1);
        }

        props.onWagerChanged(nextBet);
    }

    function decrementWager() {
        const lowerBets = props.bets.filter(bet => bet < props.currentWager);
        let nextBet = lowerBets.length > 0 ? Math.max(...lowerBets) : props.currentWager;

        // If the next bet is not the first one, highlight it
        if (nextBet !== props.bets[0]) {
            setHighlightedWager(props.bets.indexOf(nextBet));
        } else {
            // If it is the first one, highlight it
            setHighlightedWager(0);
        }

        props.onWagerChanged(nextBet);
    }

    function handleShowBets() {
        setShowBets(true);
    }

    function setWager(wager: number) {
        props.onWagerChanged(wager);
    }

    function handleApply() {
        setShowBets(false);
    }

    const maxBet = Math.max(...props.bets);

    return (
        <>
            <h1>WAGER MACHINE</h1>
            {/* Main container */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: '20px',
                backgroundColor: '#00000080', // Semi-transparent black background
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)', // Golden glow effect
            }}>
                {/* Wager button */}

                {/* Increase wager button */}
                <button
                    onClick={decrementWager}
                    className="BetButton-button"
                >
                    -
                </button>

                <button
                    onClick={handleShowBets}
                    className="BetButton-button"
                >
                    Wager: {props.currentWager}
                </button>

                <button
                    onClick={incrementWager}
                    className="BetButton-button"
                >
                    +
                </button>


                {/* Decrease wager button */}

            </div>
            {/* Bets container */}
            {showBets && (
                <div className="BetButton-bets-container">
                    <div className="BetButton-bet-selection">
                        {Array.from(Array(Math.ceil(props.bets.length / 2))).map((_, rowIndex) => (
                            <div key={rowIndex} className="BetButton-bet-row">
                                {[0, 1].map(colIndex => {
                                    const index = rowIndex * 2 + colIndex;
                                    if (index >= props.bets.length) return null;
                                    return (
                                        <button
                                            onClick={() => {
                                                setWager(props.bets[index]);
                                                setHighlightedWager(index);
                                            }}
                                            className={`BetButton-bet-button ${highlightedWager === index ? 'highlighted' : ''}`}
                                        >
                                            {props.bets[index]}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleApply}
                        className="BetButton-apply-button"
                    >
                        Apply
                    </button>
                    <button
                        onClick={() => {
                            setWager(maxBet);
                            setHighlightedWager(props.bets.length - 1); // Highlight the last element
                        }}
                        className="BetButton-max-bet-button"
                    >
                        Max Bet
                    </button>
                </div>
            )}
        </>
    );
}