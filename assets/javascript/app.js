var questionTime = 5;
var answerTime = 10;
var questionOn = false;
var timerRunning = false;
var intervalId;
var correctResponses = 0;
var incorrectResponses = 0;
var unansweredQuestions = 0;

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

var explanations = ["Bach, Scarlatti, and Handel were all born in 1685, sometimes being called 'The Class of 1685.'",
				    "Bach was married twice, to Maria Barbara and Anna Magdalena, with whom he had 20 children. Sadly only 10 reached adulthood.",
				    "Beethoven's ninth symphony was revolutionary, not only in its length and scope, but in its use of choir and vocal soloists in the last movement.",
				    "Stravinsky's The Rite of Spring (Le Sacre du Printemps) caused a riot at its premiere at Les Ballets Russes in Paris in 1913.",
				    "Mostly because of the dangerous political situation at the time in Europe, composers such as Stravinsky, Schoenberg, and many other musicians moved to Los Angeles."];

function displayQuestion(questionId, choiceId) {
	$("#question-answer").text(questionId);
	$("#choices").text(choiceId);
}

function displayRemaining() {
	clearInterval(intervalId);
	questionTime = 5;
	function countDown() {
		questionTime--;
		$("#time-remaining").text("Time Remaining: " + questionTime + " seconds");
		console.log(questionTime);
	}
	intervalId = setInterval(countDown, 1000);
	console.log(intervalId);
	timerRunning = true;
	if (questionTime === 0) {
		clearInterval(intervalId);
		questionTime = 5;
		$("#time-remaining").text("Time's Up!");
	}
}

$("#reset").on("click", function () {
	questionOn = true;
	//displayRemaining();
	displayQuestion(questions.question1.question, questions.question1.choices);
	$("#time-remaining").text("Time Remaining: " + questionTime + " seconds")
});

