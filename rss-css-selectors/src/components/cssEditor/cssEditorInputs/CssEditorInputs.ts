import { BaseComponent } from '../../baseComponent/BaseComponent';
import { CssEditorTextInput } from './cssEditorTextInput/CssEditorTextInput';
import { HtmlViewer } from '../../htmlViewer/HtmlViewer';
import { CssEditorButton } from './cssEditorButton/cssEditorButton';

export class CssEditorInputs extends BaseComponent {
  private readonly cssEditorTextInput: CssEditorTextInput;
  private readonly cssEditorButton: CssEditorButton;

  constructor(htmlViewer: HtmlViewer, lessonAnswer: string, parent: BaseComponent) {
    super({ classNames: ['css-editor__inputs'], parent });
    this.cssEditorTextInput = new CssEditorTextInput(htmlViewer, lessonAnswer, this);
    this.cssEditorButton = new CssEditorButton(this.cssEditorTextInput, htmlViewer, lessonAnswer, this);
  }
}
