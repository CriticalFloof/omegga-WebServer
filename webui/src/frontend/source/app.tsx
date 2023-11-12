import React from "react";
import { createRoot } from "react-dom/client";

function MyButton() {
    return <button>No Way??? For real????</button>;
}

function App() {
    return (
        <div>
            <h1>Omegga web ui in react????</h1>
            <MyButton />
        </div>
    );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
