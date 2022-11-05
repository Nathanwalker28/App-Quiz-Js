let screenWelcome = document.getElementById('welcome_screen');
let screenQuestion = document.getElementById('question_screen');
let screenResult = document.getElementById("result_screen");

function Quiz() {
    this.questions = [];
    this.nbCorrects = 0;
    this.indexCurrentQuestion = 0;

    this.addQuestion = function(question) {
        this.questions.push(question);
    } 
    
    this.showCurrentQuestion = function() {
        if (this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion+1, this.questions.length
            );
        } else {
            screenQuestion.classList.add("hidden");
            screenResult.style.display = "block";
            let elNbCorrects = document.querySelector("#nb_corrects");
            elNbCorrects.textContent = quiz.nbCorrects; 
        }
    }

    this.showResults = function() {
        let msg = `Resultats : \n ${this.nbCorrects}/${this.questions.length} correctes`;
        alert(msg);
    }
}


function question(title, answers, answersCorrect) {

    this.title = title;
    this.answers = answers;
    this.answersCorrect = answersCorrect;

    this.getElement = function(indexQuestion, nbQuestions) {
        let questionNumber = document.createElement("h2");
        questionNumber.textContent = `Question ${indexQuestion}/${nbQuestions}`;
        questionNumber.classList.add("quiz_subtitle");
        screenQuestion.append(questionNumber);

        let questionTitle = document.createElement("h3");
        questionTitle.textContent = this.title;
        screenQuestion.append(questionTitle);

        let questionAnswers = document.createElement("ul");
        questionAnswers.classList = "question_answers";
        screenQuestion.append(questionAnswers);

        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li");
            elAnswer.classList.add("answer");
            elAnswer.textContent = answer; 
            elAnswer.id = index + 1;
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer);
        });

      
    };
    this.addAnswer = function(answer) {
        this.answers.push(answer);
    };

    this.checkAnswer = (event) =>  {
        let answerSeclected = event.target;
        if (this.isCorrectAnswer(answerSeclected.id)) {
            answerSeclected.classList.add("answer_correct");
            quiz.nbCorrects++;
        } else {
            answerSeclected.classList.add("answer_wrong");
        }

        setTimeout(function() {
            screenQuestion.textContent = "";
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion();
        }, 1000);
    }
    this.isCorrectAnswer = function(answerUser) {
        if (answerUser == this.answersCorrect) {
            return true;
        } else {
            return false;
        }
    }


}

let quiz = new Quiz();

let question1 = new question("C'est quoi PHP", ['Hypertext Preprocessor', 'langage frontend', 'je ne sais pas quoi'], 1);
let question2 = new question("La Reine Elisabeth est décédée en :", [2025, 2024, 2022], 3);
let question3 = new question("Vodlemort est un :", ['Président de la république', 'magicien', 'mon oncle'], 2);
let question4 = new question("Madagascar a eu son indépendance en : ", [1958, 1960, 1962], 2);
let question5 = new question("La terre est :", ['ovale', 'ronde', 'rectangle'], 2);
let question6 = new question("Ne m'oublie est une :", ['chanson', 'phrase', 'je ne sais pas'], 1);


quiz.addQuestion(question1);
quiz.addQuestion(question2);
quiz.addQuestion(question3);
quiz.addQuestion(question4);
quiz.addQuestion(question5);
quiz.addQuestion(question6);


function seeFirstQuestion() {
    screenWelcome.classList.add('hidden');
    screenQuestion.style.display = "block";
    quiz.showCurrentQuestion();
}


let welcomebtn = document.getElementById('welcome_btn');
welcomebtn.addEventListener('click', seeFirstQuestion);

let elNbquestions = document.querySelectorAll('.nb_questions');
elNbquestions.textContent = quiz.questions;

elNbquestions.forEach(function(elNbquestions) {
    elNbquestions.textContent = quiz.questions.length;
});