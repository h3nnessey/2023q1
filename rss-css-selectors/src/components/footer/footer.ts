import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../baseComponent/BaseComponent';

export class Footer extends BaseComponent {
  private githubLink: BaseComponent;
  private copyrightText: BaseComponent;
  private rssLink: BaseComponent;

  constructor() {
    super({ tagName: 'footer', classNames: [classNames.footer] });

    this.githubLink = new BaseComponent({
      tagName: 'a',
      classNames: [classNames.githubLInk, classNames.link],
      text: 'Github',
      parent: this,
    });

    this.githubLink.setAttribute('href', 'https://github.com/h3nnessey');
    this.githubLink.setAttribute('title', 'My Github');

    this.copyrightText = new BaseComponent({
      tagName: 'p',
      classNames: [classNames.copyright],
      text: 'h3nnessey © 2023',
      parent: this,
    });

    this.rssLink = new BaseComponent({
      tagName: 'a',
      classNames: [classNames.rssLink, classNames.link],
      parent: this,
    });

    this.rssLink.setAttribute('href', 'https://rs.school/js/');
    this.rssLink.setAttribute('title', 'Курс «JavaScript/Front-end»');
  }
}
