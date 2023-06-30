import './style.css';
import { HtmlViewer } from './components/htmlViewer/HtmlViewer';
import { BaseComponent } from './components/baseComponent/BaseComponent';
import { CssEditor } from './components/cssEditor/CssEditor';
import { Table } from './components/table/Table';
import { Store } from './store/Store';
import { GameInfo } from './components/gameInfo/GameInfo';
import { LessonSelector } from './components/lessonSelector/LessonSelector';

export class App extends BaseComponent {
  private readonly gameInfo: GameInfo;
  private readonly lessonSelector: LessonSelector;
  private readonly table: Table;
  private readonly htmlViewer: HtmlViewer;
  private readonly cssEditor: CssEditor;

  constructor(private appContainer: HTMLElement) {
    super({ tagName: 'main', classNames: ['container'] });

    this.gameInfo = new GameInfo(this);
    this.lessonSelector = new LessonSelector(this);
    this.table = new Table(this);
    this.htmlViewer = new HtmlViewer(this);
    this.cssEditor = new CssEditor(this);

    Store.app = this;
    Store.cardsTable = this.table;
    Store.htmlViewer = this.htmlViewer;
    Store.cssEditor = this.cssEditor;
  }

  public render() {
    this.table.render();
    this.cssEditor.render();
    this.htmlViewer.render();

    this.appContainer.append(this.node);

    this.node.addEventListener('rerender', (event: Event) => {
      if (event instanceof CustomEvent) {
        console.log(`rerender was emitted with ${JSON.stringify(event.detail)}`);
      }
    });
  }
}

const app = new App(document.body);
app.render();
