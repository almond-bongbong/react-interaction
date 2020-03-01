import React, { Fragment } from 'react';
import { toast, notice, check, Tooltip } from 'react-interaction';
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
              <a href="#toast">Toast</a>
              <a href="#notice">Notice</a>
              <a href="#check">Check</a>
              <a href="#tooltip">Tooltip</a>
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
          <p>The default time is 3 seconds.</p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                toast('Message shown for 5 seconds.', { time: 5000 })
              }
            >
              for 5 seconds
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => toast('Message shown for 5 seconds.', { time: 5000 })}>
  for 1 seconds
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Custom style</h3>
          <p>Using style props</p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                toast('Toast message here', {
                  style: {
                    borderRadius: 5,
                    backgroundColor: '#fafafa',
                    color: '#666',
                  },
                })
              }
            >
              toast
            </button>
          </div>
          <CommonHighlighter>
            {`<button
  type="button"
  className="example-button"
  onClick={() => toast('Toast message here', {
    style: {
      borderRadius: 5,
      backgroundColor: '#fafafa',
      color: '#666',
    }
  })}
>
  toast
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <p>You can override the style with classname.</p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                toast('Toast message here', {
                  className: 'my-toast',
                })
              }
            >
              toast
            </button>
          </div>
          <CommonHighlighter language="css">
            {`body .my-toast {
  background-color: rgba(50, 130, 184, 0.8);
  color: #fff;
  border-radius: 8px;
  font-size: 20px;
}`}
          </CommonHighlighter>
          <CommonHighlighter>
            {`<button
  type="button"
  onClick={() => toast('My custom toast', {
    className: 'my-toast',
  })}
>
  toast
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Use default settings</h3>
          <p>Can be used by mapping.</p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => myToast('Toast message here')}
            >
              toast
            </button>
          </div>
          <CommonHighlighter>
            {`import { toast } from 'react-interaction';

const myToast = () => {
  toast(message, {
    time: 5000,
    className: 'my-toast',
  });
};

export default myToast;`}
          </CommonHighlighter>
          <CommonHighlighter>
            {`<button
  type="button"
  onClick={() => myToast('Toast message here')}
>
  toast
</button>
`}
          </CommonHighlighter>
        </div>

        <h2 id="notice">Notice</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                notice('Congrats!\nYour upload successfully done').then(() =>
                  console.log('closed'),
                )
              }
            >
              Basic notice
            </button>
          </div>
          <CommonHighlighter>
            {`<button
  type="button"
  className="example-button"
  onClick={() => notice('Congrats! Your upload successfully done').then(() => console.log('closed'))}
>
  Basic notice
</button>
`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Custom style</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                notice('This is a notice message', {
                  dimmedClassName: 'my-notice-dimmed',
                  dimmedStyle: {
                    background: 'none'
                  },
                  contentClassName: 'my-notice-content',
                  contentStyle: {
                    backgroundColor: 'rgba(253, 143, 147, 0.8)'
                  },
                  messageClassName: 'my-notice-message',
                  messageStyle: {
                    color: '#fff',
                    fontSize: 20,
                  },
                  okClassName: 'my-notice-ok',
                  okStyle: {
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'transparent',
                    color: '#fff'
                  },
                  okText: 'Yes',
                })
              }
            >
              Notice
            </button>
          </div>
          <CommonHighlighter>
            {`<button
  type="button"
  className="example-button"
  onClick={() =>
    notice('This is a notice message', {
      dimmedClassName: 'my-notice-dimmed',
      dimmedStyle: {
        background: 'none'
      },
      contentClassName: 'my-notice-content',
      contentStyle: {
        backgroundColor: 'rgba(253, 143, 147, 0.8)'
      },
      messageClassName: 'my-notice-message',
      messageStyle: {
        color: '#fff',
        fontSize: 20,
      },
      okClassName: 'my-notice-ok',
      okStyle: {
        border: '1px solid rgba(255, 255, 255, 0.4)',
        backgroundColor: 'transparent',
        color: '#fff'
      },
      okText: 'Yes',
    })
  }
>
  Notice
</button>`}
          </CommonHighlighter>
        </div>

        <h2 id="check">Check</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <p>Check returns Promise&lt;boolean&gt;</p>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() => check('Are you sure?').then(console.log)}
            >
              Basic check
            </button>
          </div>
          <CommonHighlighter>
            {`<button type="button" onClick={() => {
  check('Are you sure?').then(console.log);
}}>
  Basic notice
</button>`}
          </CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Custom style</h3>
          <div className="playground">
            <button
              type="button"
              className="example-button"
              onClick={() =>
                check('Are you sure?', {
                  dimmedClassName: 'my-check-dimmed',
                  dimmedStyle: {
                    background: 'none'
                  },
                  contentClassName: 'my-check-content',
                  contentStyle: {
                    backgroundColor: 'rgba(253, 143, 147, 0.8)'
                  },
                  messageClassName: 'my-check-message',
                  messageStyle: {
                    color: '#fff',
                    fontSize: 20,
                  },
                  okClassName: 'my-check-ok',
                  okStyle: {
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'transparent',
                    color: '#fff'
                  },
                  okText: 'Yes',
                  cancelClassName: 'my-check-cancel',
                  cancelStyle: {
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: 'transparent',
                    color: '#fff'
                  },
                  cancelText: 'No',
                }).then(console.log)
              }
            >
              Check
            </button>
          </div>
          <CommonHighlighter>
            {`<button
type="button"
className="example-button"
onClick={() =>
  check('Are you sure?', {
    dimmedClassName: 'my-check-dimmed',
    dimmedStyle: {
      background: 'none'
    },
    contentClassName: 'my-check-content',
    contentStyle: {
      backgroundColor: 'rgba(253, 143, 147, 0.8)'
    },
    messageClassName: 'my-check-message',
    messageStyle: {
      color: '#fff',
      fontSize: 20,
    },
    okClassName: 'my-check-ok',
    okStyle: {
      border: '1px solid rgba(255, 255, 255, 0.4)',
      backgroundColor: 'transparent',
      color: '#fff'
    },
    okText: 'Yes',
    cancelClassName: 'my-check-cancel',
    cancelStyle: {
      border: '1px solid rgba(255, 255, 255, 0.4)',
      backgroundColor: 'transparent',
      color: '#fff'
    },
    cancelText: 'No',
  }).then(console.log)
}
>
Check
</button>`}
          </CommonHighlighter>
        </div>

        <h2 id="tooltip">Tooltip</h2>
        <div className="example-area">
          <h3>Basic usage</h3>
          <p>The location of the tooltip is calculated automatically.</p>
          <div className="playground">
            <Tooltip message="Basic tooltip message">
              <button type="button" className="example-button">
                Basic tooltip
              </button>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Long description
            <Tooltip message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. \n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.">
              <span role="img" aria-label="tip">💡</span>
            ️</Tooltip>
          </div>
          <CommonHighlighter>{`<Tooltip message="Basic tooltip message">
  <button type="button" className="example-button">
    Basic tooltip
  </button>
</Tooltip>`}</CommonHighlighter>
          <CommonHighlighter>{`Long description
<Tooltip message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. \\n Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.">
  <span role="img" aria-label="tip">💡</span>
️</Tooltip>`}</CommonHighlighter>
        </div>

        <div className="example-area">
          <h3>Custom style</h3>
          <p>The location of the tooltip is calculated automatically.</p>
          <div className="playground">
            <Tooltip
              message="My custom tooltip"
              messageStyle={{ backgroundColor: 'rgba(253, 143, 147, 0.9)', fontSize: 16 }}
              messageClassName="my-tooltip-message"
            >
              <button type="button" className="example-button">
                Custom style tooltip
              </button>
            </Tooltip>
          </div>
          <CommonHighlighter>{`<Tooltip
  message="My custom tooltip"
  messageStyle={{ backgroundColor: 'rgba(253, 143, 147, 0.9)' }}
  messageClassName="my-tooltip-message"
>
  <button type="button" className="example-button">
    Custom style tooltip
  </button>
</Tooltip>`}</CommonHighlighter>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/almond-bongbong"
          >
            https://github.com/almond-bongbong
          </a>
        </div>
      </footer>
    </Fragment>
  );
}
