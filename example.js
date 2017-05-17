import ReactDOM from 'react-dom';
import router from './components/Router/Router';

require('appirio-tech-api-schemas');

ReactDOM.render(router(), document.getElementById('root'));
