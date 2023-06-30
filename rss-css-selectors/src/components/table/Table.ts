import './style.css';
import classNames from '../../classNames';
import { Store } from '../../store/Store';
import { BaseComponent } from '../baseComponent/BaseComponent';
import { LessonNode } from '../../data/LessonNode';
import { TableElement } from './tableElement/TableElement';

export class Table extends BaseComponent {
  private elements: BaseComponent[] = [];

  constructor(parent: BaseComponent) {
    super({ classNames: [classNames.table.root], parent });
  }

  private createTableDom(nodeList: LessonNode[], parent: BaseComponent): void {
    const nodes: BaseComponent[] = [];

    nodeList.forEach((node, index) => {
      const tableElement = new TableElement(node, parent, this.elements, index);

      if (node.children) {
        this.createTableDom(node.children, tableElement);
      }

      nodes.push(tableElement);
      this.elements.push(tableElement);
    });

    parent.append(nodes);
  }

  public render() {
    this.createTableDom(Store.currentLessonNodes, this);
  }
}
