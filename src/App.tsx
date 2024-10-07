import React, {useState} from 'react';
import './App.css';
import {BetButton} from "./Components/BetButton";
import {SlotMachine} from "./Components/SlotMachine";

function App() {
    const [wager, setWager] = useState<number>(1);
    const bets: number[] = [0.5, 1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000]
    return (
        // The 2 components are left so you dont have to comment out one or the another/
        // ostaveni se dvata komponenti za da gi vidite, da ne treba da komentirate edno pa drugo
        <div className="App">
            <header className="App-header">
                {/*tuka mozeme da si igrame so redici/koloni/\here we can change the rows/columns*/}
                <SlotMachine rowCount={3} reelCount={7} />
                <BetButton bets={bets}
                           increment={1}
                           currentWager={wager}
                           onWagerChanged={setWager}/>

            </header>
        </div>
    );
}

export default App;