//counter of 30 seconds
var counter;
var timer;
var currentQuestionIndex; // variable to know which question 

// "Start" button
$('#start').on('click', function () {
    // Variable to know which questions 
    currentQuestionIndex = -1;

    $('#game').fadeIn();

    // questions/answers and counter
    showNextQuestion();
});

function showNextQuestion() {
    currentQuestionIndex++;

    var currentQuestion = questions[currentQuestionIndex];

    // Shows question
    $('#question-container').html('<div id="question">' + currentQuestion.question + '</div>');

    // Using map to convert each answer to an HTML element
    var answersHTML = currentQuestion.answers.map(function (answer, index) {
        return '<div class="answer" data-index="' + index + '">' + answer + '</div>';
    });

    // Add them to the container
    $('#answers').html(answersHTML);

    // Also starts the counter
    startCounter();
}

function startCounter() {
    // Use an interval of 1 second to update the counter.
    // Also, if it reaches 0, game over

    counter = 30;
    count();

    timer = setInterval(function () {
        count();
    }, 1000);
}

function count() {
    $('#remaining-time').html(counter--);

    if (counter === 0) {
        gameOver();
    }
}

$(document).on('click', '.answer', function () {
    var answerIndex = $(this).data('index');

    // Correct answer
    if (answerIndex == questions[currentQuestionIndex].correctAnswer) {
        showMessage('Correct answer!');
        clearInterval(timer);

        setTimeout(function () {
            // check if there are more questions
            if (questions.length - 1 > currentQuestionIndex) {
                showNextQuestion();
            } else {
                gameWon();
            }
        }, 2000);

    } else {
        gameOver();
    }
});

function gameOver() {
    // Shows message
    showMessage('Game over');

    // Stops interval
    clearInterval(timer);

    $('#game').fadeOut();
}

function gameWon() {
    showMessage('You won this game! Congratulations');

    // Hides game
    $('#game').hide();

    // Shows success message
    $('#game-won').show();
}

function showMessage(message) {
    // Shows messages container with a fadeIn and puts the new message
    $('#message').fadeIn().html(message);

    // Removes the message after 2 seconds
    setTimeout(function () {
        // Hides and empties messages container
        $('#message').fadeOut().html('');
    }, 2000);
}