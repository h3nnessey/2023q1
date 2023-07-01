import { CardRanks, CardSuits, Lesson, LessonNodeAttributes } from '../types';
import { LessonNode } from './LessonNode';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    selector: 'A',
    description:
      'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
    example: 'div selects all div elements.',
    answer: '&lt;rectangle /&gt;&lt;rectangle /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Hearts]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
    ],
  },
  {
    id: 2,
    title: 'Type Selector',
    subtitle: 'Select elements by their type',
    selector: 'A',
    description:
      'Selects all elements of type A. Type refers to the type of tag, so div, p and ul are all different element types.',
    example: 'div selects all div elements.',
    answer: '&lt;rectangle /&gt;&lt;rectangle /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(CardRanks.Jack, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
      new LessonNode(CardRanks.Queen, null, [CardSuits.Hearts]),
      new LessonNode(CardRanks.Jack, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds]),
    ],
  },
  {
    id: 3,
    title: 'ID Selector',
    subtitle: 'Select elements with an ID',
    selector: '#id',
    description: 'Selects the element with a specific id. You can also combine the ID selector with the type selector.',
    example: '#cool selects any element with id="cool"',
    answer: '&lt;square id="rounded" /&gt;',
    target: `Select ${LessonNodeAttributes.Id} card`,
    nodes: [
      new LessonNode(
        CardRanks.Five,
        null,
        [LessonNodeAttributes.TargetClass, CardSuits.Diamonds],
        LessonNodeAttributes.Id
      ),
      new LessonNode(CardRanks.Eight, null, [CardSuits.Clubs]),
      new LessonNode(CardRanks.Four, [new LessonNode(CardRanks.Queen, null, [CardSuits.Spades])], [CardSuits.Clubs]),
    ],
  },
  {
    id: 4,
    title: 'Descendant Selector',
    subtitle: 'Select an element inside another element',
    selector: 'A B',
    description: 'Selects all B inside of A. B is called a descendant because it is inside of another element.',
    example: 'p  strong selects all strong elements that are inside of any p',
    answer: '&lt;circle /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(
        CardRanks.King,
        [new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds])],
        [CardSuits.Hearts]
      ),
      new LessonNode(CardRanks.Nine, [new LessonNode(CardRanks.Ten, null, [CardSuits.Clubs])], [CardSuits.Spades]),
      new LessonNode(CardRanks.Three, null, [CardSuits.Hearts]),
    ],
  },
  {
    id: 5,
    title: '',
    subtitle: 'Combine the Descendant & ID Selectors',
    selector: '#id  A',
    description: 'You can combine any selector with the descendent selector.',
    example: '#cool span selects all span elements that are inside of elements with id="cool"',
    answer: '&lt;triangle /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(CardRanks.Two, [new LessonNode(CardRanks.Six, null, [CardSuits.Spades])], [CardSuits.Diamonds]),
      new LessonNode(CardRanks.King, null, [CardSuits.Clubs]),
      new LessonNode(
        CardRanks.Seven,
        [new LessonNode(CardRanks.Ten, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs])],
        [CardSuits.Hearts],
        LessonNodeAttributes.Id
      ),
    ],
  },
  {
    id: 6,
    title: 'Class Selector',
    subtitle: 'Select elements by their class',
    selector: '.classname',
    description:
      'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
    example: '.neato selects all elements with class="neato"',
    answer: '&lt;circle class="border-red" /&gt;&lt;circle class="border-red" /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(CardRanks.King, null, [CardSuits.Spades]),
      new LessonNode(CardRanks.Eight, null, [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]),
      new LessonNode(
        CardRanks.Five,
        [new LessonNode(CardRanks.Seven, null, [CardSuits.Clubs])],
        [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(CardRanks.Queen, [new LessonNode(CardRanks.Ace, null, [CardSuits.Spades])], [CardSuits.Hearts]),
    ],
  },
  {
    id: 7,
    title: '',
    subtitle: 'Combine the Class Selector',
    selector: 'A.className',
    description: 'You can combine the class selector with other selectors, like the type selector.',
    example: 'ul.important selects all ul elements that have class="important"',
    target: 'Select all Ace cards',
    answer: '&lt;hexagon class="border-red" /&gt;&lt;hexagon class="border-red" /&gt;',
    nodes: [
      new LessonNode(CardRanks.Seven, null, [CardSuits.Hearts]),
      new LessonNode(CardRanks.Three, null, [CardSuits.Spades]),
      new LessonNode(
        CardRanks.Four,
        [new LessonNode(CardRanks.Jack, null, [CardSuits.Diamonds])],
        [CardSuits.Diamonds]
      ),
      new LessonNode(
        CardRanks.King,
        [new LessonNode(CardRanks.Eight, null, [CardSuits.Hearts])],
        [CardSuits.Spades, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(CardRanks.King, [new LessonNode(CardRanks.Queen, null, [CardSuits.Clubs])], [CardSuits.Diamonds]),
    ],
  },
  {
    id: 8,
    title: '',
    subtitle: 'You can do it...',
    selector: 'Put your back into it!',
    description: 'Combine what you learned in the last few levels to solve this one!',
    example: '',
    answer: '&lt;hexagon class="border-red" /&gt;&lt;hexagon class="border-red" /&gt;',
    target: 'Select all Ace cards',
    nodes: [
      new LessonNode(
        CardRanks.Ace,
        [
          new LessonNode(
            CardRanks.Ace,
            [new LessonNode(CardRanks.Queen, null, [CardSuits.Hearts])],
            [CardSuits.Diamonds]
          ),
        ],
        [CardSuits.Clubs]
      ),
      new LessonNode(CardRanks.King, [new LessonNode(CardRanks.Eight, null, [CardSuits.Hearts])], [CardSuits.Spades]),
      new LessonNode(
        CardRanks.Jack,
        [new LessonNode(CardRanks.Queen, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds])],
        [CardSuits.Hearts]
      ),
      new LessonNode(
        CardRanks.Jack,
        [new LessonNode(CardRanks.Queen, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades])],
        [CardSuits.Hearts]
      ),
      new LessonNode(
        CardRanks.Jack,
        [new LessonNode(CardRanks.Queen, null, [CardSuits.Clubs], LessonNodeAttributes.Id)],
        [CardSuits.Spades]
      ),
    ],
  },
  {
    id: 9,
    title: 'Comma Combinator',
    subtitle: 'Combine, selectors, with... commas!',
    selector: 'A, B',
    description:
      'Thanks to Shatner technology, this selects all A and B elements. You can combine any selectors this way, and you can specify more than two.',
    example: 'p, .fun selects all p elements as well as all elements with class="fun"',
    target: 'Select all Ace cards',
    answer:
      '&lt;square&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/square&gt;&lt;rectangle&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/rectangle&gt;&lt;square&gt;<triangle class="pl-20 ct">&lt;triangle /&gt;</triangle>&lt;/square&gt;',
    nodes: [
      new LessonNode(CardRanks.Ten, null, [CardSuits.Diamonds]),
      new LessonNode(
        CardRanks.Ten,
        [new LessonNode(CardRanks.Two, null, [CardSuits.Spades])],
        [CardSuits.Clubs, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(
        CardRanks.Ten,
        [new LessonNode(CardRanks.Two, null, [CardSuits.Spades])],
        [CardSuits.Clubs, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(
        CardRanks.Ace,
        [new LessonNode(CardRanks.Two, null, [CardSuits.Spades])],
        [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(CardRanks.Queen, null, [CardSuits.Clubs]),
      new LessonNode(CardRanks.Ace, null, [CardSuits.Spades]),
    ],
  },
  {
    id: 10,
    title: 'The Universal Selector',
    subtitle: 'You can select everything!',
    selector: '*',
    description: 'You can select all elements with the universal selector!',
    example: 'p * selects any element inside all p elements.',
    target: 'Select all Ace cards',
    answer:
      '&lt;circle /&gt;&lt;square&gt;<hexagon class="border-red pl-20 ct">&lt;hexagon class="border-red" /&gt;</hexagon>&lt;/square&gt;&lt;hexagon class="border-red" /&gt;&lt;rectangle /&gt;&lt;rectangle&gt;<hexagon class="pl-20 ct">&lt;hexagon /&gt;</hexagon>&lt;/rectangle&gt;&lt;hexagon /&gt;&lt;square id="rounded" /&gt;',
    nodes: [
      new LessonNode(
        CardRanks.Jack,
        [new LessonNode(CardRanks.Jack, null, [CardSuits.Hearts, LessonNodeAttributes.TargetClass])],
        [CardSuits.Spades, LessonNodeAttributes.TargetClass]
      ),
      new LessonNode(
        CardRanks.Queen,
        [
          new LessonNode(
            CardRanks.Five,
            [new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs])],
            [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]
          ),
        ],
        [LessonNodeAttributes.TargetClass, CardSuits.Clubs]
      ),
      new LessonNode(CardRanks.King, null, [LessonNodeAttributes.TargetClass, CardSuits.Hearts]),
      new LessonNode(
        CardRanks.Ace,
        [new LessonNode(CardRanks.Eight, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds])],
        [LessonNodeAttributes.TargetClass, CardSuits.Hearts]
      ),
      new LessonNode(CardRanks.Nine, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
    ],
  },
];
