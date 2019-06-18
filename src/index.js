import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';


function main() {
  const q = new Quiz();
  const qDisplay = new QuizDisplay(q, '.display');
  const qStatus = new QuizStatus(q, '.status');
  window.q = q;  // adding `q` to `window`, so you can examine it in console
  // window.qDisplay = qDisplay;
  // window.qStatus = qStatus;
}

$(main);

