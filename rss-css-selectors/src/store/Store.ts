import { Lesson } from '../types';
import { lessons } from '../data/lessons';
import { LessonNode } from '../data/LessonNode';
import { HtmlViewer } from '../components/htmlViewer/HtmlViewer';
import { CssEditor } from '../components/cssEditor/CssEditor';
import { Table } from '../components/table/Table';
import { App } from '../components/app/App';
import { LessonSelector } from '../components/lessonSelector/LessonSelector';

const lesson = lessons[3];

export class Store {
  static app: App;
  static htmlViewer: HtmlViewer;
  static cssEditor: CssEditor;
  static cardsTable: Table;
  static levelSelector: LessonSelector;

  static lessons: Lesson[] = lessons;
  static currentLesson: Lesson = lesson;
  static currentLessonNodes: LessonNode[] = lesson.nodes;
  static currentLessonAnswer: string = lesson.answer;

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
