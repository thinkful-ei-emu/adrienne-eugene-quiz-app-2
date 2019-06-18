import $ from 'jquery';
import Renderer from './lib/Renderer';
// import Quiz from './Quiz';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
    };
  }

  _generateIntro() {
    return `
      <div>
        <p>
          Welcome to the Trivia Quiz
        </p>
        <p>
          Test your smarts and see how high you can score!
        </p>
      </div>
      <div class="buttons">
        <button class="start-quiz">Start Quiz</button>
      </div>
    `;
  }
 
  
  generateQuestion() {
    let currentQ = this.model.getCurrentQuestion();
    let answerSelection=null;
    for(let i = 0; i < currentQ.answers.length; i++){
      answerSelection += `<button class='generated_answer'>${currentQ.answers[i]}<button>`;
      // ask about .text
      //refer to Question.js for parameters
      return `
    <div>
    ${currentQ.text}
    ${answerSelection}
    <div class="buttons">
        <button class="next-question">Next Question</button>
      </div>
    </div>
    `;
    }}



  template() {
    let html = '';
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }

    if (this.model.asked.length > 0) {
      html = this.generateQuestion();
      
    }
    
    return html;
  }

  handleStart() {
    this.model.startGame();
  }
}

export default QuizDisplay;