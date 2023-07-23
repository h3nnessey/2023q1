import { Component } from '../component';

export class ErrorMessage extends Component {
  constructor() {
    super({ tagName: 'h1', classNames: ['error'], text: 'START THE MOCK SERVER FIRST 🐱‍👤' });
  }
}
