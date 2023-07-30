import { Component } from '../component';
import classes from './styles.module.css';

export class ErrorMessage extends Component {
  constructor() {
    super({ tagName: 'h1', classNames: [classes.error], text: 'START THE MOCK SERVER FIRST 🐱‍👤' });
  }
}
