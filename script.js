var btModule = angular.module('app', []).
	controller("btControl", function btControl($scope, $timeout){
		$scope.xChars = [];
		$scope.bChars = [];
		
		$scope.getHeight = function(){
			return document.getElementById('x-holder').clientHeight;
		}
		
		var bCharTable = [
			{n: "a", i: [1]},
			{n: "b", i: [1,0,1]},
			{n: "c", i: [1,1]},
			{n: "d", i: [1,1,0,1]},
			{n: "e", i: [1,0,0,1]},
			{n: "f", i: [1,1,1]},
			{n: "g", i: [1,1,1,1]},
			{n: "h", i: [1,0,1,1]},
			{n: "i", i: [0,1,1]},
			{n: "j", i: [0,1,1,1]},
			{n: "k", i: [1,0,0,0,1]},
			{n: "l", i: [1,0,1,0,1]},
			{n: "m", i: [1,1,0,0,1]},
			{n: "n", i: [1,1,0,1,1]},
			{n: "o", i: [1,0,0,1,1]},
			{n: "p", i: [1,1,1,0,1]},
			{n: "q", i: [1,1,1,1,1]},
			{n: "r", i: [1,0,1,1,1]},
			{n: "s", i: [0,1,1,0,1]},
			{n: "t", i: [0,1,1,1,1]},
			{n: "u", i: [1,0,0,0,1,1]},
			{n: "v", i: [1,0,1,0,1,1]},
			{n: "w", i: [0,1,1,1,0,1]},
			{n: "x", i: [1,1,0,0,1,1]},
			{n: "y", i: [1,1,0,1,1,1]},
			{n: "z", i: [1,0,0,1,1,1]}
		];
		
		function brailleChar(item, success){
			this.one = item.i[0] == 1;
			this.two = item.i[1] == 1;
			this.three = item.i[2] == 1;
			this.four = item.i[3] == 1;
			this.five = item.i[4] == 1;
			this.six = item.i[5] == 1;
			this.name = item.n;
			this.success = success === true;
			return this;
		}
		
		$scope.level = localStorage.getItem("brailletraining-level") == null ? 1 : localStorage.getItem("brailletraining-level");
		
		$scope.levelCharNums = function(){
			switch($scope.level){
				case 1:
					return 10;
				case 2:
					return 20;
				default:
					return bCharTable.length;
			}
		}
		
		$scope.addRandomChar = function(){
			var rand = Math.floor(Math.random() * $scope.levelCharNums());
			tempBChar = new brailleChar(bCharTable[rand]);
			$scope.bChars.push(tempBChar);
		}
		
		var generateBChars = function(){
			$scope.bChars = [];
			$scope.xChars = [];
			for(var i = 0; i < $scope.levelCharNums(); i++){
				var tempXChar = new brailleChar(bCharTable[i], true);
				$scope.xChars.push(tempXChar);
			}
			for(var i = 0; i < 10; i++){
				$scope.addRandomChar();
			}
		}
		
		generateBChars();
		
		$scope.currentIndex = 0;
		
		$scope.nextLevel = function(){
			$scope.level++;
			localStorage.setItem("brailletraining-level", $scope.level);
			generateBChars();
		}
		
		$scope.topScore = localStorage.getItem("brailletraining-topscore") == null ? 0 : localStorage.getItem("brailletraining-topscore");

		$scope.setTopScore = function(newValue){
			var value = $scope.topScore;
			if(newValue != null && newValue != undefined){
				if(newValue > value){
					$scope.topScore = newValue;
					localStorage.setItem("brailletraining-topscore", newValue);
				}
			}
		}
		
		$scope.score = 0;
		
		$scope.timePassed = 0;
		$scope.unitTimePassed = 0;
		
		$scope.timeAllowed = 100;
		$scope.timerOn = false;
		
		$scope.setTimePassed = function(){
			$scope.timePassed = $scope.unitTimePassed * document.getElementById('health-left').clientWidth / $scope.timeAllowed;
		}
		
		$scope.loseGame = function(){
			$scope.timerOn = false;
			$scope.currentIndex = 0;
			$scope.score = 0;
		}
		
		$scope.updateTime = function(){
			$scope.unitTimePassed++;
			$scope.setTimePassed();
			if($scope.unitTimePassed >= 100){
				$scope.loseGame();
			}
			
			if($scope.timerOn){
				$timeout(function(){
					$scope.updateTime();
				}, 100);
			}
		}
		
		$scope.checkCorrect = function(tempKey){
			if($scope.timerOn == false){
				$scope.timerOn = true;
				$scope.updateTime();
			}
			
			if($scope.bChars[$scope.currentIndex].name == tempKey){
				$scope.score++;
				$scope.setTopScore($scope.score);
				$scope.unitTimePassed = 0;
				$scope.setTimePassed();
				if($scope.level < 3 && $scope.score == 100){
					$scope.nextLevel();
					$scope.currentIndex = 0;
					$scope.score = 0;
					$scope.timerOn = false;
				}
				else{
					$scope.bChars[$scope.currentIndex].success = true;
					$scope.currentIndex++;
					$scope.addRandomChar();
					window.scrollTo(0,document.body.scrollHeight);
				}
			}
		}
		
		$scope.keyEvent = function($event){
			var tempKey = String.fromCharCode($event.keyCode).toLowerCase();
			$scope.checkCorrect(tempKey);
		}
	
	});
