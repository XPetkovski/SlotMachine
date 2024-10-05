import React, {useState} from 'react';
import './App.css';
import {BetButton} from "./Components/BetButton";

function App() {
    const [wager, setWager] = useState<number>(0);
    const bets: number[] = [0.5, 1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000]
    return (
        <div className="App">
            <header className="App-header">
                {/*<SlotMachine rowCount={3} reelCount={5} />*/}
                <BetButton bets={bets}
                           increment={1}
                           currentWager={wager}
                           onWagerChanged={setWager}/>
            </header>
        </div>
    );
}

export default App;