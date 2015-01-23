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
		
		$scope.level = 1;
		
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
		
		var generateBChars = function(){
			$scope.bChars = [];
			$scope.xChars = [];
			for(var i = 0; i < $scope.levelCharNums(); i++){
				var tempBChar = new brailleChar(bCharTable[i]);
				var tempXChar = new brailleChar(bCharTable[i], true);
				$scope.bChars.push(tempBChar);
				$scope.xChars.push(tempXChar);
			}
		}
		
		generateBChars();
		
		$scope.currentIndex = 0;
		
		$scope.nextLevel = function(){
			$scope.level++;
			generateBChars();
		}
		
		$scope.score = 0;
		
		$scope.checkCorrect = function(tempKey){
			if($scope.bChars[$scope.currentIndex].name == tempKey){
				$scope.score++;
				
				if($scope.score == 10){
					$scope.nextLevel();
					$scope.currentIndex = 0;
					$scope.score = 0;
				}
				else{
					$scope.bChars[$scope.currentIndex].success = true;
					$scope.currentIndex++;
					
					var rand = Math.floor(Math.random() * $scope.levelCharNums());
					var tempBChar = new brailleChar(bCharTable[rand]);
					$scope.bChars.push(tempBChar);
					window.scrollTo(0,document.body.scrollHeight);
				}
			}
		}
		
		$scope.keyEvent = function($event){
			var tempKey = String.fromCharCode($event.keyCode).toLowerCase();
			$scope.checkCorrect(tempKey);
		}
	
	});
