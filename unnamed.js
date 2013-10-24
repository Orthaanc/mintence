$(document).ready(function(){
	
	var abcs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var charlist = abcs;
	var charDivs = {};
	var input = $("#sentence");
	var output = [];

	var testComplete = function(){
		return $(".active").length == charlist.length;
	};
	var complete = function(){
		var completed = input.val();
		input.val("");
		//todo make sure completed isn't already in output
		output.push(completed);
		var log = $(document.createElement("div"));
		var string = $(document.createElement("div"));
		var length = $(document.createElement("div"));
		string.text(completed);
		string.addClass("completed-string");
		length.text(completed.length +" characters");
		length.addClass("completed-length");
		log.append(string);
		log.append(length);
		$(".output-wrapper").prepend(log);

		clearLetters();
		mutatePattern();
		buildPattern();
	};
	var clearLetters = function(){
		$(".active").removeClass("active");
	}
	var mutatePattern = function(){
		var patternLength = Math.floor((Math.random()*40)+1);
		charlist = [];
		for (var i = patternLength - 1; i >= 0; i--) {
			var randomIndex = Math.floor((Math.random()*abcs.length)+1);
			charlist.push(abcs[randomIndex]);
		};
	}
	var buildPattern = function(){
		$("#charlist > *").remove();
		for (var i = charlist.length - 1; i >= 0; i--) {
			
			var insertString = "div";
			charDivs[charlist[i]] = $(document.createElement(insertString));
			charDivs[charlist[i]].text(charlist[i]);
			$("#charlist").prepend(charDivs[charlist[i]]);
		};
	}
	
	buildPattern();
	input.on("keyup", function(){
		clearLetters();
		var stringy = input.val();
		for (var i = stringy.length - 1; i >= 0; i--) {
			if (charlist.indexOf(stringy[i]) != -1) {
				charDivs[stringy[i]].addClass("active");
			}
		};
		if (testComplete()){
			complete();
		}
	});




});