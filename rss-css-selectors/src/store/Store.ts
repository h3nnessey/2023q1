import { Lesson } from '../types';
import { lessons } from '../data/lessons';
import { LessonNode } from '../data/LessonNode';
import { HtmlViewer } from '../components/htmlViewer/HtmlViewer';
import { CssEditor } from '../components/cssEditor/CssEditor';
import { Table } from '../components/table/Table';
import { App } from '../index';

export class Store {
  static lessons: Lesson[] = lessons;
  static currentLesson: Lesson = lessons[8];
  static currentLessonNodes: LessonNode[] = Store.currentLesson.nodes;
  static currentLessonAnswer: string = Store.currentLesson.answer;

  static app: App;
  static htmlViewer: HtmlViewer;
  static cssEditor: CssEditor;
  static cardsTable: Table;

  static updateCurrentLesson(newLesson: Lesson) {
    Store.currentLesson = newLesson;
    Store.currentLessonNodes = newLesson.nodes;
    Store.currentLessonAnswer = newLesson.answer;
  }
}
