var btModule = angular.module('app', []).
	controller("btControl", function btControl($scope, $timeout){
		$scope.bChars = [];
		
		var bCharTable = [
			{n: "a", i: []},
			{n: "b", i: []},
		];
		
		function bChar(item){
			this.one = item.i[0] == 1;
			this.two = item.i[1] == 1;
			this.three = item.i[2] == 1;
			this.four = item.i[3] == 1;
			this.five = item.i[4] == 1;
			this.six = item.i[5] == 1;
			this.name = item.n;
			return this;
		}
		
		var generateBChars = function(){
			for(var i = 0; i < bCharTable.length; i++){
				var tempBChar = new bChar(bCharTable[i]);
				$scope.bChars.push(tempBChar);
			}
		}
		
		generateBChars();
	});
