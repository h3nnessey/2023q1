import { CardRanks, CardSuits, Lesson, LessonNodeAttributes } from '../types';
import { LessonNode } from './LessonNode';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Type Selector',
    subtitle: 'Selects all elements of specific type (tag name)',
    selector: 'Syntax: <span class="text-code">T</span>',
    description: 'Selects all elements of type <span class="text-code">T</span>',
    example:
      'Selector <span class="text-code">queen</span> selects all elements of type <span class="text-code">queen</span>',
    target: `Select all ${CardRanks.Ace} cards`,
    answer:
      '<ace class="target clubs ct" data-index="0"></ace><ace class="target hearts ct" data-index="1"></ace><ace class="target diamonds ct" data-index="2"></ace><ace class="target spades ct" data-index="3"></ace>',
    nodes: [
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Hearts]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds]),
      new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
    ],
  },
  {
    id: 2,
    title: 'ID Selector',
    subtitle: 'Selects all elements with an specific ID',
    selector: 'Syntax: <span class="text-code">#T</span>',
    description: 'Selects all elements with <span class="text-code">id="T"</span>',
    example:
      'Selector <span class="text-code">#main</span> selects all elements with <span class="text-code">id="main"</span>',
    answer: '<jack class="target spades ct" id="blurred" data-index="3"></jack>',
    target: `Select a ${LessonNodeAttributes.Id} card`,
    nodes: [
      new LessonNode(CardRanks.Ace, null, [CardSuits.Diamonds]),
      new LessonNode(CardRanks.King, null, [CardSuits.Hearts]),
      new LessonNode(CardRanks.Three, null, [CardSuits.Clubs]),
      new LessonNode(
        CardRanks.Jack,
        null,
        [LessonNodeAttributes.TargetClass, CardSuits.Spades],
        LessonNodeAttributes.Id
      ),
    ],
  },
  {
    id: 3,
    title: 'Class Selector',
    subtitle: 'Selects all elements with a specific class',
    selector: 'Syntax: <span class="text-code">.T</span>',
    description: 'Selects all elements with a <span class="text-code">class="T"</span>',
    example:
      'Selector <span class="text-code">.active</span> selects all elements which contains <span class="text-code">class="active"</span>',
    target: `Select all ${CardSuits.Clubs} cards`,
    answer: '<four class="target clubs ct" data-index="1"></four><nine class="target clubs ct" data-index="2"></nine>',
    nodes: [
      new LessonNode(CardRanks.Five, null, [CardSuits.Spades]),
      new LessonNode(CardRanks.Four, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      new LessonNode(CardRanks.Nine, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      new LessonNode(CardRanks.Ace, null, [CardSuits.Spades]),
    ],
  },
  {
    id: 4,
    title: 'Descendant Selector',
    subtitle: 'Select an elements inside of another element',
    selector: '<span class="text-code">T K</span>',
    description:
      'Selects all elements of type <span class="text-code">K</span> inside of <span class="text-code">T</span>',
    example:
      '<span class="text-code">ul li</span> selects all <span class="text-code">li</span> elements that are inside <span class="text-code">ul</span> element',
    answer:
      '<ace class="target diamonds ct" data-index="0"><ace class="target spades ct" data-index="0"></ace></ace><ace class="target spades ct" data-index="0"></ace>',
    target: `Select all ${CardRanks.Ace} cards inside of ${CardRanks.King}`,
    nodes: [
      new LessonNode(
        CardRanks.Queen,
        [new LessonNode(CardRanks.Ace, [new LessonNode(CardRanks.Ace, null, [CardSuits.Spades])], [CardSuits.Hearts])],
        [CardSuits.Spades]
      ),
      new LessonNode(
        CardRanks.King,
        [
          new LessonNode(
            CardRanks.Ace,
            [new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades])],
            [LessonNodeAttributes.TargetClass, CardSuits.Diamonds]
          ),
        ],
        [CardSuits.Hearts]
      ),
    ],
  },
  {
    id: 5,
    title: 'Combined selector',
    subtitle: 'Combines the type and class selectors in single one',
    selector: 'Syntax: <span class="text-code">T.K</span>',
    description:
      'Selects all elements of type <span class="text-code">T</span> with class <span class="text-code">K</span>',
    example:
      'Selector <span class="text-code">button.active</span> selects all elements of type <span class="text-code">button</span> with class <span class="text-code">active</span>',
    answer:
      '<three class="target clubs ct" data-index="1"></three><three class="target clubs ct" data-index="3"></three>',
    target: `Select all ${CardRanks.Three} of ${CardSuits.Clubs}`,
    nodes: [
      new LessonNode(CardRanks.Three, null, [CardSuits.Diamonds]),
      new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      new LessonNode(CardRanks.King, null, [CardSuits.Clubs]),
      new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
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
