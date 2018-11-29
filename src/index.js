import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// if (module.hot) {
//     module.hot.accept(App, () => {
//         const NextApp = App.default;
//         ReactDOM.render(
//             <NextApp />,
//             document.getElementById('root')
//         );
//     });
// }