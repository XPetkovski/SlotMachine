import {useState} from "react";
import './BetButton.css';

interface BetProps {
    currentWager: number;
    increment?: number;
    bets: number[];
    onWagerChanged(newWager: number): void;
}
// All elements' styles from the HTML are placed in specific css file for better code readability
export function BetButton(props: BetProps) {
    const [showBets, setShowBets] = useState<boolean>(false);
    const [highlightedWager, setHighlightedWager] = useState<number | undefined>(1);

    function findNextHigherBet(currentBet: number): number {
        const higherBets = props.bets.filter(bet => bet > currentBet);
        return higherBets.length > 0 ? Math.min(...higherBets) : currentBet;
    }

    function incrementWager() {
        let nextBet = findNextHigherBet(props.currentWager);

        //highlight if the next bet is not the last one
        if (nextBet !== props.bets[props.bets.length - 1]) {
            setHighlightedWager(props.bets.indexOf(nextBet));
        } else {
            //highlight it if last one
            setHighlightedWager(props.bets.length - 1);
        }

        props.onWagerChanged(nextBet);
    }

    function decrementWager() {
        const lowerBets = props.bets.filter(bet => bet < props.currentWager);
        let nextBet = lowerBets.length > 0 ? Math.max(...lowerBets) : props.currentWager;

        //highlight it if next one is not the first one
        if (nextBet !== props.bets[0]) {
            setHighlightedWager(props.bets.indexOf(nextBet));
        } else {
            //highlight it if it is the first one
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

    function hideBets() {
        setShowBets(false);
    }

    const maxBet = Math.max(...props.bets);

    return (
        <>
            {/*<h1>WAGER MACHINE</h1>*/}

            <div className={"BetButton-container "}>
                <button id={"decrement-wager"} onClick={decrementWager} className="BetButton-button"> - </button>
                <button id={"wager-value"} onClick={handleShowBets} className="BetButton-button"> Wager: {props.currentWager} </button>
                <button id={"increment-wager"} onClick={incrementWager} className="BetButton-button"> + </button>
            </div>

            {showBets && (
                <div className={'bet-selection-background'}>
                    <div className="bet-button-clickable-background" onClick={hideBets}></div>
                    <div className="BetButton-bets-container">
                        <h2>BET</h2>
                        <div className="BetButton-bet-selection">
                            {[...Array(Math.ceil(props.bets.length / 2))].map((_, rowIndex) => (
                                <div key={rowIndex} className="BetButton-bet-row">
                                    {[...Array(2)].map((_, colIndex) => {
                                        const index = rowIndex * 2 + colIndex;
                                        if (index >= props.bets.length) return null;
                                        return (
                                            <div key={`${rowIndex}-${colIndex}`} style={{ display: 'inline-flex', alignItems: 'stretch' }}>
                                                <button id={"bets"} key={index}
                                                        onClick={() => {
                                                            setWager(props.bets[index]);
                                                            setHighlightedWager(index);
                                                        }}
                                                        className={`BetButton-bet-button ${highlightedWager === index ? 'highlighted' : ''}`}
                                                >
                                                    {props.bets[index]}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                        <div className="BetButton-bets-buttons">
                            {/*<button id={"apply-bet-button"} onClick={handleApply} className="BetButton-apply-button"> Apply </button>*/}
                            <button id={"max-bet-button"}
                                    onClick={() => {
                                        setWager(maxBet);
                                        setHighlightedWager(props.bets.length - 1);
                                    }}
                                    className="BetButton-max-bet-button"
                            >
                                Max Bet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}