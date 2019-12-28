import React from 'react';
import { toast } from 'react-interaction';
import CommonHighlighter from './CommonHighlighter';
import myToast from './custom/myToast';

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
        <CommonHighlighter>{`<button type="button" onClick={() => toast('This is a toast message')}>
  toast
</button>`}</CommonHighlighter>
      </div>

      <div className="example_area">
        <h3>Time</h3>
        <p>
          The default time is 3 seconds.
        </p>
        <div className="playground">
          <button
            type="button"
            onClick={() => toast('Message shown for 1 seconds.', { time: 1000 })}
          >
            for 1 seconds
          </button>
        </div>
        <CommonHighlighter>{`<button type="button" onClick={() => toast('Message shown for 1 seconds.', { time: 1000 })}>
  for 1 seconds
</button>`}</CommonHighlighter>
      </div>

      <div className="example_area">
        <h3>Custom Style</h3>
        <p>
          You can override the style with classname.
        </p>
        <div className="playground">
          <button
            type="button"
            onClick={() => toast('My custom toast', {
              className: 'my-toast',
            })}
          >
            My custom toast
          </button>
        </div>
        <CommonHighlighter language="css">{`.interaction-toast-message.my-toast {
  background-color: rgba(255, 115, 122, 0.8);
  color: #fff;
  font-size: 20px;
}
`}</CommonHighlighter>
        <CommonHighlighter>{`<button
  type="button"
  onClick={() => toast('My custom toast', {
    className: 'my-toast',
  })}
>
  My custom toast
</button>`}</CommonHighlighter>
      </div>

      <div className="example_area">
        <h3>Use default settings</h3>
        <p>
          Can be used by mapping.
        </p>
        <div className="playground">
          <button
            type="button"
            onClick={() => myToast('Default settings toast')}
          >
            Default settings toast
          </button>
        </div>
        <CommonHighlighter>{`import { toast } from 'react-interaction';

export default (message) => {
  toast(message, {
    time: 1000,
    className: 'my-toast',
  });
}
`}</CommonHighlighter>
        <CommonHighlighter>{`<button
  type="button"
  onClick={() => myToast('Default settings toast')}
>
  Default settings toast
</button>
`}</CommonHighlighter>
      </div>
    </div>
  );
}
