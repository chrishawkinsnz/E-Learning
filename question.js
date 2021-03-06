

var Question = function(id, bodyText, answerText, image) {
	// the question's id
	this.id = id;

	// the question body text.
	this.bodyText = bodyText;

	// a text representation of the answer. used for debugging. do not compare
	// with supplied answer for testing user input
	this.answerText = answerText;
	
	this.modelAnswer = "this is a model answer.  PLEASE FIX ME";
	
	// the type of question . eg multi, numebr, text
	this.questionType;

	// checks some supplied answer against the correct answer. returns bool
	this.checkAnswer;

	// function to convert a question to JSON format (may be unnecessary))
	this.toJSON;

  
	//the url of the image to display.  leave blank if you want no picture
	this.imageURL=image;

	this.isNumeric =function(answer) {
	     return (answer >=0 || answer < 0);
	}

	this.isEmpty=function(answer){
		return answer=="";
	}
	//funcftion to conver from JSON format to question
//	this.fromJSON;

};


/**
 * A multi choice question that lets users select from the provided choices
 * (optionsText). The index of the correct option is provided too
 */
var MultiChoiceQuestion = function(id, bodyText, answerIndex, optionsText, image) {
	// call the super class constructor
	Question.call(this, id, bodyText, optionsText[answerIndex], image);

	for(var i=0;i<optionsText;i++){
		optionsText[i] = optionsText[i].trim();
	}
	this.optionsText = optionsText;
	this.answerIndex = answerIndex;

	this.questionType = "multi";

	/**
	 * Checks the answer against the supplied INDEX
	 */
	this.checkAnswer = function(answer) {
		if(answer==-1){
			throw new Error("Incorrect format: empty field");
		}
		if (this.answerIndex == answer) {
//			alert("Correct!");
			return true;
		} else {
//			alert("Wrong answer.");
			return false;

		}
	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["optionsText"] = optionsText;
		jobject["answerIndex"] = answerIndex;
		jobject["image"]=image;
		return jobject;

	}



};

/**
 * A question which asks the user for a number.
//  */
// var NumberEntryQuestion = function(id, bodyText, answerNum, image) {
// 	Question.call(this, id, bodyText, answerNum, image);

// 	this.questionType = "number";

// 	this.answerText = Number(answerNum);
// 	function isNumeric(num) {
// 	     return (num >=0 || num < 0);
// 	}
// 	/**
// 	 * compares the supplied number with the correct answer. Currently has no
// 	 * tolerance, answers must be exact
// 	 */
// 	this.checkAnswer = function(answer) {
// 		if(!isNumeric(answer)){
// 			throw "Incorrect format: not a number";
// 		}
// 		answer = parseAnswer(answer);
// 		if (Number(answer) == NaN) {
// //			alert("Only numbers allowed.");
// 			return false;
// 		} else if (this.answerText == answer) {
// //			alert("Correct!");
// 			return true;
// 		} else {
// //			alert("Wrong answer.");
// 			return false;
// 		}
// 	};

// 	this.toJSON = function() {
// 		var jobject = {};
// 		jobject["id"] = id;
// 		jobject["bodyText"] = bodyText;
// 		jobject["answerNum"] = answerNum;
// 		jobject["image"]=image;
// 		return jobject;
// 	};

// //	this.fromJSON = function(jobject){
// //		this.answer = jobject["canswer"];
// //		this.body = jobject["body"];
// //	}

// };

/**
 * Just like a Number Entry Question but with a tolerance set for it.
 */
var NumberEntryToleranceQuestion = function(id, bodyText, answerNum, tolerance, image) {
	Question.call(this, id, bodyText, answerNum, image);

	this.questionType = "number";

	this.tolerance = tolerance;


	this.checkAnswer = function(answer) {
		answer = parseAnswer(answer);

		if(this.isEmpty(answer)){
			throw new Error("Incorrect format: empty field");
		}

		if(!this.isNumeric(answer)){
			throw new Error("Incorrect format: not a number");
		}

		answer = parseFloat(answer);
		answerNum = parseFloat(answerNum);
		tolerance = parseFloat(tolerance);

		if (answer == NaN) {
//			alert("Only numbers allowed.");
			return false;
		} else if (Math.abs(answer-answerNum) <= tolerance) {
//			alert("Correct!");
			return true;
		}
		else {
//			alert("Wrong answer.");
			return false;
		}

	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["answerNum"] = answerNum;
		jobject["image"]=image;
		return jobject;
	};

};

/**
 * Text question where users must enter an answer in string form.
 */
var TextEntryQuestion = function(id, bodyText, answersArray, image) {
	Question.call(this, id, bodyText, answersArray, image);

	this.questionType = "text";

	this.answersArray = answersArray;


	/**
	 * Checks the array of possible answers for the supplied text
	 */
	this.checkAnswer = function(answer) {



		answer = parseAnswer(answer);

		if(this.isEmpty(answer)){
			throw new Error("Incorrect format: empty field");
		}

		if(this.isNumeric(answer)){
			throw new Error("Incorrect format: not a string");
		}


		if (answersArray.indexOf(answer) != -1) {
//			alert("Correct!");
			return true;
		} else {
//			alert("Wrong answer.");
			return false;
		}
	};

	this.toJSON = function() {
		var jobject = {};
		jobject["id"] = id;
		jobject["bodyText"] = bodyText;
		jobject["answersArray"] = answersArray;
		jobject["image"]=image;
		return jobject;
	};
};

/**
 * Test method for creating a series of questions
 */
function dummyQuestions() {
	MultiChoiceQuestion.prototype = Object.create(Question.prototype);
	NumberEntryQuestion.prototype = Object.create(Question.prototype);
	TextEntryQuestion.prototype = Object.create(Question.prototype);

	var mcq = new MultiChoiceQuestion("NoID",
			"Is this operation 'true' or 'false': \n 3 > 2", 0, [ "true",
					"false" ]);

	var neq = new NumberEntryQuestion("NoID", "How many legs does a human being have?",
			2);

	var acceptableAnswers = [ "feline", "cat", "hamster", "orange dog" ];
	var teq = new TextEntryQuestion("NoID", "what is an orange furry pet",
			acceptableAnswers);

	var threeQuestions = [ mcq, neq, teq ];
	for (var i = 0; i < threeQuestions.length; i++) {

		// q.askQuesiton();
		threeQuestions[i].checkAnswer("orange dog");

	}
};

/**
 *This should remove white spaces in user input
 *This makes it all small case
 *
 *Input: user's answer
 *Output: parsed string
 */
function parseAnswer(userAnswer){

	var maniText = userAnswer;
	maniText = maniText.toLowerCase();
	maniText = maniText.trim();

	var finalInput = maniText;

	return finalInput;
};
