import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import { toast } from 'react-interaction';
import JsxHighlighter from './JsxHighlighter';

SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>react-interaction</h1>
      </header>
      <h2>Toast popup</h2>
      <div className="example_area">
        <h3>Basic usage</h3>
        <div className="playground">
          <button
            type="button"
            onClick={() => toast('This is a toast message')}
          >
            toast
          </button>
        </div>
        <JsxHighlighter>{`<button type="button" onClick={() => toast('This is a toast message')}>
    toast
</button>
`}</JsxHighlighter>
      </div>
      <div className="example_area">
        <h3>Time option</h3>
        <div className="playground">
          <button
            type="button"
            onClick={() => toast('Message shown for 10 seconds.', 10000)}
          >
            for 10 seconds
          </button>
        </div>
        <JsxHighlighter>{`<button type="button" onClick={() => toast('Message shown for 10 seconds.', 10000)}>
    for 10 seconds
</button>
`}</JsxHighlighter>
      </div>
    </div>
  );
}
