$(document).ready(function(){
	
	var abcs = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var charlist = abcs;
	var charDivs = {};
	var input = $("#sentence");
	var output = [];

	var testComplete = function(){
		return $(".active").length == charlist.length;
	};
	var testGrammerSpell = function() {
		return $.ajax({
			crossDomain: true,
			url: "api/Atd/Get?data="+input.val()
		})
		.done(function( data ) {
			if ( data && data.results && console && console.log ) {
				console.log( data.results );
			}
		});
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
		string.addClass("mint");
		length.text(completed.length +" characters");
		length.addClass("completed-length");
		length.addClass("mint");
		log.append(string);
		log.append(length);
		$(".output-wrapper").prepend(log);

		clearLetters();
		mutatePattern();
		buildPattern();
	};
	var clearLetters = function(){
		$(".active").removeClass("active");
	};
	var mutatePattern = function(allowDuplicates){
		var patternLength = Math.floor(Math.random()*40);
		charlist = [];
		for (var i = patternLength - 1; i >= 0; i--) {
			var randomIndex = Math.floor(Math.random()*abcs.length);
			//console.log(randomIndex);
			var candidateChar = abcs[randomIndex];
			if (allowDuplicates || (charlist.indexOf(candidateChar) == -1)){
				if (candidateChar != ""){
					charlist.push(abcs[randomIndex]);
				}
			}			
		};
		charlist = charlist.sort();
	};
	var buildPattern = function(){
		$("#charlist > *").remove();
		for (var i = charlist.length - 1; i >= 0; i--) {
			
			var insertString = "div";
			charDivs[charlist[i]] = $(document.createElement(insertString));
			charDivs[charlist[i]].text(charlist[i]);
			$("#charlist").prepend(charDivs[charlist[i]]);
		};
	};
	
	buildPattern();
	input.on("keyup", function(){
		clearLetters();
		var stringy = input.val().toLowerCase();
		for (var i = stringy.length - 1; i >= 0; i--) {
			if (charlist.indexOf(stringy[i]) != -1) {
				charDivs[stringy[i]].addClass("active");
			}
		}
		if (testComplete()){
			testGrammerSpell().then(function(success){				
				complete();
			});
		}
	});
});