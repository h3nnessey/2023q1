import { CardRanks, CardSuits, Lesson, LessonNodeAttributes } from '../types';
import { LessonNode } from './LessonNode';
import classNames from '../classNames';

export const lessons: Lesson[] = [
  {
    id: 0,
    title: 'Type Selector',
    subtitle: 'Selects all elements of specific type (tag name)',
    selector: '<span class="text-code">T</span>',
    description: 'Selects all elements of type <span class="text-code">T</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">queen</span> selects all elements of type <span class="text-code">queen</span>',
    target: `Select all ${CardRanks.Ace} cards`,
    help: CardRanks.Ace,
    answer:
      '<ace class="target clubs ct" data-index="0" data-html="<ace class=&quot;clubs&quot; />"></ace><ace class="target hearts ct" data-index="1" data-html="<ace class=&quot;hearts&quot; />"></ace><ace class="target diamonds ct" data-index="2" data-html="<ace class=&quot;diamonds&quot; />"></ace><ace class="target spades ct" data-index="3" data-html="<ace class=&quot;spades&quot; />"></ace>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
        new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Hearts]),
        new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Diamonds]),
        new LessonNode(CardRanks.Ace, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
      ]),
    ],
  },
  {
    id: 1,
    title: 'ID Selector',
    subtitle: 'Selects all elements with an specific ID',
    selector: '<span class="text-code">#T</span>',
    description: 'Selects all elements with <span class="text-code">id="T"</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">#main</span> selects all elements with <span class="text-code">id="main"</span>',
    help: `#${LessonNodeAttributes.Id}`,
    answer:
      '<jack class="target spades ct" id="corner" data-index="3" data-html="<jack class=&quot;spades&quot; id=&quot;corner&quot; />"></jack>',
    target: `Select a ${LessonNodeAttributes.Id} card`,
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.Ace, null, [CardSuits.Diamonds]),
        new LessonNode(CardRanks.Jack, null, [CardSuits.Spades]),
        new LessonNode(CardRanks.Three, null, [CardSuits.Clubs]),
        new LessonNode(
          CardRanks.Jack,
          null,
          [LessonNodeAttributes.TargetClass, CardSuits.Spades],
          LessonNodeAttributes.Id
        ),
      ]),
    ],
  },
  {
    id: 2,
    title: 'Class Selector',
    subtitle: 'Selects all elements with a specific class',
    selector: '<span class="text-code">.T</span>',
    description: 'Selects all elements with a <span class="text-code">class="T"</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">.active</span> selects all elements which contains <span class="text-code">class="active"</span>',
    target: `Select all ${CardSuits.Clubs} cards`,
    help: `.${CardSuits.Clubs}`,
    answer:
      '<four class="target clubs ct" data-index="1" data-html="<four class=&quot;clubs&quot; />"></four><nine class="target clubs ct" data-index="2" data-html="<nine class=&quot;clubs&quot; />"></nine>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.Five, null, [CardSuits.Spades]),
        new LessonNode(CardRanks.Four, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
        new LessonNode(CardRanks.Nine, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
        new LessonNode(CardRanks.Ace, null, [CardSuits.Spades]),
      ]),
    ],
  },
  {
    id: 3,
    title: 'Descendant Selector',
    subtitle: 'Select an elements inside of another element',
    selector: '<span class="text-code">T K</span>',
    description:
      'Selects all elements of type <span class="text-code">K</span> inside of <span class="text-code">T</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">ul li</span> selects all <span class="text-code">li</span> elements that are inside <span class="text-code">ul</span> element',
    help: `${CardRanks.King} ${CardRanks.Ace}`,
    answer:
      '<ace class="target diamonds ct" data-index="0" data-html="<ace class=&quot;diamonds&quot;></ace>"><ace class="target spades ct" data-index="0" data-html="<ace class=&quot;spades&quot; />"></ace></ace><ace class="target spades ct" data-index="0" data-html="<ace class=&quot;spades&quot; />"></ace>',
    target: `Select all ${CardRanks.Ace} cards inside of ${CardRanks.King}`,
    nodes: [
      new LessonNode('cards', [
        new LessonNode(
          CardRanks.Queen,
          [
            new LessonNode(
              CardRanks.Ace,
              [new LessonNode(CardRanks.Ace, null, [CardSuits.Spades])],
              [CardSuits.Hearts]
            ),
          ],
          [CardSuits.Spades]
        ),
        new LessonNode(CardRanks.Two, null, [CardSuits.Hearts]),
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
      ]),
    ],
  },
  {
    id: 4,
    title: 'Combined Selector',
    subtitle: 'You can build a chain of any selectors',
    selector: '<span class="text-code">T.K</span>',
    description:
      'Selects all elements of type <span class="text-code">T</span> with class <span class="text-code">K</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">button.active</span> selects all elements of type <span class="text-code">button</span> with class <span class="text-code">active</span>',
    help: `${CardRanks.Three}.${CardSuits.Clubs}`,
    answer:
      '<three class="target clubs ct" data-index="1" data-html="<three class=&quot;clubs&quot; />"></three><three class="target clubs ct" data-index="3" data-html="<three class=&quot;clubs&quot; />"></three>',
    target: `Select all ${CardRanks.Three} of ${CardSuits.Clubs} cards`,
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.Three, null, [CardSuits.Diamonds]),
        new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
        new LessonNode(CardRanks.King, null, [CardSuits.Clubs]),
        new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs]),
      ]),
    ],
  },
  {
    id: 5,
    title: 'Combined Selector',
    subtitle: 'You can build a chain of any selectors',
    selector: '<span class="text-code">T#K</span>',
    description:
      'Selects all elements of type <span class="text-code">T</span> with id <span class="text-code">K</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">button#primary</span> selects all elements of type <span class="text-code">button</span> with id <span class="text-code">primary</span>',
    help: `${CardRanks.King}#${LessonNodeAttributes.Id}`,
    answer:
      '<king class="target spades ct" id="corner" data-index="2" data-html="<king class=&quot;spades&quot; id=&quot;corner&quot; />"></king>',
    target: `Select ${LessonNodeAttributes.Id} ${CardRanks.King} card`,
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.King, null, [CardSuits.Spades]),
        new LessonNode(CardRanks.King, null, [CardSuits.Diamonds]),
        new LessonNode(
          CardRanks.King,
          null,
          [LessonNodeAttributes.TargetClass, CardSuits.Spades],
          LessonNodeAttributes.Id
        ),
        new LessonNode(CardRanks.Ace, null, [CardSuits.Hearts], LessonNodeAttributes.Id),
      ]),
    ],
  },
  {
    id: 6,
    title: 'Combined Selector',
    subtitle: 'You can build a chain of any selectors',
    selector: '<span class="text-code">T#K.V</span>',
    description:
      'Selects all elements of type <span class="text-code">T</span> with id <span class="text-code">K</span> and class <span class="text-code">V</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">div#target.container</span> selects all elements of type <span class="text-code">div</span> with id <span class="text-code">target</span> and class <span class="text-code">container</span>',
    target: `Select all ${LessonNodeAttributes.Id} ${CardRanks.Queen} of ${CardSuits.Spades}`,
    help: `${CardRanks.Queen}.${CardSuits.Spades}#${LessonNodeAttributes.Id}`,
    answer:
      '<queen class="target spades ct" id="corner" data-index="0" data-html="<queen class=&quot;spades&quot; id=&quot;corner&quot; />"></queen><queen class="target spades ct" id="corner" data-index="2" data-html="<queen class=&quot;spades&quot; id=&quot;corner&quot; />"></queen>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(
          CardRanks.Queen,
          null,
          [LessonNodeAttributes.TargetClass, CardSuits.Spades],
          LessonNodeAttributes.Id
        ),
        new LessonNode(CardRanks.Queen, null, [CardSuits.Diamonds], LessonNodeAttributes.Id),
        new LessonNode(
          CardRanks.Queen,
          null,
          [LessonNodeAttributes.TargetClass, CardSuits.Spades],
          LessonNodeAttributes.Id
        ),
        new LessonNode(CardRanks.Queen, null, [CardSuits.Spades]),
      ]),
    ],
  },
  {
    id: 7,
    title: 'Selector with comma',
    subtitle: 'You can combine any selectors with commas and you will able to write less lines of code',
    selector: '<span class="text-code">T, K, V</span>',
    description:
      'Select all elements of types <span class="text-code">T</span>, <span class="text-code">K</span> and <span class="text-code">V</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">h1, h2, h3</span> selects all elements of types <span class="text-code">h1</span>, <span class="text-code">h2</span> and <span class="text-code">h3</span>',
    target: 'Select all cards',
    help: `${CardRanks.Ace}, ${CardRanks.Four}, ${CardRanks.Five}, ${CardRanks.Six}, ${CardRanks.Seven}`,
    answer:
      '<ace class="spades target ct" data-index="0" data-html="<ace class=&quot;spades&quot; />"></ace><four class="clubs target ct" data-index="1" data-html="<four class=&quot;clubs&quot; />"></four><five class="hearts target ct" data-index="2" data-html="<five class=&quot;hearts&quot; />"></five><six class="diamonds target ct" data-index="3" data-html="<six class=&quot;diamonds&quot; />"></six><seven class="spades target ct" data-index="4" data-html="<seven class=&quot;spades&quot; />"></seven>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.Ace, null, [CardSuits.Spades, LessonNodeAttributes.TargetClass]),
        new LessonNode(CardRanks.Four, null, [CardSuits.Clubs, LessonNodeAttributes.TargetClass]),
        new LessonNode(CardRanks.Five, null, [CardSuits.Hearts, LessonNodeAttributes.TargetClass]),
        new LessonNode(CardRanks.Six, null, [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]),
        new LessonNode(CardRanks.Seven, null, [CardSuits.Spades, LessonNodeAttributes.TargetClass]),
      ]),
    ],
  },
  {
    id: 8,
    title: 'Universal Selector',
    subtitle: 'You can select all elements everywhere',
    selector: '<span class="text-code">*</span>',
    description: 'Selects all elements on the page',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">ul *</span> selects all elements inside of <span class="text-code">ul</span>',
    target: `Select all cards inside of ${CardRanks.King}`,
    help: `${CardRanks.King} *`,
    answer:
      '<jack class="hearts target ct" data-index="0" data-html="<jack class=&quot;hearts&quot; />"></jack><five class="diamonds target ct" data-index="0" data-html="<five class=&quot;diamonds&quot;></five>"><three class="target clubs ct" data-index="0" data-html="<three class=&quot;clubs&quot; />"></three></five><three class="target clubs ct" data-index="0" data-html="<three class=&quot;clubs&quot; />"></three>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(
          CardRanks.King,
          [new LessonNode(CardRanks.Jack, null, [CardSuits.Hearts, LessonNodeAttributes.TargetClass])],
          [CardSuits.Spades]
        ),
        new LessonNode(
          CardRanks.King,
          [
            new LessonNode(
              CardRanks.Five,
              [new LessonNode(CardRanks.Three, null, [LessonNodeAttributes.TargetClass, CardSuits.Clubs])],
              [CardSuits.Diamonds, LessonNodeAttributes.TargetClass]
            ),
          ],
          [CardSuits.Clubs]
        ),
      ]),
    ],
  },
  {
    id: 9,
    title: 'Empty selector',
    subtitle: 'You can select elements which do not have children',
    selector: '<span class="text-code">T:empty</span>',
    description: 'Selects all elements of type <span class="text-code">T</span> without children',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">ul:empty</span> selects all empty elements of type <span class="text-code">ul</span>',
    target: `Select all empty ${CardRanks.King} cards`,
    help: `${CardRanks.King}:empty`,
    answer:
      '<king class="target spades ct" data-index="1" data-html="<king class=&quot;spades&quot; />"></king><king class="target spades ct" data-index="3" data-html="<king class=&quot;spades&quot; />"></king>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(CardRanks.King, [new LessonNode(CardRanks.Queen, null, [CardSuits.Hearts])], [CardSuits.Spades]),
        new LessonNode(CardRanks.King, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
        new LessonNode(CardRanks.King, [new LessonNode(CardRanks.Jack, null, [CardSuits.Clubs])], [CardSuits.Spades]),
        new LessonNode(CardRanks.King, null, [LessonNodeAttributes.TargetClass, CardSuits.Spades]),
      ]),
    ],
  },
  {
    id: 10,
    title: 'Negation selector',
    subtitle: 'Select all elements which do not match negation selector',
    selector: '<span class="text-code">T:not(K)</span>',
    description:
      'Selects all elements of type <span class="text-code">T</span> which do not match selector <span class="text-code">K</span>',
    example:
      '<span class="text-bold">Example:</span> selector <span class="text-code">button:not(button.active)</span> selects all elements of type <span class="text-code">button</span> which do not have <span class="text-code">active</span> class',
    target: `Select all not empty ${CardRanks.King} cards`,
    help: `${CardRanks.King}:not(${CardRanks.King}:empty)`,
    answer:
      '<king class="target spades ct" data-index="0" data-html="<king class=&quot;spades&quot;></king>"><queen class="hearts ct" data-index="0" data-html="<queen class=&quot;hearts&quot; />"></queen></king><king class="target spades ct" data-index="2" data-html="<king class=&quot;spades&quot;></king>"><jack class="clubs ct" data-index="0" data-html="<jack class=&quot;clubs&quot; />"></jack></king>',
    nodes: [
      new LessonNode('cards', [
        new LessonNode(
          CardRanks.King,
          [new LessonNode(CardRanks.Queen, null, [CardSuits.Hearts])],
          [LessonNodeAttributes.TargetClass, CardSuits.Spades]
        ),
        new LessonNode(CardRanks.King, null, [CardSuits.Spades]),
        new LessonNode(
          CardRanks.King,
          [new LessonNode(CardRanks.Jack, null, [CardSuits.Clubs])],
          [LessonNodeAttributes.TargetClass, CardSuits.Spades]
        ),
        new LessonNode(CardRanks.King, null, [CardSuits.Spades]),
      ]),
    ],
  },
];
