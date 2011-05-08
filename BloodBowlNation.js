var bloodBowlNation = bloodBowlNation || {
	canvas: null,
	context: null,
	init: function() {
		this.canvas = document.getElementById("GameCanvas");
		this.context = this.controls.canvas.getContext("2d");
	},
	players: {
	
	},
	pitch: {
		leftOrigin: null,
		topOrigin: null,
		unit: null,
		height: null,
		width: null,
		unitColour: null,
		boundaryLineColour: null,
		context: null,
		controls: {
			canvas: null
		},
		render: function() {
			var canvas = this.controls.canvas;
			var context = this.context;			
			var unit = this.unit;
			var width = this.width;
			var height = this.height;
			var unitColour = this.unitColour;
			var boundaryLineColour = this.boundaryLineColour;
			var pitchImage = new Image();
			pitchImage.src="Pitch.jpg";
			pitchImage.onload = function() {
				context.drawImage(pitchImage, 0, 0, unit*width, unit*height);			
				context.beginPath();
				context.fillStyle = "rgba(0,255,0,0.1)";
				context.fillRect(0,0,width*unit,height*unit);
				
				//vertical grid lines
				for (var x=0.5; x < (width*unit)+unit; x+=unit)
				{
					context.moveTo(x, 0);
					context.lineTo(x, height*unit);
				}	
				//horizontal grid lines
				for (var y=0.5; y < (height*unit)+unit; y+=unit)
				{
					context.moveTo(0, y);
					context.lineTo(width*unit, y);
				}
				context.strokeStyle=unitColour;
				context.stroke();
				
				//upper touchline
				context.beginPath();
				context.moveTo(0, 1*unit);
				context.lineTo(width*unit, 1*unit);		
				context.strokeStyle=boundaryLineColour;
				context.stroke();	
				
				//halfway line
				context.beginPath();	
				context.moveTo(0, (height*unit)/2);
				context.lineTo(width*unit, (height*unit)/2);		
				context.strokeStyle=boundaryLineColour;
				context.stroke();

				//lower touchline
				context.beginPath();
				context.moveTo(0, height*unit-unit);
				context.lineTo(width*unit, height*unit-unit);		
				context.strokeStyle=boundaryLineColour;
				context.stroke();
				
				//left sideline
				context.beginPath();
				context.moveTo(4*unit, 0);
				context.lineTo(4*unit, unit*height);
				context.strokeStyle=boundaryLineColour;
				context.stroke();
				
				//right sideline
				context.beginPath();
				context.moveTo(11*unit, 0);
				context.lineTo(11*unit, unit*height);
				context.strokeStyle=boundaryLineColour;
				context.stroke();
								
				//create one player
				context.beginPath();
				context.arc(unit/2, unit/2, unit/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(0,0,255,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();
				
				//create one player
				context.beginPath();
				context.arc(unit+unit/2, unit/2, unit/4, 0, Math.PI * 2, false);
				context.closePath();
				context.fillStyle = "rgba(255,0,0,0.5)";
				context.fill();
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.stroke();			
			}						
		},
		canvasClick: function(e) {
			
			var that = e.data.that;
		
			var left = e.pageX - this.offsetLeft;
			var top = e.pageY - this.offsetTop;
			console.log("(" + left + ", " + top + ")");	
			
			//work out grid position
			var leftGrid = Math.ceil(left/that.unit);
			var topGrid = Math.ceil(top/that.unit);
			console.log("(" + leftGrid + ", " + topGrid + ")"); 
		},
		init: function() {
			this.unit=20;
			this.height=26;
			this.width=15;
			this.unitColour="rgba(0,0,0,0.1)";
			this.boundaryLineColour="rgba(255,255,255,1)";			
			this.controls.canvas=document.getElementById("GameCanvas");
			this.context=this.controls.canvas.getContext("2d");
			$(this.controls.canvas).click({that: this}, this.canvasClick);
			this.render();
		}
	}
} 