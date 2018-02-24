var mainHTML = $("#main-html");
var questionTime = 30;
var answerTime = 10;
var questionOn = false;

//function countDown() {
//	questionTime--;
//}

function displayRemaining() {
			function countDown() {
			questionTime--;
		}
	intervalId = setInterval(countDown, 100);
	console.log(intervalId);
}

$("#reset").on("click", function () {
	mainHTML.html("<p>Time Remaining: " + questionTime + " </p>" +
			  "<p>Question and choices: </p>")
	questionOn = true;
	displayRemaining();
});

