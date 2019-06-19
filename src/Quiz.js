import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model'
  // might need more this.update()s
  // super may be required
class Quiz extends Model{

  static DEFAULT_QUIZ_LENGTH = 5;

  constructor() {
    super();
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;

    // TASK: Add more props here per the exercise
    this.score = 0;
    this.scoreHistory = [];
    this.progress = 'Inactive';

  }

  // Example method:
  startGame() {
    this.unasked = [];
    this.asked = [];
    this.active = false;
    this.score = 0;

    const triviaApi = new TriviaApi();
    triviaApi.fetchQuestions(Quiz.DEFAULT_QUIZ_LENGTH)
      .then(data => {
        data.results.forEach(questionData => {
          this.unasked.push(new Question(questionData));
          this.nextQuestion();
          this.active = true;
          this.update();
        });
        
      })
      .catch(err => console.log(err.message));
  }

  getCurrentQuestion() {
    return this.asked[0];
  }

  nextQuestion() {
    this.progressStatus();
    const currentQ = this.getCurrentQuestion();
    if (currentQ && currentQ.getAnswerStatus() === -1) {
      return false;
    }

    this.asked.unshift(this.unasked.pop());
    this.progressStatus();
    this.update();
    return true;
  }

  increaseScore() {
    this.score++;
    this.update();
        
  }

  answerCurrentQuestion(answerText) {
    const currentQ = this.getCurrentQuestion();
    // Cannot find current question, so fail to answer
    if (!currentQ) return false;
    // Current question has already been answered, so refuse to submit new answer    
    if (currentQ.getAnswerStatus() !== -1) return false;

    // Otherwise, submit the answer
    currentQ.submitAnswer(answerText);

    // If correct, increase score
    if (currentQ.getAnswerStatus() === 1) {
      this.increaseScore();
    }
    else this.update();

    return true;
  }

  highScore() {
   this.scoreHistory = Math.max(...this.scoreHistory);
   this.update();
  }

  progressStatus() {
    console.log(this);
   if(this.active === true) {
    this.progress = `${this.asked.length} of 5`;
    this.update();
   } else {
     this.progress = 'Inactive';
     this.update();
   }
  }

  endGame() {
    this.unasked = [];
    this.asked = [5];
    this.active = false;
    this.score = this.score;
    this.scoreHistory = this.highScore();
    this.update();
  }

}

export default Quiz;
