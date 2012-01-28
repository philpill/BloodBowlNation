
if (typeof BBN == "undefined" || !BBN)
{
   var BBN = {};
}

(function() {

	BBN.Pitch = {
		gameContext: null,
		unitBorderColour: null,
		unitFillColour: null,
		boundaryLineColour: null,
		pitchStage: null,
		gameContext: null,
		pitchImage: null,
		backgroundImage: "img/Pitch.jpg",
		init: function(pitchStage, gameContext) {
			this.gameContext=gameContext;
			this.unitFillColour="rgba(0,255,0,0)";
			this.unitBorderColour="rgba(0,0,0,0.1)";
			this.boundaryLineColour="rgba(0,100,0,0.1)";
			this.pitchStage = pitchStage;
		}
	}	
})();


