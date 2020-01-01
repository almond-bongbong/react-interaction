import React, { Fragment } from 'react';
import { toast, confirm } from 'react-interaction';
import CommonHighlighter from './CommonHighlighter';
import myToast from './custom/myToast';

export default function App() {
  return (
    <Fragment>
      <div className="container">
        <header>
          <div className="header-content">
            <h1>react-interaction</h1>
            <div className="links">
              <a href="#toast">toast</a>
              <a href="#alert">alert</a>
              <a href="#confirm">confirm</a>
            </div>
          </div>
        </header>
        <h2 id="toast">Toast</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => toast('This is a toast message')}
            >
              toast
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => toast('This is a toast message')}>
  toast
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Time</h3>
          <p>
            The default time is 3 seconds.
          </p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => toast('Message shown for 1 seconds.', { time: 1000 })}
            >
              for 1 seconds
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => toast('Message shown for 1 seconds.', { time: 1000 })}>
  for 1 seconds
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Custom Style</h3>
          <p>
            Using style props
          </p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => toast('My custom toast', {
                style: {
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  color: '#8fc5fd',
                }
              })}
            >
              My custom toast
            </button>
          </div>
          <CommonHighlighter>
            {`<button
  type="button"
  className="example-button"
  onClick={() => toast('My custom toast', {
    style: {
      borderRadius: 0,
      backgroundColor: '#fff',
      color: '#8fc5fd',
    }
  })}
>
  My custom toast
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <p>
            You can override the style with classname.
          </p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => toast('My custom toast', {
                className: 'my-toast',
              })}
            >
              My custom toast
            </button>
          </div>
          <CommonHighlighter language="css">
            {`.interaction-toast-message.my-toast {
  background-color: rgba(255, 115, 122, 0.8);
  color: #fff;
  font-size: 20px;
}
`}
          </CommonHighlighter>
          <CommonHighlighter>
            {`<button
  type="button"
  onClick={() => toast('My custom toast', {
    className: 'my-toast',
  })}
>
  My custom toast
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Use default settings</h3>
          <p>
            Can be used by mapping.
          </p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => myToast('Default settings toast')}
            >
              Default settings toast
            </button>
          </div>
          <CommonHighlighter>
            {`import { toast } from 'react-interaction';

const myToast = () => {
  toast(message, {
    time: 1000,
    className: 'my-toast',
  });
};

export default myToast;
`}
          </CommonHighlighter>
          <CommonHighlighter>
            {`<button
  type="button"
  onClick={() => myToast('Default settings toast')}
>
  Default settings toast
</button>
`}
          </CommonHighlighter>
        </div>

        <h2 id="alert">Alert</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => alert('This is a alert message')}
            >
              Basic alert
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => alert('This is a alert message')}>
  Basic alert
</button>
`}
          </CommonHighlighter>
        </div>

        <h2 id="confirm">Confirm</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => confirm('Are you sure?')}
            >
              Basic confirm
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => alert('This is a alert message')}>
  Basic alert
</button>
`}
          </CommonHighlighter>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/almond-bongbong">https://github.com/almond-bongbong</a>
        </div>
      </footer>
    </Fragment>
  );
}
