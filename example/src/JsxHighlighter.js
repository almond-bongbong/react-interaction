import React from 'react';
import prism from 'react-syntax-highlighter/dist/cjs/styles/prism/prism';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const JsxHighlighter = ({ children }) => {
  return (
    <SyntaxHighlighter language="jsx" style={prism} customStyle={{ padding: 20 }}>
      {children}
    </SyntaxHighlighter>
  );
};

export default JsxHighlighter;
