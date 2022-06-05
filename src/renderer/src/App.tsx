import React, { useState } from 'react';
import logo from './assets/logo.svg';
import './css/App.css';

const App = () => {
    const [count, setCount] = useState(0);
    const platform = window.api.ipcRenderer.platform();

    return (
        <div className="App">
            <header className="App-header">
            <   h1><strong>Platform: </strong>{platform}</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
                    </button>
                </p>
                <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
                </p>
                <p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
            Learn React
                    </a>
                    {' | '}
                    <a
                        className="App-link"
                        href="https://vitejs.dev/guide/features.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
            Vite Docs
                    </a>
                </p>
            </header>
        </div>
    );
};

export default App;