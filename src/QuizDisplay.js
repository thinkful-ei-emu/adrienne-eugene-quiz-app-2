import $ from 'jquery';
import Renderer from './lib/Renderer';
// import Quiz from './Quiz';

class QuizDisplay extends Renderer {
  getEvents() {
    return {
      'click .start-quiz': 'handleStart',
      'click .submit-button': 'handleSubmit',
      'click .next-question': 'handleNextQuestion',
      'click .finish-quiz': 'handleFinishQuiz',
      'click .play-again': 'handleStart'
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
      answerSelection += `<form><input type="radio" name='generated_answer' value="${currentQ.answers[i]}">${currentQ.answers[i]}</button></form>`;
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
    let answerSelected= $('input[name=generated_answer]:checked').val();

   
    if (this.model.asked.length === 5) {
      return `
        <div>
         <p> ${currentQ.text}</p>
         <p> Sorry, that's incorrect. You answered: ${answerSelected}</p>
         <p> The correct answer was: ${currentQ.correctAnswer}</p>
        </div>
        <button class="finish-quiz">Finish Quiz</button>
      `;
    } else if (answerSelected === currentQ.correctAnswer) {
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

  generateFinishScreen() {

    // if the current score is higher than the current max score OR 
    //this isn't the first game  and the score is greater than 0
    if (this.model.score > this.model.maxScore || (this.model.scoreHistory.length === 1 && this.model.score > 0)) {
      return `
      <div> 
       <p>Good job!</p>
       <p>Your final score was ${this.model.score} out of 5.</p>
       <p>That's a new high score!</p>
       <button class="play-again">Play again</button>
      </div>
    `;} else {
      return `
         <div> 
           <p>Good job!</p>
           <p>Your final score was ${this.model.score} out of 5.</p>
           <button class="play-again">Play again</button>
         </div>
    `;
    }
  }


  template() {

    let html = '';
    //FINALLY found the correct parameters for this if statement. 
    // The only time asked will have more than 0 questions and not be active is after the 5th question.
    if (this.model.asked.length > 0 && this.model.active === false) {
      html = this.generateFinishScreen();
      return html;
    }

    if (this.model.getCurrentQuestion()) {
      if (this.model.getCurrentQuestion().userAnswer) {
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

    return html;
  }

  handleStart() {
    this.model.startGame();
  }

  handleSubmit() {
    let userAnswer = $('input[name=generated_answer]:checked').val();
    this.model.answerCurrentQuestion(userAnswer);
    
  }

  handleNextQuestion() {
    this.model.nextQuestion();
  }

  handleFinishQuiz() {
    //revisit this push null thing
    this.model.asked.push(null);
    this.model.endGame();
  }
}

export default QuizDisplay;