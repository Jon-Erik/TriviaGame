var questionTime = 5;
var answerTime = 10;
var questionOn = false;
var timerRunning = false;
var intervalIdQuestion;
var intervalIdAnswer;
var correctResponses = 0;
var incorrectResponses = 0;
var unansweredQuestions = 0;
var questionCount = 0;
var userGuess;

var questions = ["Johann Sebastian Bach, Domenico Scarlatti, and Georg Frederick Handel were all born in what year?",
				 "How many children did Johann Sebastian Bach have?",
				 "Which Beethoven symphony includes choir and vocal soloists?",
				 "Which Stravinsky ballet famously elicited a riot?",
				 "Several important 20th century composers moved to which American city in the 1930s and 40s?"]

var choices = [
				["1685", "1701", "1680", "1709"],
				["20", "13", "2", "4"],
				["Symphony No. 1 in C major", "Symphony No. 3 in Eb major", "Symphony No. 6 in F major",
				"Symphony No. 9 in D minor"],
				["The Firebird", "The Rite of Spring", "Petrushka", "Pulcinella"],
				["Chicago", "New York", "Los Angeles", "Seattle"],
			  ]

var correctAnswers = ["1685", "20", "Symphony No. 9 in D minor", "The Rite of Spring", "Los Angeles"];

var explanations = ["Bach, Scarlatti, and Handel were all born in 1685, sometimes being referred to as 'The Class of 1685.'",
				    "Bach was married twice, to Maria Barbara and Anna Magdalena, with whom he had 20 children. Sadly only 10 reached adulthood.",
				    "Beethoven's ninth symphony was revolutionary, not only in its length and scope, but in its use of choir and vocal soloists in the last movement.",
				    "Stravinsky's The Rite of Spring (Le Sacre du Printemps) caused a riot at its premiere at Les Ballets Russes in Paris in 1913.",
				    "Mostly because of the dangerous political situation at the time in Europe, composers such as Stravinsky, Schoenberg, and many other musicians moved to Los Angeles in the 1930s and 40s."];

function countDownQuestion() {
		questionTime--;
		$("#time-remaining").text("Time Remaining: " + questionTime + " seconds");
		if (questionTime === 0) {
			clearInterval(intervalIdQuestion);
			questionTime = 5;
			displayAnswerUnanswered(questionCount);
		}
	}

function displayRemainingQuestion() {
	clearInterval(intervalIdQuestion);
	questionTime = 5;
	intervalIdQuestion = setInterval(countDownQuestion, 1000);
}

function countDownAnswer() {
	answerTime--;
	//questionCount++;
	$("#time-remaining").text("Time Remaining: " + answerTime + " seconds");
	if (answerTime === 0) {
		clearInterval(intervalIdAnswer);
		answerTime = 5;
		displayQuestion(questionCount);
	}
}

function displayRemainingAnswer() {
	clearInterval(intervalIdAnswer);
	answerTime = 5;
	intervalIdAnswer = setInterval(countDownAnswer, 1000);
	questionCount++;
}

function displayQuestion(questionCount) {
	if (questionCount === questions.length) {
		$("#question-answer").html("The end. Correct Answers: " + correctResponses + "</br>" +
									"Incorrect Answers: " + incorrectResponses + "</br>" + 
									"Unanswered Questions: " + unansweredQuestions);
		$("#time-remaining").hide();
		return;
	}

	$("#question-answer").html(questions[questionCount] + "</br></br>" + 
		"<button class='btn choice'>" + choices[questionCount][0] + "</button>" + "</br></br>" +
		"<button class='btn choice'>" + choices[questionCount][1] + "</button>" + "</br></br>" +
		"<button class='btn choice'>" + choices[questionCount][2] + "</button>" + "</br></br>" +
		"<button class='btn choice'>" + choices[questionCount][3] + "</button>");
	
	$(".choice").on("click", function () {
		var selectedAnswer = $(this).text();
		if (selectedAnswer === correctAnswers[questionCount]) {
			displayAnswerCorrect();
		} else {
			displayAnswerIncorrect();
		}
	})

	$("#time-remaining").text("Time Remaining: " + questionTime + " seconds");
	displayRemainingQuestion();
}

function displayAnswerCorrect(questionCount) {
	clearInterval(intervalIdQuestion);
	correctResponses++;
	console.log(correctResponses);
	$("#question-answer").html("Correct! The answer is: " + correctAnswers[questionCount] +
	  "</br>" + explanations[questionCount]);
	console.log(correctAnswers[questionCount]);
	console.log(explanations[questionCount]);
	$("#time-remaining").text("Time Remaining: " + answerTime + " seconds");
	displayRemainingAnswer();
}

function displayAnswerIncorrect(questionCount) {
	clearInterval(intervalIdQuestion);
	incorrectResponses++;
	console.log(incorrectResponses);
	$("#question-answer").html("Incorrect! The correct answer is: " + correctAnswers[questionCount] +
	  "</br>" + explanations[questionCount]);
	console.log(correctAnswers[questionCount]);
	console.log(explanations[questionCount]);
	$("#time-remaining").text("Time Remaining: " + questionTime + " seconds");
	displayRemainingAnswer();
}

function displayAnswerUnanswered(questionCount) {
	clearInterval(intervalIdQuestion);
	unansweredQuestions++;
	console.log(unansweredQuestions);
	$("#question-answer").html("The correct answer is: " + correctAnswers[questionCount] +
	  "</br>" + explanations[questionCount]);
	console.log(correctAnswers[questionCount]);
	console.log(explanations[questionCount]);
	$("#time-remaining").text("Time Remaining: " + questionTime + " seconds");
	displayRemainingAnswer();
}

$("#reset").on("click", function () {
	questionCount = 0;
	incorrectResponses = 0;
	correctResponses = 0;
	unansweredQuestions = 0;
	displayQuestion(questionCount);
	//clearInterval(intervalIdQuestion);
	clearInterval(intervalIdAnswer);
});

