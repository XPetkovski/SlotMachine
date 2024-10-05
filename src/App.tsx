import React from 'react';
import './App.css';
import {SlotMachine} from "./SlotMachine";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <SlotMachine rowCount={5} reelCount={8} />
            </header>
        </div>
    );
}

export default App;