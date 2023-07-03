/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 850:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 284:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 138:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 119:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 454:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 161:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 55:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 412:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 194:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 665:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 48:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 307:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 42:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const classNames = {
    htmlViewer: {
        root: 'html-viewer',
        markup: 'html',
        element: {
            pl20: 'pl-20',
            ct: 'ct',
        },
        activeElement: 'active',
    },
    table: {
        root: 'table',
        element: {
            ct: 'ct',
            correctAnswer: 'correct-answer',
        },
    },
    lineNumbers: {
        root: 'line-numbers',
        element: 'line-numbers__item',
    },
    cssEditor: {
        root: 'css-editor',
        inputs: 'css-editor__inputs',
        textInput: 'css-editor__text-input',
        button: 'css-editor__button',
    },
};
exports["default"] = classNames;


/***/ }),

/***/ 265:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
__webpack_require__(850);
const BaseComponent_1 = __webpack_require__(733);
const LessonTarget_1 = __webpack_require__(968);
const GameInfo_1 = __webpack_require__(460);
const LessonSelector_1 = __webpack_require__(433);
const Table_1 = __webpack_require__(639);
const HtmlViewer_1 = __webpack_require__(999);
const CssEditor_1 = __webpack_require__(66);
const Footer_1 = __webpack_require__(561);
const Store_1 = __webpack_require__(365);
const Header_1 = __webpack_require__(973);
class App extends BaseComponent_1.BaseComponent {
    constructor(container) {
        super({ tagName: 'main', classNames: ['game'] });
        this.container = container;
        const btn = new BaseComponent_1.BaseComponent({ tagName: 'button', html: '<span>⩥<span>', classNames: ['game-info__toggle'] });
        // match media чтобы на лоу резе не было открыто сразу
        btn.addEventListener('click', (event) => {
            if (event instanceof MouseEvent) {
                if (this.gameInfo.node.classList.contains('hidden')) {
                    this.gameInfo.node.classList.remove('hidden');
                    btn.setHtml('<span>⩥<span>');
                }
                else {
                    this.gameInfo.node.classList.add('hidden');
                    btn.setHtml('<span>⩤<span>');
                }
            }
        });
        this.footer = new Footer_1.Footer();
        this.header = new Header_1.Header();
        this.firstColumn = new BaseComponent_1.BaseComponent({ classNames: ['game__column'], parent: this });
        this.secondColumn = new BaseComponent_1.BaseComponent({ classNames: ['game__column'], parent: this });
        this.firstColumn.appendChild(this.header);
        this.lessonTarget = new LessonTarget_1.LessonTarget(this.firstColumn);
        this.table = new Table_1.Table(this.firstColumn);
        this.cssEditor = new CssEditor_1.CssEditor(this.firstColumn);
        this.htmlViewer = new HtmlViewer_1.HtmlViewer(this.firstColumn);
        this.secondColumn.appendChild(btn);
        this.gameInfo = new GameInfo_1.GameInfo(this.secondColumn);
        this.lessonSelector = new LessonSelector_1.LessonSelector(this.gameInfo);
        Store_1.Store.setElements({
            app: this,
            cardsTable: this.table,
            htmlViewer: this.htmlViewer,
            cssEditor: this.cssEditor,
            levelSelector: this.lessonSelector,
        });
        this.node.addEventListener('rerender', (event) => {
            if (event instanceof CustomEvent) {
                this.rerender(event.detail.lesson);
            }
        });
    }
    render() {
        this.table.render();
        this.cssEditor.render();
        this.htmlViewer.render();
        this.container.append(this.node, this.footer.node);
    }
    rerender(newLesson) {
        Store_1.Store.updateCurrentLesson(newLesson);
        this.lessonTarget.rerender();
        this.lessonSelector.rerender();
        this.gameInfo.render();
        this.table.render();
        this.htmlViewer.render();
    }
}
exports.App = App;


/***/ }),

/***/ 733:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
const constants_1 = __webpack_require__(37);
class BaseComponent {
    constructor({ tagName = 'div', classNames = [], parent, text, html }) {
        this.parent = null;
        this.classNames = [];
        this.element = document.createElement(tagName);
        this.tag = tagName;
        this.addClass(...classNames);
        if (parent) {
            this.parent = parent;
            parent.appendChild(this);
        }
        if (text) {
            this.setTextContent(text);
        }
        if (html) {
            this.setHtml(html);
        }
    }
    append(children) {
        children.forEach((child) => this.appendChild(child));
    }
    appendChild(children) {
        this.element.appendChild(children.node);
    }
    get node() {
        return this.element;
    }
    get parentElement() {
        return this.parent;
    }
    setAttribute(key, value) {
        this.element.setAttribute(key, value);
    }
    getAttribute(key) {
        return this.element.getAttribute(key);
    }
    addClass(...classNames) {
        this.element.classList.add(...classNames);
        this.classNames.push(...classNames);
        this.classNames = Array.from(new Set(this.classNames));
    }
    hasClass(className) {
        return this.classNames.includes(className);
    }
    removeClass(className) {
        this.classNames.filter((clName) => clName !== className);
        this.element.classList.remove(className);
    }
    get tagName() {
        return this.tag;
    }
    insertTextNodes(config) {
        config.forEach(([where, data]) => {
            this.element.insertAdjacentText(where, data);
        });
    }
    setHtml(html) {
        this.element.innerHTML = '';
        this.element.insertAdjacentHTML('afterbegin', html);
    }
    setTextContent(text) {
        this.element.textContent = text;
    }
    delete() {
        this.element.remove();
    }
    addEventListener(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }
    getNodeClassName() {
        const classes = this.classNames.filter((className) => {
            return !constants_1.CSS_CLASSES_TO_EXCLUDE.includes(className);
        });
        return `${classes.length ? '.' + classes.join(' ') : ''}`;
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ 66:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEditor = void 0;
__webpack_require__(138);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const LineNumbers_1 = __webpack_require__(236);
const CssEditorInputs_1 = __webpack_require__(105);
class CssEditor extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: [classNames_1.default.cssEditor.root], parent });
        this.cssEditorHeader = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['css-editor__header'],
            parent: this,
            html: '<span>CSS Editor</span><span>style.css</span>',
        });
        this.cssEditorRow = new BaseComponent_1.BaseComponent({ classNames: ['css-editor__row'], parent: this });
        this.lineNumbers = new LineNumbers_1.LineNumbers(this.cssEditorRow);
        this.cssEditorInputs = new CssEditorInputs_1.CssEditorInputs(this.cssEditorRow);
    }
    render() { }
}
exports.CssEditor = CssEditor;


/***/ }),

/***/ 105:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEditorInputs = void 0;
__webpack_require__(284);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const CssEditorTextInput_1 = __webpack_require__(476);
const cssEditorButton_1 = __webpack_require__(846);
class CssEditorInputs extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: [classNames_1.default.cssEditor.inputs], parent });
        this.cssEditorTextInput = new CssEditorTextInput_1.CssEditorTextInput(this);
        this.cssEditorButton = new cssEditorButton_1.CssEditorButton(this.cssEditorTextInput, this);
    }
}
exports.CssEditorInputs = CssEditorInputs;


/***/ }),

/***/ 846:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEditorButton = void 0;
__webpack_require__(357);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
class CssEditorButton extends BaseComponent_1.BaseComponent {
    constructor(cssEditorTextInput, parent) {
        super({ tagName: 'button', classNames: [classNames_1.default.cssEditor.button], parent });
        this.cssEditorTextInput = cssEditorTextInput;
        this.insertTextNodes([['afterbegin', 'Enter']]);
        this.addEventListener('click', (event) => {
            if (event instanceof MouseEvent) {
                try {
                    const input = this.cssEditorTextInput.node;
                    const selected = Store_1.Store.htmlViewer.node.querySelectorAll(`.html ${input.value.trim()}`);
                    let html = '';
                    selected.forEach((el) => {
                        el.classList.add('selected');
                        html += el.innerHTML;
                    });
                    console.log(html === Store_1.Store.currentLessonAnswer ? 'You WIN!' : 'Wrong selector');
                }
                catch (err) {
                    console.log('Not valid css-selector');
                }
            }
        });
    }
}
exports.CssEditorButton = CssEditorButton;


/***/ }),

/***/ 476:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CssEditorTextInput = void 0;
__webpack_require__(484);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
class CssEditorTextInput extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ tagName: 'input', classNames: [classNames_1.default.cssEditor.textInput], parent });
        this.setAttribute('type', 'text');
        this.addEventListener('keydown', (event) => {
            // add prevent cheating handlers (like select .target)
            if (event instanceof KeyboardEvent && event.key === 'Enter') {
                try {
                    const node = this.node;
                    const selected = Store_1.Store.cardsTable.node.querySelectorAll(`${node.value.trim()}`);
                    let answer = '';
                    Array.from(selected).forEach((el) => {
                        answer += el.outerHTML;
                    });
                    const isWin = answer === Store_1.Store.currentLessonAnswer;
                    if (isWin) {
                        Store_1.Store.cardsTable.node.dispatchEvent(new CustomEvent('win'));
                        node.value = '';
                    }
                    else {
                        Store_1.Store.cardsTable.node.dispatchEvent(new CustomEvent('wrong-answer'));
                    }
                }
                catch (err) {
                    Store_1.Store.cardsTable.node.dispatchEvent(new CustomEvent('wrong-answer'));
                }
            }
        });
    }
}
exports.CssEditorTextInput = CssEditorTextInput;


/***/ }),

/***/ 561:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Footer = void 0;
__webpack_require__(119);
const BaseComponent_1 = __webpack_require__(733);
class Footer extends BaseComponent_1.BaseComponent {
    constructor() {
        super({ tagName: 'footer', classNames: ['footer'], html: '<span>h3nnessey © 2023</span>' });
    }
}
exports.Footer = Footer;


/***/ }),

/***/ 460:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameInfo = void 0;
__webpack_require__(454);
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
const LevelSelectorToggle_1 = __webpack_require__(246);
class GameInfo extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: ['game-info'], parent });
        this.gameInfoRow = new BaseComponent_1.BaseComponent({ classNames: ['game-info__row'], parent: this });
        this.lessonNumber = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['game-info__lesson-number'],
            parent: this.gameInfoRow,
            html: `<span>Lesson ${Store_1.Store.currentLesson.id + 1} of ${Store_1.Store.lessons.length}</span>`,
        });
        this.levelSelectorToggle = new LevelSelectorToggle_1.LevelSelectorToggle(this.gameInfoRow);
        this.title = new BaseComponent_1.BaseComponent({
            tagName: 'h2',
            classNames: ['game-info__title'],
            parent: this,
            text: Store_1.Store.currentLesson.title,
        });
        this.subtitle = new BaseComponent_1.BaseComponent({
            tagName: 'h3',
            classNames: ['game-info__subtitle'],
            parent: this,
            text: Store_1.Store.currentLesson.subtitle,
        });
        this.selector = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['game-info__selector'],
            parent: this,
            html: `Syntax: ${Store_1.Store.currentLesson.selector}`,
        });
        this.description = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['game-info__description'],
            parent: this,
            html: Store_1.Store.currentLesson.description,
        });
        this.example = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['game-info__example'],
            parent: this,
            html: Store_1.Store.currentLesson.example,
        });
    }
    render() {
        this.lessonNumber.setHtml(`Lesson ${Store_1.Store.currentLesson.id + 1} of ${Store_1.Store.lessons.length}`);
        this.title.setTextContent(Store_1.Store.currentLesson.title);
        this.subtitle.setTextContent(Store_1.Store.currentLesson.subtitle);
        this.selector.setHtml(`Syntax: ${Store_1.Store.currentLesson.selector}`);
        this.description.setHtml(Store_1.Store.currentLesson.description);
        this.example.setHtml(Store_1.Store.currentLesson.example);
        this.levelSelectorToggle.removeClass('active');
    }
}
exports.GameInfo = GameInfo;


/***/ }),

/***/ 973:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Header = void 0;
__webpack_require__(161);
const BaseComponent_1 = __webpack_require__(733);
class Header extends BaseComponent_1.BaseComponent {
    constructor() {
        super({ tagName: 'header', classNames: ['header'], html: '<span>Header</span>' });
    }
}
exports.Header = Header;


/***/ }),

/***/ 999:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlViewer = void 0;
__webpack_require__(412);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const HtmlViewerMarkup_1 = __webpack_require__(261);
const LineNumbers_1 = __webpack_require__(236);
class HtmlViewer extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: [classNames_1.default.htmlViewer.root], parent });
        this.htmlViewerHeader = new BaseComponent_1.BaseComponent({
            tagName: 'p',
            classNames: ['html-viewer__header'],
            parent: this,
            html: '<span>HTML Viewer</span><span>cards.html</span>',
        });
        this.htmlViewerRow = new BaseComponent_1.BaseComponent({ classNames: ['html-viewer__row'], parent: this });
        this.lineNumbers = new LineNumbers_1.LineNumbers(this.htmlViewerRow);
        this.htmlViewerMarkup = new HtmlViewerMarkup_1.HtmlViewerMarkup(this.htmlViewerRow);
    }
    render() {
        this.htmlViewerMarkup.render();
    }
}
exports.HtmlViewer = HtmlViewer;


/***/ }),

/***/ 261:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlViewerMarkup = void 0;
__webpack_require__(946);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const HtmlViewerMarkupElement_1 = __webpack_require__(918);
const Store_1 = __webpack_require__(365);
class HtmlViewerMarkup extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({
            classNames: [classNames_1.default.htmlViewer.markup],
            parent,
        });
        this.elements = [];
        this.node.addEventListener('mouse-in', (event) => {
            var _a;
            if (event instanceof CustomEvent) {
                this.elements.forEach((element) => element.removeClass('active'));
                (_a = this.node.querySelector(event.detail.selector)) === null || _a === void 0 ? void 0 : _a.classList.add('active');
            }
        });
        this.node.addEventListener('mouse-out', (event) => {
            if (event instanceof CustomEvent) {
                this.elements.forEach((element) => element.removeClass('active'));
            }
        });
    }
    createHtmlViewerDom(nodeList, parent) {
        const nodes = [];
        nodeList.forEach((node, index) => {
            const htmlViewerItem = new HtmlViewerMarkupElement_1.HtmlViewerMarkupElement(node, parent, this.elements, index);
            if (node.children) {
                this.createHtmlViewerDom(node.children, htmlViewerItem);
            }
            htmlViewerItem.insertText(node);
            nodes.push(htmlViewerItem);
            this.elements.push(htmlViewerItem);
        });
        parent.append(nodes);
    }
    render() {
        this.node.innerHTML = '';
        this.elements.forEach((element) => element.delete());
        this.createHtmlViewerDom(Store_1.Store.currentLessonNodes, this);
        this.insertTextNodes([
            ['afterbegin', `<div class="cards">`],
            ['beforeend', '</div>'],
        ]);
    }
}
exports.HtmlViewerMarkup = HtmlViewerMarkup;


/***/ }),

/***/ 918:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HtmlViewerMarkupElement = void 0;
__webpack_require__(55);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const constants_1 = __webpack_require__(37);
const Store_1 = __webpack_require__(365);
class HtmlViewerMarkupElement extends BaseComponent_1.BaseComponent {
    constructor(node, parent, htmlViewerElements, index) {
        super({
            tagName: node.tagName,
            classNames: node.classNames
                .filter((className) => className !== constants_1.LESSON_TARGET_CLASS)
                .concat(Object.values(classNames_1.default.htmlViewer.element)),
            parent,
        });
        this.htmlViewerElements = htmlViewerElements;
        this.index = index;
        this.attributes = [];
        this.setNodeAttributes(node.classNames, node.id);
        this.setAttribute('data-index', index.toString());
        this.setHoverHandler();
    }
    setHoverHandler() {
        this.addEventListener('mouseover', (event) => {
            event.stopPropagation();
            this.htmlViewerElements.forEach((el) => el.removeClass(classNames_1.default.htmlViewer.activeElement));
            this.addClass(classNames_1.default.htmlViewer.activeElement);
            let current = this.parentElement;
            let selector = this.tagName +
                this.getNodeClassName() +
                (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
                (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '');
            while (current) {
                if (current.hasClass(classNames_1.default.htmlViewer.markup)) {
                    break;
                }
                selector +=
                    ' ' +
                        current.tagName +
                        (current.getAttribute('id') ? '#' + current.getAttribute('id') : '') +
                        (current.getAttribute('data-index') ? `[data-index="${current.getAttribute('data-index')}"]` : '');
                current = current.parentElement;
            }
            selector = selector.split(' ').reverse().join(' ');
            console.log(selector);
            Store_1.Store.cardsTable.node.dispatchEvent(new CustomEvent('mouse-in', {
                detail: {
                    selector: selector,
                },
            }));
        });
        this.addEventListener('mouseleave', () => {
            this.htmlViewerElements.forEach((el) => el.removeClass(classNames_1.default.htmlViewer.activeElement));
            Store_1.Store.cardsTable.node.dispatchEvent(new CustomEvent('mouse-out'));
        });
    }
    insertText(node) {
        const nodeAttributes = this.attributes.length ? ' ' + this.attributes.join(' ') : '';
        if (node.children) {
            this.insertTextNodes([
                ['afterbegin', `<${node.tagName}${nodeAttributes}>`],
                ['beforeend', `</${node.tagName}>`],
            ]);
        }
        else {
            this.insertTextNodes([['afterbegin', `<${node.tagName}${nodeAttributes} />`]]);
        }
    }
    setNodeAttributes(classNames, id) {
        if (classNames) {
            classNames.forEach((className) => {
                if (className === constants_1.LESSON_TARGET_CLASS)
                    return;
                this.addClass(className);
                this.attributes.push(`class="${className}"`);
            });
        }
        if (id) {
            this.setAttribute('id', id);
            this.attributes.push(`id="${id}"`);
        }
    }
}
exports.HtmlViewerMarkupElement = HtmlViewerMarkupElement;


/***/ }),

/***/ 433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonSelector = void 0;
__webpack_require__(271);
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
const LessonSelectorElement_1 = __webpack_require__(419);
class LessonSelector extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ tagName: 'ul', classNames: ['lesson-selector', 'hidden'], parent });
        this.elements = [];
        new BaseComponent_1.BaseComponent({ tagName: 'p', classNames: ['lesson-selector__title'], parent: this, text: 'Select level' });
        Store_1.Store.lessons.forEach((lesson) => {
            const element = new LessonSelectorElement_1.LessonSelectorElement(lesson.id, this.elements, this);
            this.elements.push(element);
        });
    }
    rerender() {
        this.elements.forEach((element) => {
            if (element.id === Store_1.Store.currentLesson.id) {
                element.addClass('current');
            }
            else {
                element.removeClass('current');
            }
        });
    }
}
exports.LessonSelector = LessonSelector;


/***/ }),

/***/ 419:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonSelectorElement = void 0;
__webpack_require__(209);
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
class LessonSelectorElement extends BaseComponent_1.BaseComponent {
    constructor(id, lessonSelectorElements, parent) {
        super({ tagName: 'li', classNames: ['lesson-selector__item'], parent });
        this.id = id;
        this.lessonSelectorElements = lessonSelectorElements;
        this.lesson = Store_1.Store.lessons.find((lesson) => lesson.id === id);
        new BaseComponent_1.BaseComponent({
            tagName: 'span',
            classNames: ['lesson-selector__item_text'],
            parent: this,
            html: `${id + 1}. ${this.lesson.title}: ${this.lesson.selector}`,
        });
        if (this.id === Store_1.Store.currentLesson.id)
            this.addClass('current');
        this.addEventListener('click', (event) => {
            if (event instanceof MouseEvent) {
                this.lessonSelectorElements.forEach((element) => element.removeClass('current'));
                Store_1.Store.levelSelector.addClass('hidden');
                this.addClass('current');
                const selectedLesson = Store_1.Store.lessons.find((lesson) => lesson.id === this.id);
                Store_1.Store.app.node.dispatchEvent(new CustomEvent('rerender', {
                    detail: {
                        lesson: selectedLesson,
                    },
                }));
            }
        });
    }
}
exports.LessonSelectorElement = LessonSelectorElement;


/***/ }),

/***/ 246:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LevelSelectorToggle = void 0;
__webpack_require__(608);
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
class LevelSelectorToggle extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({
            tagName: 'button',
            classNames: ['level-selector__toggle'],
            parent,
            text: '⫼',
        });
        this.addEventListener('click', (event) => {
            if (event instanceof MouseEvent) {
                Store_1.Store.levelSelector.node.classList.toggle('hidden');
                this.node.classList.toggle('active');
            }
        });
    }
}
exports.LevelSelectorToggle = LevelSelectorToggle;


/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonTarget = void 0;
__webpack_require__(797);
const BaseComponent_1 = __webpack_require__(733);
const Store_1 = __webpack_require__(365);
class LessonTarget extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: ['lesson-target'], parent });
        this.heading = new BaseComponent_1.BaseComponent({
            tagName: 'h1',
            classNames: ['lesson-target__title'],
            text: Store_1.Store.currentLesson.target,
            parent: this,
        });
    }
    rerender() {
        this.heading.setTextContent(Store_1.Store.currentLesson.target);
    }
}
exports.LessonTarget = LessonTarget;


/***/ }),

/***/ 236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineNumbers = void 0;
__webpack_require__(194);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const constants_1 = __webpack_require__(37);
class LineNumbers extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ tagName: 'ul', classNames: [classNames_1.default.lineNumbers.root], parent });
        for (let i = 0; i < constants_1.LINE_NUMBERS_COUNT; i += 1) {
            const li = new BaseComponent_1.BaseComponent({ tagName: 'li', classNames: [classNames_1.default.lineNumbers.element], parent: this });
            li.insertTextNodes([['afterbegin', `${i + 1}`]]);
        }
    }
}
exports.LineNumbers = LineNumbers;


/***/ }),

/***/ 639:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Table = void 0;
__webpack_require__(665);
const classNames_1 = __importDefault(__webpack_require__(42));
const Store_1 = __webpack_require__(365);
const BaseComponent_1 = __webpack_require__(733);
const TableElement_1 = __webpack_require__(198);
class Table extends BaseComponent_1.BaseComponent {
    constructor(parent) {
        super({ classNames: [classNames_1.default.table.root], parent });
        this.elements = [];
        this.node.addEventListener('mouse-in', (event) => {
            var _a;
            if (event instanceof CustomEvent) {
                this.elements.forEach((element) => element.removeClass('hovered'));
                (_a = this.node.querySelector(event.detail.selector)) === null || _a === void 0 ? void 0 : _a.classList.add('hovered');
            }
        });
        this.node.addEventListener('mouse-out', (event) => {
            if (event instanceof CustomEvent) {
                this.elements.forEach((element) => element.removeClass('hovered'));
            }
        });
        this.node.addEventListener('win', (event) => {
            if (event instanceof CustomEvent) {
                this.addClass('win');
                const currentId = Store_1.Store.currentLesson.id === Store_1.Store.lessons.length - 1 ? 0 : Store_1.Store.currentLesson.id + 1;
                setTimeout(() => {
                    Store_1.Store.app.node.dispatchEvent(new CustomEvent('rerender', {
                        detail: {
                            lesson: Store_1.Store.lessons.find((lesson) => lesson.id === currentId),
                        },
                    }));
                    this.removeClass('win');
                }, 1000);
            }
        });
        this.node.addEventListener('wrong-answer', (event) => {
            if (event instanceof CustomEvent) {
                this.addClass('wrong-answer');
                setTimeout(() => {
                    this.removeClass('wrong-answer');
                }, 500);
            }
        });
    }
    createTableDom(nodeList, parent) {
        const nodes = [];
        nodeList.forEach((node, index) => {
            const tableElement = new TableElement_1.TableElement(node, parent, this.elements, index);
            if (node.children) {
                this.createTableDom(node.children, tableElement);
            }
            nodes.push(tableElement);
            this.elements.push(tableElement);
        });
        parent.append(nodes);
    }
    render() {
        this.elements.forEach((element) => element.delete());
        this.createTableDom(Store_1.Store.currentLessonNodes, this);
    }
}
exports.Table = Table;


/***/ }),

/***/ 198:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableElement = void 0;
__webpack_require__(48);
const classNames_1 = __importDefault(__webpack_require__(42));
const BaseComponent_1 = __webpack_require__(733);
const constants_1 = __webpack_require__(37);
const Store_1 = __webpack_require__(365);
class TableElement extends BaseComponent_1.BaseComponent {
    constructor(node, parent, tableElements, index) {
        super({ tagName: node.tagName, classNames: node.classNames.concat([classNames_1.default.table.element.ct]), parent });
        this.tableElements = tableElements;
        this.index = index;
        this.setNodeAttributes(node.classNames, node.id);
        this.setAttribute('data-index', index.toString());
        this.setHoverHandler();
    }
    setNodeAttributes(classNames, id) {
        if (classNames) {
            classNames.forEach((className) => {
                if (className === constants_1.LESSON_TARGET_CLASS)
                    return;
                this.addClass(className);
            });
        }
        if (id) {
            this.setAttribute('id', id);
        }
    }
    setHoverHandler() {
        this.addEventListener('mouseover', (event) => {
            event.stopPropagation();
            this.tableElements.forEach((el) => el.removeClass('hovered'));
            this.addClass('hovered');
            let current = this.parentElement;
            let selector = this.tagName +
                this.getNodeClassName() +
                (this.getAttribute('id') ? '#' + this.getAttribute('id') : '') +
                (this.getAttribute('data-index') ? `[data-index="${this.getAttribute('data-index')}"]` : '');
            while (current) {
                if (current.hasClass('table')) {
                    break;
                }
                selector +=
                    ' ' +
                        current.tagName +
                        (current.getAttribute('id') ? '#' + current.getAttribute('id') : '') +
                        (current.getAttribute('data-index') ? `[data-index="${current.getAttribute('data-index')}"]` : '');
                current = current.parentElement;
            }
            selector = selector.split(' ').reverse().join(' ');
            Store_1.Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(new CustomEvent('mouse-in', {
                detail: {
                    selector: selector,
                },
            }));
        });
        this.addEventListener('mouseleave', () => {
            this.tableElements.forEach((el) => el.removeClass('hovered'));
            Store_1.Store.htmlViewer.htmlViewerMarkup.node.dispatchEvent(new CustomEvent('mouse-out'));
        });
    }
}
exports.TableElement = TableElement;


/***/ }),

/***/ 37:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LINE_NUMBERS_COUNT = exports.LESSON_TARGET_CLASS = exports.CSS_CLASSES_TO_EXCLUDE = void 0;
exports.CSS_CLASSES_TO_EXCLUDE = ['active', 'pl-20', 'ct', 'hovered', 'target'];
exports.LESSON_TARGET_CLASS = 'target';
exports.LINE_NUMBERS_COUNT = 20;


/***/ }),

/***/ 924:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonNode = void 0;
class LessonNode {
    constructor(tagName, children = null, classNames = [], id = null) {
        this.tagName = tagName;
        this.children = children;
        this.classNames = classNames;
        this.id = id;
    }
}
exports.LessonNode = LessonNode;


/***/ }),

/***/ 0:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lessons = void 0;
const types_1 = __webpack_require__(230);
const LessonNode_1 = __webpack_require__(924);
exports.lessons = [
    {
        id: 0,
        title: 'Type Selector',
        subtitle: 'Selects all elements of specific type (tag name)',
        selector: '<span class="text-code">T</span>',
        description: 'Selects all elements of type <span class="text-code">T</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">queen</span> selects all elements of type <span class="text-code">queen</span>',
        target: `Select all ${types_1.CardRanks.Ace} cards`,
        answer: '<ace class="target clubs ct" data-index="0"></ace><ace class="target hearts ct" data-index="1"></ace><ace class="target diamonds ct" data-index="2"></ace><ace class="target spades ct" data-index="3"></ace>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Hearts]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Diamonds]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades]),
        ],
    },
    {
        id: 1,
        title: 'ID Selector',
        subtitle: 'Selects all elements with an specific ID',
        selector: '<span class="text-code">#T</span>',
        description: 'Selects all elements with <span class="text-code">id="T"</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">#main</span> selects all elements with <span class="text-code">id="main"</span>',
        answer: '<jack class="target spades ct" id="blurred" data-index="3"></jack>',
        target: `Select a ${types_1.LessonNodeAttributes.Id} card`,
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.CardSuits.Diamonds]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Jack, null, [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Three, null, [types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Jack, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades], types_1.LessonNodeAttributes.Id),
        ],
    },
    {
        id: 2,
        title: 'Class Selector',
        subtitle: 'Selects all elements with a specific class',
        selector: '<span class="text-code">.T</span>',
        description: 'Selects all elements with a <span class="text-code">class="T"</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">.active</span> selects all elements which contains <span class="text-code">class="active"</span>',
        target: `Select all ${types_1.CardSuits.Clubs} cards`,
        answer: '<four class="target clubs ct" data-index="1"></four><nine class="target clubs ct" data-index="2"></nine>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Five, null, [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Four, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Nine, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.CardSuits.Spades]),
        ],
    },
    {
        id: 3,
        title: 'Descendant Selector',
        subtitle: 'Select an elements inside of another element',
        selector: '<span class="text-code">T K</span>',
        description: 'Selects all elements of type <span class="text-code">K</span> inside of <span class="text-code">T</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">ul li</span> selects all <span class="text-code">li</span> elements that are inside <span class="text-code">ul</span> element',
        answer: '<ace class="target diamonds ct" data-index="0"><ace class="target spades ct" data-index="0"></ace></ace><ace class="target spades ct" data-index="0"></ace>',
        target: `Select all ${types_1.CardRanks.Ace} cards inside of ${types_1.CardRanks.King}`,
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Queen, [new LessonNode_1.LessonNode(types_1.CardRanks.Ace, [new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.CardSuits.Spades])], [types_1.CardSuits.Hearts])], [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Two, null, [types_1.CardSuits.Hearts]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [
                new LessonNode_1.LessonNode(types_1.CardRanks.Ace, [new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades])], [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Diamonds]),
            ], [types_1.CardSuits.Hearts]),
        ],
    },
    {
        id: 4,
        title: 'Combined Selector',
        subtitle: 'You can build a chain of any selectors',
        selector: '<span class="text-code">T.K</span>',
        description: 'Selects all elements of type <span class="text-code">T</span> with class <span class="text-code">K</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">button.active</span> selects all elements of type <span class="text-code">button</span> with class <span class="text-code">active</span>',
        answer: '<three class="target clubs ct" data-index="1"></three><three class="target clubs ct" data-index="3"></three>',
        target: `Select all ${types_1.CardRanks.Three} of ${types_1.CardSuits.Clubs} cards`,
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Three, null, [types_1.CardSuits.Diamonds]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Three, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.CardSuits.Clubs]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Three, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs]),
        ],
    },
    {
        id: 5,
        title: 'Combined Selector',
        subtitle: 'You can build a chain of any selectors',
        selector: '<span class="text-code">T#K</span>',
        description: 'Selects all elements of type <span class="text-code">T</span> with id <span class="text-code">K</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">button#primary</span> selects all elements of type <span class="text-code">button</span> with id <span class="text-code">primary</span>',
        answer: '<king class="target spades ct" id="blurred" data-index="2"></king>',
        target: `Select ${types_1.LessonNodeAttributes.Id} ${types_1.CardRanks.King} card`,
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.CardSuits.Diamonds]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades], types_1.LessonNodeAttributes.Id),
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.CardSuits.Hearts], types_1.LessonNodeAttributes.Id),
        ],
    },
    {
        id: 6,
        title: 'Combined Selector',
        subtitle: 'You can build a chain of any selectors',
        selector: '<span class="text-code">T#K.V</span>',
        description: 'Selects all elements of type <span class="text-code">T</span> with id <span class="text-code">K</span> and class <span class="text-code">V</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">div#target.container</span> selects all elements of type <span class="text-code">div</span> with id <span class="text-code">target</span> and class <span class="text-code">container</span>',
        target: `Select all ${types_1.LessonNodeAttributes.Id} ${types_1.CardRanks.Queen} of ${types_1.CardSuits.Spades}`,
        answer: '<queen class="target spades ct" id="blurred" data-index="0"></queen><queen class="target spades ct" id="blurred" data-index="2"></queen>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades], types_1.LessonNodeAttributes.Id),
            new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.CardSuits.Diamonds], types_1.LessonNodeAttributes.Id),
            new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades], types_1.LessonNodeAttributes.Id),
            new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.CardSuits.Spades]),
        ],
    },
    {
        id: 7,
        title: 'Selector with comma',
        subtitle: 'You can combine any selectors with commas and you will able to write less lines of code',
        selector: '<span class="text-code">T, K, V</span>',
        description: 'Select all elements of types <span class="text-code">T</span>, <span class="text-code">K</span> and <span class="text-code">V</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">h1, h2, h3</span> selects all elements of types <span class="text-code">h1</span>, <span class="text-code">h2</span> and <span class="text-code">h3</span>',
        target: 'Select all cards',
        answer: '<ace class="spades target ct" data-index="0"></ace><four class="clubs target ct" data-index="1"></four><five class="hearts target ct" data-index="2"></five><six class="diamonds target ct" data-index="3"></six><seven class="spades target ct" data-index="4"></seven>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.Ace, null, [types_1.CardSuits.Spades, types_1.LessonNodeAttributes.TargetClass]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Four, null, [types_1.CardSuits.Clubs, types_1.LessonNodeAttributes.TargetClass]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Five, null, [types_1.CardSuits.Hearts, types_1.LessonNodeAttributes.TargetClass]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Six, null, [types_1.CardSuits.Diamonds, types_1.LessonNodeAttributes.TargetClass]),
            new LessonNode_1.LessonNode(types_1.CardRanks.Seven, null, [types_1.CardSuits.Spades, types_1.LessonNodeAttributes.TargetClass]),
        ],
    },
    {
        id: 8,
        title: 'Universal Selector',
        subtitle: 'You can select all elements everywhere',
        selector: '<span class="text-code">*</span>',
        description: 'Selects all elements on the page',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">ul *</span> selects all elements inside of <span class="text-code">ul</span>',
        target: `Select all cards inside of ${types_1.CardRanks.King}`,
        answer: '<jack class="hearts target ct" data-index="0"></jack><five class="diamonds target ct" data-index="0"><three class="target clubs ct" data-index="0"></three></five><three class="target clubs ct" data-index="0"></three>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [new LessonNode_1.LessonNode(types_1.CardRanks.Jack, null, [types_1.CardSuits.Hearts, types_1.LessonNodeAttributes.TargetClass])], [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [
                new LessonNode_1.LessonNode(types_1.CardRanks.Five, [new LessonNode_1.LessonNode(types_1.CardRanks.Three, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Clubs])], [types_1.CardSuits.Diamonds, types_1.LessonNodeAttributes.TargetClass]),
            ], [types_1.CardSuits.Clubs]),
        ],
    },
    {
        id: 9,
        title: 'Empty selector',
        subtitle: 'You can select elements which do not have children',
        selector: '<span class="text-code">T:empty</span>',
        description: 'Selects all elements of type <span class="text-code">T</span> without children',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">ul:empty</span> selects all empty elements of type <span class="text-code">ul</span>',
        target: `Select all empty ${types_1.CardRanks.King} cards`,
        answer: '<king class="target spades ct" data-index="1"></king><king class="target spades ct" data-index="3"></king>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.CardSuits.Hearts])], [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [new LessonNode_1.LessonNode(types_1.CardRanks.Jack, null, [types_1.CardSuits.Clubs])], [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades]),
        ],
    },
    {
        id: 10,
        title: 'Negation selector',
        subtitle: 'Select all elements which do not match negation selector',
        selector: '<span class="text-code">T:not(K)</span>',
        description: 'Selects all elements of type <span class="text-code">T</span> which do not match selector <span class="text-code">K</span>',
        example: '<span class="text-bold">Example:</span> selector <span class="text-code">button:not(button.active)</span> selects all elements of type <span class="text-code">button</span> which do not have <span class="text-code">active</span> class',
        target: `Select all not empty ${types_1.CardRanks.King} cards`,
        answer: '<king class="target spades ct" data-index="0"><queen class="hearts ct" data-index="0"></queen></king><king class="target spades ct" data-index="2"><jack class="clubs ct" data-index="0"></jack></king>',
        nodes: [
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [new LessonNode_1.LessonNode(types_1.CardRanks.Queen, null, [types_1.CardSuits.Hearts])], [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, [new LessonNode_1.LessonNode(types_1.CardRanks.Jack, null, [types_1.CardSuits.Clubs])], [types_1.LessonNodeAttributes.TargetClass, types_1.CardSuits.Spades]),
            new LessonNode_1.LessonNode(types_1.CardRanks.King, null, [types_1.CardSuits.Spades]),
        ],
    },
];


/***/ }),

/***/ 365:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Store = void 0;
const lessons_1 = __webpack_require__(0);
const lesson = lessons_1.lessons[0];
class Store {
    static setElements({ app, htmlViewer, cssEditor, cardsTable, levelSelector, }) {
        Store.app = app;
        Store.htmlViewer = htmlViewer;
        Store.cssEditor = cssEditor;
        Store.cardsTable = cardsTable;
        Store.levelSelector = levelSelector;
    }
    static updateCurrentLesson(newLesson) {
        Store.currentLesson = newLesson;
        Store.currentLessonNodes = newLesson.nodes;
        Store.currentLessonAnswer = newLesson.answer;
    }
}
Store.lessons = lessons_1.lessons;
Store.currentLesson = lesson;
Store.currentLessonNodes = lesson.nodes;
Store.currentLessonAnswer = lesson.answer;
exports.Store = Store;


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LessonNodeAttributes = exports.CardSuits = exports.CardRanks = void 0;
var CardRanks;
(function (CardRanks) {
    CardRanks["Ace"] = "ace";
    CardRanks["Two"] = "two";
    CardRanks["Three"] = "three";
    CardRanks["Four"] = "four";
    CardRanks["Five"] = "five";
    CardRanks["Six"] = "six";
    CardRanks["Seven"] = "seven";
    CardRanks["Eight"] = "eight";
    CardRanks["Nine"] = "nine";
    CardRanks["Ten"] = "ten";
    CardRanks["Jack"] = "jack";
    CardRanks["Queen"] = "queen";
    CardRanks["King"] = "king";
})(CardRanks = exports.CardRanks || (exports.CardRanks = {}));
var CardSuits;
(function (CardSuits) {
    CardSuits["Clubs"] = "clubs";
    CardSuits["Hearts"] = "hearts";
    CardSuits["Spades"] = "spades";
    CardSuits["Diamonds"] = "diamonds";
})(CardSuits = exports.CardSuits || (exports.CardSuits = {}));
var LessonNodeAttributes;
(function (LessonNodeAttributes) {
    LessonNodeAttributes["Id"] = "blurred";
    LessonNodeAttributes["ClassName"] = "border-red";
    LessonNodeAttributes["TargetClass"] = "target";
})(LessonNodeAttributes = exports.LessonNodeAttributes || (exports.LessonNodeAttributes = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_require__(307);
const App_1 = __webpack_require__(265);
const app = new App_1.App(document.body);
app.render();

})();

/******/ })()
;