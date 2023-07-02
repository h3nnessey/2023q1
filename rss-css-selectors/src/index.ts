import './style.css';
import { HtmlViewer } from './components/htmlViewer/HtmlViewer';
import { BaseComponent } from './components/baseComponent/BaseComponent';
import { CssEditor } from './components/cssEditor/CssEditor';
import { Table } from './components/table/Table';
import { Store } from './store/Store';
import { GameInfo } from './components/gameInfo/GameInfo';
import { LessonSelector } from './components/lessonSelector/LessonSelector';
import { Lesson } from './types';
import { LessonTarget } from './components/lessonTarget/LessonTarget';

export class App extends BaseComponent {
  private readonly lessonTarget: LessonTarget;
  private readonly gameInfo: GameInfo;
  private readonly lessonSelector: LessonSelector;
  private readonly table: Table;
  private readonly htmlViewer: HtmlViewer;
  private readonly cssEditor: CssEditor;

  constructor(private appContainer: HTMLElement) {
    super({ tagName: 'main', classNames: ['container'] });

    this.lessonTarget = new LessonTarget(this);
    this.gameInfo = new GameInfo();
    this.lessonSelector = new LessonSelector();
    this.table = new Table(this);
    this.htmlViewer = new HtmlViewer(this);
    this.cssEditor = new CssEditor(this);

    Store.setElements({
      app: this,
      cardsTable: this.table,
      htmlViewer: this.htmlViewer,
      cssEditor: this.cssEditor,
    });

    this.node.addEventListener('rerender', (event: Event) => {
      if (event instanceof CustomEvent) {
        this.rerender(event.detail.lesson);
      }
    });
  }

  public render() {
    this.table.render();
    this.cssEditor.render();
    this.htmlViewer.render();

    this.appContainer.append(this.node, this.gameInfo.node, this.lessonSelector.node);
  }

  public rerender(newLesson: Lesson) {
    Store.updateCurrentLesson(newLesson);

    this.lessonTarget.rerender();
    this.gameInfo.render();
    this.table.render();
    this.htmlViewer.render();
  }
}

const app = new App(document.body);

app.render();
