import React from 'react'; // 负责逻辑控制，数据 -> VDOM
import ReactDOM from 'react-dom'; // 渲染实际DOM，VDOM => DOM
import './index.css';
import App from './App';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

