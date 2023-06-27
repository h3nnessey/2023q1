import { Lesson, LessonNodeAttributes, Shapes } from '../types';
import { LessonNode } from './LessonNode';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    selector: 'A',
    description:
      'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
    examples: ['div selects all div elements.', 'p selects all p elements.'],
    answer: '&lt;rectangle /&gt;&lt;rectangle /&gt;',
    nodes: [
      new LessonNode(Shapes.Rectangle, null, [LessonNodeAttributes.TargetClass]),
      new LessonNode(Shapes.Rectangle, null, [LessonNodeAttributes.TargetClass]),
    ],
  },
  {
    id: 2,
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    selector: 'A',
    description:
      'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
    examples: ['div selects all div elements.', 'p selects all p elements.'],
    answer: '&lt;rectangle /&gt;&lt;rectangle /&gt;',
    nodes: [
      new LessonNode(Shapes.Rectangle, null, [LessonNodeAttributes.TargetClass]),
      new LessonNode(Shapes.Square),
      new LessonNode(Shapes.Rectangle, null, [LessonNodeAttributes.TargetClass]),
    ],
  },
  {
    id: 3,
    title: 'ID Selector',
    subtitle: 'Select elements with an ID',
    selector: '#id',
    description: 'Selects the element with a specific id. You can also combine the ID selector with the type selector.',
    examples: ['#cool selects any element with id="cool"', 'ul#long selects ul id="long"'],
    answer: '&lt;square id="rounded" /&gt;',
    nodes: [
      new LessonNode(Shapes.Square, null, [LessonNodeAttributes.TargetClass], LessonNodeAttributes.Id),
      new LessonNode(Shapes.Square),
      new LessonNode(Shapes.Rectangle),
    ],
  },
  {
    id: 4,
    title: 'Descendant Selector',
    subtitle: 'Select an element inside another element',
    selector: 'A B',
    description: 'Selects all B inside of A. B is called a descendant because it is inside of another element.',
    examples: [
      'p  strong selects all strong elements that are inside of any p',
      '#rounded  span selects any span elements that are inside of the element with id="rounded"',
    ],
    answer: '&lt;circle /&gt;',
    nodes: [
      new LessonNode(Shapes.Rectangle),
      new LessonNode(Shapes.Square, [new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.TargetClass])]),
      new LessonNode(Shapes.Circle),
    ],
  },
  {
    id: 5,
    title: '',
    subtitle: 'Combine the Descendant & ID Selectors',
    selector: '#id  A',
    description: 'You can combine any selector with the descendent selector.',
    examples: ['#cool span selects all span elements that are inside of elements with id="cool"'],
    answer: '&lt;triangle /&gt;',
    nodes: [
      new LessonNode(Shapes.Rectangle, [new LessonNode(Shapes.Hexagon)]),
      new LessonNode(
        Shapes.Square,
        [new LessonNode(Shapes.Triangle, null, [LessonNodeAttributes.TargetClass])],
        [],
        LessonNodeAttributes.Id
      ),
      new LessonNode(Shapes.Square, [new LessonNode(Shapes.Triangle)]),
    ],
  },
  {
    id: 6,
    title: 'Class Selector',
    subtitle: 'Select elements by their class',
    selector: '.classname',
    description:
      'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    examples: ['.neato selects all elements with class="neato"'],
    answer: '&lt;circle class="border-red" /&gt;&lt;circle class="border-red" /&gt;',
    nodes: [
      new LessonNode(Shapes.Circle),
      new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      new LessonNode(Shapes.Square, [
        new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      ]),
      new LessonNode(Shapes.Square),
    ],
  },
  {
    id: 7,
    title: '',
    subtitle: 'Combine the Class Selector',
    selector: 'A.className',
    description: 'You can combine the class selector with other selectors, like the type selector.',
    examples: [
      'ul.important selects all ul elements that have class="important"',
      '#big.wide selects all elements with id="big" that also have class="wide"',
    ],
    answer: '&lt;hexagon class="border-red" /&gt;&lt;hexagon class="border-red" /&gt;',
    nodes: [
      new LessonNode(Shapes.Circle),
      new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.ClassName]),
      new LessonNode(Shapes.Rectangle, [
        new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      ]),
      new LessonNode(Shapes.Square, [new LessonNode(Shapes.Hexagon)]),
      new LessonNode(Shapes.Square, [
        new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      ]),
    ],
  },
  {
    id: 8,
    title: '',
    subtitle: 'You can do it...',
    selector: 'Put your back into it!',
    description: 'Combine what you learned in the last few levels to solve this one!',
    examples: [],
    answer: '&lt;hexagon class="border-red" /&gt;&lt;hexagon class="border-red" /&gt;',
    nodes: [
      new LessonNode(Shapes.Rectangle, [new LessonNode(Shapes.Hexagon)]),
      new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.ClassName]),
      new LessonNode(Shapes.Rectangle, [
        new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      ]),
      new LessonNode(Shapes.Rectangle, [new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.ClassName])]),
      new LessonNode(Shapes.Rectangle, [
        new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName]),
      ]),
    ],
  },
  {
    id: 9,
    title: 'Comma Combinator',
    subtitle: 'Combine, selectors, with... commas!',
    selector: 'A, B',
    description:
      'Thanks to Shatner technology, this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.',
    examples: [
      'p, .fun selects all p elements as well as all elements with class="fun"',
      'a, p, div selects all a, p and div elements',
    ],
    answer:
      '&lt;square&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/square&gt;&lt;rectangle&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/rectangle&gt;&lt;square&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/square&gt;',
    nodes: [
      new LessonNode(Shapes.Triangle, null, [LessonNodeAttributes.ClassName]),
      new LessonNode(Shapes.Triangle),
      new LessonNode(Shapes.Square, [new LessonNode(Shapes.Triangle)], [LessonNodeAttributes.TargetClass]),
      new LessonNode(Shapes.Rectangle, [new LessonNode(Shapes.Triangle)], [LessonNodeAttributes.TargetClass]),
      new LessonNode(Shapes.Square, [new LessonNode(Shapes.Triangle)], [LessonNodeAttributes.TargetClass]),
      new LessonNode(Shapes.Triangle),
      new LessonNode(Shapes.Triangle, null, [LessonNodeAttributes.ClassName]),
    ],
  },
  {
    id: 10,
    title: 'The Universal Selector',
    subtitle: 'You can select everything!',
    selector: '*',
    description: 'You can select all elements with the universal selector!',
    examples: ['p * selects any element inside all p elements.'],
    answer:
      '&lt;circle /&gt;&lt;square&gt;<hexagon class="border-red pl-20 ct">&lt;hexagon class="border-red" /&gt;</hexagon>&lt;/square&gt;&lt;hexagon class="border-red" /&gt;&lt;rectangle /&gt;&lt;rectangle&gt;<hexagon class="pl-20 ct">&lt;hexagon /&gt;</hexagon>&lt;/rectangle&gt;&lt;hexagon /&gt;&lt;square id="rounded" /&gt;',
    nodes: [
      new LessonNode(Shapes.Circle, null, [LessonNodeAttributes.TargetClass]),
      new LessonNode(
        Shapes.Square,
        [new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass, LessonNodeAttributes.ClassName])],
        [LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(Shapes.Rectangle, null, [LessonNodeAttributes.TargetClass]),
      new LessonNode(
        Shapes.Rectangle,
        [new LessonNode(Shapes.Hexagon, null, [LessonNodeAttributes.TargetClass])],
        [LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(Shapes.Square, null, [LessonNodeAttributes.TargetClass], LessonNodeAttributes.Id),
    ],
  },
];
