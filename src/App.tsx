import React, {useState} from 'react';
import './App.css';
import {BetButton} from "./Components/BetButton";
import {SlotMachine} from "./SlotMachine";

function App() {
    const [wager, setWager] = useState<number>(0);
    const bets: number[] = [0.5, 1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000]
    return (
        // The 2 components are left so you dont have to comment out one or the another/
        // ostaveni se dvata komponenti za da gi vidite, da ne treba da komentirate edno pa drugo
        <div className="App">
            <header className="App-header">
                <SlotMachine rowCount={4} reelCount={10} />
                <BetButton bets={bets}
                           increment={1}
                           currentWager={wager}
                           onWagerChanged={setWager}/>

            </header>
        </div>
    );
}

export default App;