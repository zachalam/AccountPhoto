import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/home';

import logo from './assets/logo.png'
import 'semantic-ui-css/semantic.min.css';
import './assets/index.css';

ReactDOM.render(
    <div className={'container'}>
        <div className={'center'}>  
            <img src={logo} />
        </div>
        <Index />
    </div>, document.getElementById('root'));
