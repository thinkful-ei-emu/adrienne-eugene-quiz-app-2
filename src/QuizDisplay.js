import $ from 'jquery';
import Renderer from './lib/Renderer';
// import Quiz from './Quiz';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .submit-button': 'handleSubmit',
      'click .next-question': 'handleNextQuestion'
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
    let answerSelection='';
    for(let i = 0; i < currentQ.answers.length; i++){
      answerSelection += `<input type="radio" name='generated_answer' value="${currentQ.answers[i]}">${currentQ.answers[i]}</button>`;
      // ask about .text
      //refer to Question.js for parameters 
    }
    return `
    <div>
    ${currentQ.text}
    ${answerSelection}
   
        <button class="submit-button" id="submit-answer">Submit Answer</button>
    </div>
    `;
  }

  generateAnswerScreen() {
    let currentQ = this.model.getCurrentQuestion();
    let answerSelected= $('input[name=generated_answer]:checked').val();;

    if (answerSelected === currentQ.correctAnswer) {
      return `
      <div>
        <p> ${currentQ.text}</p>
        <p> You got it!</p>
        <p> The correct answer was: ${currentQ.correctAnswer}</p>
      </div>
      <button class="next-question">Next Question</button>
     `;
    } else {
      return `
    <div>
      <p> ${currentQ.text}</p>
      <p> Sorry, that's incorrect. You answered: ${answerSelected}</p>
      <p> The correct answer was: ${currentQ.correctAnswer}</p>
    </div>
    <button class="next-question">Next Question</button>
    `;
    }
  }

  generateNextQuestion() {
    let currentQ = this.model.getCurrentQuestion();
    let answerSelection='';
    for(let i = 0; i < currentQ.answers.length; i++){
      answerSelection += `<input type="radio" name='generated_answer' value="${currentQ.answers[i]}">${currentQ.answers[i]}</button>`;
    }
    return `
    <div>
    ${currentQ.text}
    ${answerSelection}
   
        <button class="submit-button" id="submit-answer">Submit Answer</button>
    </div>
    `;
  }

  // finishScreen() {
  //   if (this.model.score > this.model.highScore) {
  //     return `
  //     <div> 
  //      <p>Good job!</p>
  //      <p>Your final score was ${this.model.score} out of 5.</p>
  //      <p>That's a new high score!</p>
  //      <button class="play-again">Play again</button>
  //     </div>
  //   `;} else {
  //       return `
  //        <div> 
  //          <p>Good job!</p>
  //          <p>Your final score was ${this.model.score} out of 5.</p>
  //          <button class="play-again">Play again</button>
  //        </div>
  //   `;
  // }


  template() {
    // console.log('template');
    let html = '';

    if (this.model.getCurrentQuestion()) {
      // console.log('current question exists');
      if (this.model.getCurrentQuestion().userAnswer) {
        // console.log(this.model);
        // console.log(this.model.getCurrentQuestion());
        html = this.generateAnswerScreen();
        return html;
      }
    }
    
    if (this.model.asked.length === 0) {
      // Quiz has not started
      html = this._generateIntro();
    }

    if (this.model.asked.length > 0) {
      html = this.generateQuestion();
      
    }
    
    // if (this.model.unasked.length === 0) {
    //   html = this.finishScreen();
    // }
    
    return html;
  }

  handleStart() {
    this.model.startGame();
  }

  handleSubmit() {
    let userAnswer = $('input[name=generated_answer]:checked').val();
    console.log('test log', userAnswer);
    this.model.answerCurrentQuestion(userAnswer);
    
    // this.model.submitAnswer(userAnswer);
    // this.generateAnswerScreen(userAnswer);
  }

  handleNextQuestion() {
    this.model.nextQuestion();
  }
}

export default QuizDisplay;