import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/home';

import logo from './assets/logo.png'
import 'semantic-ui-css/semantic.min.css';
import './assets/index.css';

ReactDOM.render(
    <div>
        <div className={'center'}>  
            <img src={logo} />
        </div>
        <div className={'spacer'} />
        <Index />
    </div>, document.getElementById('root'));
