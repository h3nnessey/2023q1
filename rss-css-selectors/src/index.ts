import './style.css';
import { HtmlViewer } from './components/htmlViewer/HtmlViewer';
import { lessons } from './data/lessons';

const currentLesson = lessons[9];

const input = document.createElement('input') as HTMLInputElement;
const htmlViewer = new HtmlViewer(currentLesson.nodes);

htmlViewer.render();

input.type = 'text';

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    try {
      const selected = htmlViewer.node.querySelectorAll(`.html ${input.value.trim()}`);
      let html = '';

      selected.forEach((el) => {
        el.classList.add('selected');
        html += el.innerHTML;
      });

      console.log(html === currentLesson.answer ? 'You WIN!' : 'Wrong selector');
    } catch (err) {
      console.log('Not valid css-selector');
    }
  }
});

document.body.append(htmlViewer.node, input);
