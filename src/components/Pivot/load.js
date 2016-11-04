const React = require('react');
const ReactDOM = require('react-dom');
const ReactPivot = require('./index.jsx');

export default function (el, opts) {
    ReactDOM.render(React.createElement(ReactPivot, opts), el);
}
