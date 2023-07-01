import { Lesson } from '../types';
import { lessons } from '../data/lessons';
import { LessonNode } from '../data/LessonNode';
import { HtmlViewer } from '../components/htmlViewer/HtmlViewer';
import { CssEditor } from '../components/cssEditor/CssEditor';
import { Table } from '../components/table/Table';
import { App } from '../index';

const lesson = lessons[10];

export class Store {
  static app: App;
  static htmlViewer: HtmlViewer;
  static cssEditor: CssEditor;
  static cardsTable: Table;

  static lessons: Lesson[] = lessons;
  static currentLesson: Lesson = lesson;
  static currentLessonNodes: LessonNode[] = lesson.nodes;
  static currentLessonAnswer: string = lesson.answer;

  static setElements({
    app,
    htmlViewer,
    cssEditor,
    cardsTable,
  }: {
    app: App;
    htmlViewer: HtmlViewer;
    cssEditor: CssEditor;
    cardsTable: Table;
  }): void {
    Store.app = app;
    Store.htmlViewer = htmlViewer;
    Store.cssEditor = cssEditor;
    Store.cardsTable = cardsTable;
  }

  static updateCurrentLesson(newLesson: Lesson) {
    Store.currentLesson = newLesson;
    Store.currentLessonNodes = newLesson.nodes;
    Store.currentLessonAnswer = newLesson.answer;
  }
}
