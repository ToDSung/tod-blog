'use client';

import {
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';
import dedent from 'dedent';

const files = {
  '/App.js': dedent`
    import React from "react";
    export default function App() {
      const [count, setCount] = React.useState(0);
      return (
        <div style={{ textAlign: "center" }}>
          <h2>React Counter</h2>
          <p>Current count: {count}</p>
          <button onClick={() => setCount(count - 1)}>Decrease</button>
          <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
      );
    }
  `,
  '/index.js': dedent`
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";

    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  `,
};

const ReactLivePage = () => {
  return (
    <div className='my-4 w-full'>
      <SandpackProvider files={files} template='react' theme='dark'>
        <SandpackLayout>
          <SandpackFileExplorer />
          <SandpackCodeEditor closableTabs showTabs showLineNumbers />
          <SandpackPreview showNavigator />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default ReactLivePage;
