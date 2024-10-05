import React, {useState} from 'react';
import './App.css';
import {BetButton} from "./Components/BetButton";

function App() {
    const [wager, setWager] = useState<number>(0);
    return (
        <div className="App">
            <header className="App-header">
                {/*<SlotMachine rowCount={3} reelCount={5} />*/}
                <BetButton bets={[0.5, 1, 2, 3]} increment={1} currentWager={wager} onWagerChanged={setWager}/>
            </header>
        </div>
    );
}

export default App;