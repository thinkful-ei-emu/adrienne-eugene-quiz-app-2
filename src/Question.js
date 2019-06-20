class Question {
  constructor(questionData) {
    this.text = questionData.question;
    this.answers = [questionData.correct_answer, ...questionData.incorrect_answers];
    this.correctAnswer = questionData.correct_answer;
    this.userAnswer = null;
    this._shuffle(this.answers); 
  }

  _shuffle(arr) {
    let currentIndex = arr.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  
    return arr;
  }

  submitAnswer(answer) {
    this.userAnswer = answer;
  }

  /**
   * Returns integer for question status:
   * -1 = unanswered
   *  0 = answered, incorrect
   *  1 = answered, correct
   */
  getAnswerStatus() {
    if (this.userAnswer === null) {
      return -1;
    } else if (this.userAnswer === this.correctAnswer) {
      return 1;
    } else {
      return 0;
    }
  }  
}

export default Question;
