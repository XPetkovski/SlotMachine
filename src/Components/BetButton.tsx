import {useState} from "react";

interface BetProps {
    currentWager: number;
    increment?: number;
    bets: number[];
    onWagerChanged(newWager: number): void;
}
export function BetButton(props: BetProps) {
    const increment = props.increment ?? 1;
    const [showBets, setShowBets] = useState<boolean>(false);
    const [highlightedWager, setHighlightedWager] = useState<number | undefined>(undefined);

    function incrementWager() {
        props.onWagerChanged(props.currentWager + increment);
    }

    function decrementWager() {
        props.onWagerChanged(Math.max(props.currentWager - increment, 0));
    }

    function handleShowBets() {
        setShowBets(true)
    }

    function setWager(wager: number) {
        props.onWagerChanged(wager);
    }

    return(
        <>
            {/*TUKA DA SE NAPRAVI FLEX ROW DA BIDAT U EDNO SO CSS*/}
            <button onClick={handleShowBets}>Wager: {props.currentWager}</button>
            <button onClick={incrementWager}>Increase wager</button>
            <button onClick={decrementWager}>Decrease wager</button>
            {/*HIGHLIGHT NA KLIKNATA VREDNOST*/}
            {showBets ?
                <div>
                    {props.bets.map((bet, index) => (
                        <button onClick={() => {
                            setWager(bet);
                            setHighlightedWager(index);
                        }}>{bet}</button>
                    ))}
                </div> : null}
        </>
    )
}