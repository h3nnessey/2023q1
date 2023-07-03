import './style.css';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LessonTarget } from '../lessonTarget/LessonTarget';
import { GameInfo } from '../gameInfo/GameInfo';
import { LessonSelector } from '../lessonSelector/LessonSelector';
import { Table } from '../table/Table';
import { HtmlViewer } from '../htmlViewer/HtmlViewer';
import { CssEditor } from '../cssEditor/CssEditor';
import { Footer } from '../footer/Footer';
import { Lesson } from '../../types';
import { Store } from '../../store/Store';
import { Header } from '../header/Header';

export class App extends BaseComponent {
  private readonly header: Header;
  private readonly footer: Footer;
  private readonly firstColumn: BaseComponent;
  private readonly secondColumn: BaseComponent;
  private readonly lessonTarget: LessonTarget;
  private readonly gameInfo: GameInfo;
  private readonly lessonSelector: LessonSelector;
  private readonly table: Table;
  private readonly htmlViewer: HtmlViewer;
  private readonly cssEditor: CssEditor;

  constructor(private container: HTMLElement) {
    super({ tagName: 'main', classNames: ['game'] });

    const btn = new BaseComponent({ tagName: 'button', html: '<span>⩥<span>', classNames: ['game-info__toggle'] });
    // match media чтобы на лоу резе не было открыто сразу
    btn.addEventListener('click', (event: Event) => {
      if (event instanceof MouseEvent) {
        if (this.gameInfo.node.classList.contains('hidden')) {
          this.gameInfo.node.classList.remove('hidden');
          btn.setHtml('<span>⩥<span>');
        } else {
          this.gameInfo.node.classList.add('hidden');
          btn.setHtml('<span>⩤<span>');
        }
      }
    });

    this.footer = new Footer();
    this.header = new Header();

    this.firstColumn = new BaseComponent({ classNames: ['game__column'], parent: this });
    this.secondColumn = new BaseComponent({ classNames: ['game__column'], parent: this });
    this.firstColumn.appendChild(this.header);
    this.lessonTarget = new LessonTarget(this.firstColumn);
    this.table = new Table(this.firstColumn);
    this.cssEditor = new CssEditor(this.firstColumn);
    this.htmlViewer = new HtmlViewer(this.firstColumn);
    this.firstColumn.appendChild(this.footer);

    this.secondColumn.appendChild(btn);

    this.gameInfo = new GameInfo(this.secondColumn);
    this.lessonSelector = new LessonSelector(this.gameInfo);

    Store.setElements({
      app: this,
      cardsTable: this.table,
      htmlViewer: this.htmlViewer,
      cssEditor: this.cssEditor,
      levelSelector: this.lessonSelector,
    });

    this.node.addEventListener('rerender', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.rerender(event.detail.lesson);
      }
    });
  }

  public render() {
    this.table.render();
    this.htmlViewer.render();

    this.container.append(this.node);
  }

  public rerender(newLesson: Lesson) {
    Store.updateCurrentLesson(newLesson);

    this.lessonTarget.rerender();
    this.lessonSelector.rerender();
    this.gameInfo.render();
    this.cssEditor.render();
    this.table.render();
    this.htmlViewer.render();
  }
}
