class GameController {
    constructor(backendService, persistenceService, sensorService) {
        if(backendService === undefined)
            throw Error("BackendService may not be undefined");
        if(persistenceService === undefined) 
            throw Error("PersistenceService may not be undefined");
        if(sensorService === undefined)
            throw Error("SensorService may not be undefined");

        this.backendService = backendService;
        this.persistenceService = persistenceService;
        this.sensorService = sensorService;

        this.playerImages = [
            "img/player/freddie.jpg",
            "img/player/freddie2.jpg",
            "img/player/freddie3.jpg",
            "img/player/spongebob.jpg"
        ];

        this.currentUser = persistenceService
            .loadFromLocalStorage('lastUsername');
    }

    initialize() {
        /* wire up backendService-events */
        this.backendService.registerOnNewQuestion((question) => this.displayQuestion(question));
    }

    displayWaitingForPlayers() {
        this.currentUser = this.persistenceService
            .loadFromLocalStorage('lastUsername');

        renderPlayerCardWaiting(
            this.currentUser, 
            randomChoose(this.playerImages), 
            this.sensorService.getCountry());

        this.initialize();
    }

    displayQuestion(question) {
        renderQuestion(question);

        $('.js-answer-selection-0').click(() => this.handleAnswer(question, 0));
        $('.js-answer-selection-1').click(() => this.handleAnswer(question, 1));
        $('.js-answer-selection-2').click(() => this.handleAnswer(question, 2));
        $('.js-answer-selection-3').click(() => this.handleAnswer(question, 3));
    }

    handleAnswer(question, answerIndex) {
        if(question.correctAnswer === answerIndex) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    }

    handleCorrectAnswer() {
        $('.js-centered-body').empty();
        $('.js-centered-body').html('<h1>Where you toooooo fast</h1>');
        this.backendService.sendCorrectAnswer(this.currentUser);
    }

    handleWrongAnswer() {
        $('.js-centered-body').empty();
        $('.js-centered-body').html('<h1>Wrooooooong</h1>');
    }
}

function randomChoose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }
