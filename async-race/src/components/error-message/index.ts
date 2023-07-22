import { Component } from '../component';

export class ErrorMessage extends Component {
  constructor() {
    super({ tagName: 'h1', classNames: ['error'], text: 'RUN MOCK SERVER FIRST 🐱‍👤' });
  }
}
