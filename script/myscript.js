$("#start").animate({top: "-500px"}, 400);
$("#start").click(function(){model.startGame()});
$("#start").animate({top: "25%"}, 400);
$("#back").animate({top: "-1000px"}, 45000);
$("#next").click(function(){model.nextLevel();});
var a = $(document).height();
$("#wrapper").css({"height": a});
//$("#next").click(function(){})	
var model = {
	x: 0,
	y: 0,
	level: 20000,
	levelGame: 1,
	enemyArray: [],
	verticalPosition: 0,
	amount: parseInt($('input:radio[name=level]:checked').val()),
	hits: 0,
	boardSize : $("#wrapper").css('width').split('p')[0],
	map : document.getElementsByTagName("body"),
	startGame : function() {
		$("#tank").show();		
		for (var i=0; i<model.amount; i++){	
			setTimeout(function (i){model.enemyArray[i].run()}, getRandom(model.amount*600), i);		
			$("#start").animate({top: "-500px"}, 400);
			model.map[0].onmousemove = moveMouse;
			model.map[0].touchmove = moveMouse;
			};
		enemyCreate(model.amount);
		$("form").fadeOut(10000);
		$("#resultLevel").html("<span>Рiвень: " + model.levelGame +" </span>" );
		$("#back").animate({top: "-1000px"}, 45000);
		$("#wrapper").css({"height": a});
	},
	nextLevel: function() {
		model.levelGame = model.levelGame + 1;
		model.amount = model.amount + 15;
		$("#wrapper").css('cursor', 'none');		
		$("#back").css('background' , 'url(image/backgorunds/backLevel'+ model.levelGame +'.jpg)');
		$("#back").css('top' , "0");		
		$("#next").animate({top: "-500px"}, 400);
		model.enemyArray = [];
		model.hits =  0;		
		model.startGame();		
	},
	restartGame() {

}
};

function EnemyCon (i) {	
	this.index = '#'+i;	
	$("#wrapper").append("<div class='enemy' id='" + i + "'>");
	//this.heightPosition = i;
	this.position = getRandom(model.boardSize-48);	
	this.run = function(){		
		$(this.index).animate({top: 800},model.level); 
		$(this.index).css('left',this.position);
		this.position = parseInt($(this.index).css('left').split('p')[0]);
		this.enemyLength = this.position + parseInt($(this.index).css('width').split('p')[0]);		
		
		};
	/*this.stop = function(){
		
	 };*/
	this.hit =  function() {
		$(this.index).addClass('hit');
			
	//soundClick();		
		var prom = this.index;		
		setTimeout( function (){$(prom).remove()}, 1000);	
		model.hits++;
		if (model.amount == model.hits) {			
			$("#win").animate({top: "25%"}, 400).delay(2000).animate({top: "-500px"}, 400);
			$("#next").delay(2200).animate({top: "25%"}, 400);
			$("#wrapper").css('cursor', 'default');
					
			};
		};		
	};	

function enemyCreate(amount) {
	for (i=0; i<amount;i++){
	model.enemyArray.push(new EnemyCon(i))
		};	
	};		


function moveMouse(e) {
	model.x = e.clientX;
	model.y = e.clientY;
	var result = document.getElementById("result");	
	$("#result").html("<span>Кординати: " + model.x + "</br>Влучив: " + model.hits+ "</br>Опонентів: "+ model.amount+ " </span>" );
	$("#tank").css("left", model.x);		
}
	$(model.map).click(function(){	
		$("#bullet").css('left', model.x + 14 + "px");		
		setTimeout (bullet.moveBullet,200);
		setTimeout (bullet.toStart,400);		
		for (i=0; i <model.amount; i++) {
			//model.enemyArray[i].verticalPosition = $("#"+i).css("top")
		if (model.x >= model.enemyArray[i].position && model.x <= model.enemyArray[i].enemyLength) {
			model.enemyArray[i].hit();			
			model.enemyArray[i].position= -48;
			model.enemyArray[i].enemyLength = -48;
			model.enemyArray[i].enemyLength = -48;
			
		};
		/*if(model.enemyArray[i].verticalPosition.split('p')[0] < -800){
			alert("game over")
		};*/};
	
	});

var bullet = {
	moveBullet: function() {
		$("#bullet").animate({bottom: $("#wrapper").height()}, 250)	
	},
	toStart: function(){
		$("#bullet").animate({bottom: "-20px"}, 0)} 	
	};

function getRandom (num) {
	var my_number = Math.floor(Math.random()*num);
	return	my_number 
};


//function soundClick() {
  // var audio = new Audio(); 
  // audio.src = 'crash.wav'; 
  // audio.autoplay = true; 
//}
