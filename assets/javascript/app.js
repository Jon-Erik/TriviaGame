var questionTime = 5;
var answerTime = 5;
var intervalIdQuestion;
var intervalIdAnswer;
var correctResponses = 0;
var incorrectResponses = 0;
var unansweredQuestions = 0;
var questionCount = 0;

var questions = ["Johann Sebastian Bach, Domenico Scarlatti, and Georg Frederick Handel were all born in what year?",
				 "How many children did Johann Sebastian Bach have?",
				 "Which Beethoven symphony includes choir and vocal soloists?",
				 "Which Stravinsky ballet famously elicited a riot?",
				 "Several important 20th century composers moved to which American city in the 1930s and 40s?",
				 "How old was Mozart when he died?",
				 "Which composer was also an artist who painter watercolours?"]

var choices = [
				["1685", "1701", "1680", "1709"],
				["20", "13", "2", "4"],
				["Symphony No. 1 in C major", "Symphony No. 3 in Eb major", "Symphony No. 6 in F major",
				"Symphony No. 9 in D minor"],
				["The Firebird", "The Rite of Spring", "Petrushka", "Pulcinella"],
				["Chicago", "New York", "Los Angeles", "Seattle"],
				["57", "63", "29", "35"],
				["Gustav Mahler", "Richard Strauss", "Felix Mendelssohn", "Ludwig van Beethoven"]
			  ]

var correctAnswers = ["1685", "20", "Symphony No. 9 in D minor", "The Rite of Spring", "Los Angeles", "35", "Felix Mendelssohn"];

var explanations = ["Bach, Scarlatti, and Handel were all born in 1685, sometimes being referred to as 'The Class of 1685.'",
				    "Bach was married twice, to Maria Barbara and Anna Magdalena, with whom he had 20 children. Sadly only 10 reached adulthood.",
				    "Beethoven's ninth symphony was revolutionary, not only in its length and scope, but in its use of choir and vocal soloists in the last movement.",
				    "Igor Stravinsky's The Rite of Spring (Le Sacre du Printemps) caused a riot at its premiere at Les Ballets Russes in Paris in 1913.",
				    "Mostly because of the dangerous political situation at the time in Europe, composers such as Stravinsky, Schoenberg, and many other musicians moved to Los Angeles in the 1930s and 40s.",
				    "Mozart only lived to be 35 years old, but not before writing numerous symphonies, operas, religious works, and a great deal of chamber music, among other compositions.",
				    "Mendelssohn was an art enthusiast and would frequently paint watercolour pictures."];

var captions = ["Domenico Scarlatti, 1685-1757", 
				"Johann Sebastian Bach, 1685-1750",
				"Ludwig van Beethoven, 1770-1827",
				"A dancer performing The Rite of Spring",
				"The Los Angeles skyline",
				"Wolfgang Amadeus Mozart, 1756-1791",
				"A watercolour painting by Felix Mendelssohn"
				]

var images = ["assets/images/scarlatti.jpg",
			  "assets/images/bach.jpg",
			  "assets/images/beethoven.jpg",
			  "assets/images/sacre dancer.jpg",
			  "assets/images/LA skyline.jpg",
			  "assets/images/mozart.jpg",
			  "assets/images/mendelssohn painting.png"]

function countDownQuestion() {
		questionTime--;
		$("#time-remaining").html("</br>Time Remaining: " + questionTime + " seconds");
		if (questionTime === 0) {
			clearInterval(intervalIdQuestion);
			questionTime = 5;
			displayAnswerUnanswered();
		}
	}

function displayRemainingQuestion() {
	clearInterval(intervalIdQuestion);
	questionTime = 5;
	intervalIdQuestion = setInterval(countDownQuestion, 1000);
}

function countDownAnswer() {
	answerTime--;
	$("#time-remaining").html("</br>Time remaining until next question: " + answerTime + " seconds");
	if (answerTime === 0) {
		clearInterval(intervalIdAnswer);
		answerTime = 5;
		displayQuestion();
	}
}

function displayRemainingAnswer() {
	clearInterval(intervalIdAnswer);
	answerTime = 5;
	intervalIdAnswer = setInterval(countDownAnswer, 1000);
	questionCount++;
}

function displayQuestion() {
	if (questionCount === questions.length) {
		$("#question-answer").html("<span class='heading'>Thanks for playing! Here's your score:</span></br></br> Correct Answers: " + correctResponses + "</br>" +
									"Incorrect Answers: " + incorrectResponses + "</br>" + 
									"Unanswered Questions: " + unansweredQuestions);
		$("#time-remaining").hide();
		return;
	}

	$("#question-answer").html("<span class='heading'>" + questions[questionCount] + "</span></br></br>" + 
		"<button class='btn choice'>" + choices[questionCount][0] + "</button>" +  
		"<button class='btn choice'>" + choices[questionCount][1] + "</button>" + 
		"<button class='btn choice'>" + choices[questionCount][2] + "</button>" + 
		"<button class='btn choice'>" + choices[questionCount][3] + "</button>");
	
	$(".choice").on("click", function () {
		var selectedAnswer = $(this).text();
		if (selectedAnswer === correctAnswers[questionCount]) {
			displayAnswerCorrect();
		} else {
			displayAnswerIncorrect();
		}
	})

	$("#time-remaining").html("</br>Time Remaining: " + questionTime + " seconds");
	displayRemainingQuestion();
}

function displayAnswerCorrect() {
	clearInterval(intervalIdQuestion);
	correctResponses++;
	$("#question-answer").html("<span class='heading'>Correct!</br> The answer is: " + correctAnswers[questionCount] +
	  "</span></br></br>" + explanations[questionCount]);
	imageAndCaption();
	$("#time-remaining").html("</br>Time remaining until next question: " + answerTime + " seconds");
	displayRemainingAnswer();
}

function displayAnswerIncorrect() {
	clearInterval(intervalIdQuestion);
	incorrectResponses++;
	$("#question-answer").html("<span class='heading'>Incorrect!</br> The correct answer is: " + correctAnswers[questionCount] +
	  "</span></br></br>" + explanations[questionCount] );
	imageAndCaption();
	$("#time-remaining").html("</br>Time remaining until next question: " + answerTime + " seconds");
	displayRemainingAnswer();
}

function displayAnswerUnanswered() {
	clearInterval(intervalIdQuestion);
	unansweredQuestions++;
	$("#question-answer").html("<span class='heading'>Time's Up!</br>The answer is: " + correctAnswers[questionCount] +
	  "</span></br></br>" + explanations[questionCount]);
	imageAndCaption();
	$("#time-remaining").html("</br>Time remaining until next question: " + answerTime + " seconds");
	displayRemainingAnswer();
}

function imageAndCaption() {
	$("#question-answer").append("</br></br>" +
		"<div class='card caption'>" +
			"<div class='card-header text-center'>" + captions[questionCount] + "</div>" +
			"<div class='text-center'>" +
				"<img class='card-img-top' src='" + images[questionCount] + "'>" +
			"</div>" +
		"</div>")
}

$("#reset").on("click", function () {
	questionCount = 0;
	incorrectResponses = 0;
	correctResponses = 0;
	unansweredQuestions = 0;
	answerTime = 5;
	questionTime = 5;
	displayQuestion();
	//clearInterval(intervalIdQuestion);
	clearInterval(intervalIdAnswer);
	$("#time-remaining").show();
});

