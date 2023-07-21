import './styles.css';
import { Store } from './store';
import { App } from './components/app';

Store.initGarage()
  .then(() => {
    const app = new App(document.body);
    app.render();
  })
  .catch(() => console.log('Run mock server first'));
