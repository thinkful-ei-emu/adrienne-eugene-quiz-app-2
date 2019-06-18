import Renderer from './lib/Renderer';
import Quiz from './Quiz';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`

    return `
      <div>
      Score: ${this.model.score}
      High Score: ${this.model.scoreHistory}
      Progress: ${this.model.progress}
      </div>
    `;
  }
}

export default QuizStatus;