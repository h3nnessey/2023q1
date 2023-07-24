import './styles.css';
import { Store } from './store';
import { App } from './components/app';
import { ErrorMessage } from './components/error-message';

Store.init()
  .then(() => {
    const app = new App(document.body);
    app.render();
  })
  .catch(() => {
    document.body.append(new ErrorMessage().node);
  });
