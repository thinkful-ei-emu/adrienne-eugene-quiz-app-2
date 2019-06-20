import Renderer from './lib/Renderer';
// import Quiz from './Quiz';

class QuizStatus extends Renderer {
  template() {
    // return some HTML here, utilizing `this.model`
  // High Score returns 0 if this.model.maxScore is null and this.model.maxScore if not null. 
    return `
      <div>
      Score: ${this.model.score}
      High Score: ${this.model.maxScore === null ? 0 : this.model.maxScore}
      Progress: ${this.model.progress}
      </div>
    `;
  }
}

export default QuizStatus;