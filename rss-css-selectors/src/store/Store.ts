import { Lesson } from '../types';
import { lessons } from '../data/lessons';
import { LessonNode } from '../data/LessonNode';
import { HtmlViewer } from '../components/htmlViewer/HtmlViewer';
import { CssEditor } from '../components/cssEditor/CssEditor';
import { Table } from '../components/table/Table';
import { App } from '../components/app/App';
import { LessonSelector } from '../components/lessonSelector/LessonSelector';
import { GameState, getLocalStorage, setLocalStorage } from '../localStorage';

const { current, completed, helped }: GameState = getLocalStorage();

export class Store {
  static lessons: Lesson[] = lessons;
  static app: App;
  static htmlViewer: HtmlViewer;
  static cssEditor: CssEditor;
  static cardsTable: Table;
  static levelSelector: LessonSelector;

  static completed: number[] = completed;
  static helped: number[] = helped;

  static currentLesson: Lesson = lessons[current];
  static currentLessonNodes: LessonNode[] = lessons[current].nodes;
  static currentLessonAnswer: string = lessons[current].answer;

  static resetCompleted(id: number) {
    Store.completed = [];
    Store.helped = [];
    setLocalStorage({
      current: id,
      completed: [],
      helped: [],
    });
  }

  static setElements({
    app,
    htmlViewer,
    cssEditor,
    cardsTable,
    levelSelector,
  }: {
    app: App;
    htmlViewer: HtmlViewer;
    cssEditor: CssEditor;
    cardsTable: Table;
    levelSelector: LessonSelector;
  }): void {
    Store.app = app;
    Store.htmlViewer = htmlViewer;
    Store.cssEditor = cssEditor;
    Store.cardsTable = cardsTable;
    Store.levelSelector = levelSelector;
  }

  static updateCurrentLesson(newLesson: Lesson) {
    Store.currentLesson = newLesson;
    Store.currentLessonNodes = newLesson.nodes;
    Store.currentLessonAnswer = newLesson.answer;
  }
}
