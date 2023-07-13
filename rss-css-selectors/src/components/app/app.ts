import './style.css';
import { classNames } from './class-names';
import { BaseComponent } from '../base-component/base-component';
import { LevelTarget } from '../level-target/level-target';
import { LevelInfo } from '../level-info/level-info';
import { LevelSelector } from '../level-selector/level-selector';
import { Cards } from '../cards/cards';
import { HtmlViewer } from '../html-viewer/html-viewer';
import { CssEditor } from '../css-editor/css-editor';
import { Footer } from '../footer/footer';
import { Level } from '../../types';
import { Store } from '../../store';
import { Header } from '../header/header';
import { LevelInfoToggle } from '../level-info/level-info-toggle/level-info-toggle';
import { Column } from './app-column/column';
import { ResizeHandler } from './resize-handler/resize-handler';
import { CUSTOM_EVENTS } from '../../constants';

export class App extends BaseComponent {
  private readonly firstColumn: Column;
  private readonly secondColumn: Column;
  private readonly lessonTarget: LevelTarget;
  private readonly levelInfoToggle: LevelInfoToggle;
  public readonly levelInfo: LevelInfo;
  private readonly levelSelector: LevelSelector;
  private readonly cards: Cards;
  private readonly htmlViewer: HtmlViewer;
  private readonly cssEditor: CssEditor;
  private readonly resizeHandler: ResizeHandler;

  constructor(private container: HTMLElement) {
    super({ tagName: 'main', classNames: [classNames.game] });
    this.levelInfo = new LevelInfo();
    this.levelSelector = new LevelSelector();

    this.firstColumn = new Column(this);
    this.secondColumn = new Column(this, this.levelInfo, this.levelSelector);

    this.levelInfo.appendChild(this.levelSelector);

    this.lessonTarget = new LevelTarget();
    this.cards = new Cards();
    this.cssEditor = new CssEditor();
    this.htmlViewer = new HtmlViewer();

    this.firstColumn.append([
      new Header(),
      this.lessonTarget,
      this.cards,
      this.cssEditor,
      this.htmlViewer,
      new Footer(),
    ]);

    this.levelInfoToggle = new LevelInfoToggle(this.levelInfo);

    this.secondColumn.append([this.levelInfoToggle, this.levelInfo]);

    Store.setElements({
      app: this,
      cards: this.cards,
      htmlViewer: this.htmlViewer,
      cssEditor: this.cssEditor,
      levelSelector: this.levelSelector,
    });

    this.resizeHandler = new ResizeHandler(this.levelInfo, this.levelSelector);

    this.node.addEventListener(CUSTOM_EVENTS.RERENDER, (event: Event) => {
      if (event instanceof CustomEvent) {
        this.rerender(event.detail.level);
      }
    });
  }

  public render(): void {
    this.cards.render();
    this.htmlViewer.render();
    this.levelSelector.render();
    this.container.append(this.node);
  }

  public rerender(level: Level): void {
    Store.updateCurrentLevel(level);
    this.lessonTarget.rerender();
    this.levelSelector.render();
    this.levelInfo.render();
    this.cssEditor.render();
    this.cards.render();
    this.htmlViewer.render();
  }
}
