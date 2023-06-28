import './style.css';
import { HtmlViewer } from './components/htmlViewer/HtmlViewer';
import { lessons } from './data/lessons';
import { BaseComponent } from './components/baseComponent/BaseComponent';
import { CssEditor } from './components/cssEditor/CssEditor';

const currentLesson = lessons[9];

class App extends BaseComponent {
  private readonly htmlViewer: HtmlViewer;
  private readonly cssEditor: CssEditor;

  constructor(private appContainer: HTMLElement) {
    super({ classNames: ['container'] });
    this.htmlViewer = new HtmlViewer(currentLesson.nodes, this);
    this.cssEditor = new CssEditor(currentLesson.answer, this.htmlViewer, this);
  }

  public render() {
    this.htmlViewer.render();
    this.cssEditor.render();

    this.appContainer.append(this.node);
  }
}

const app = new App(document.body);
app.render();
