var lbz = document.getElementById("lbz");
var trunk = document.getElementsByClassName("trunk")[0];
var update = document.getElementsByTagName("li");
var lbt = document.getElementById("lbt");
var leftBt = document.getElementsByClassName("leftButton")[0];
var rightBt = document.getElementsByClassName("rightButton")[0];
var isMoving = false;
var index = 1;
var time;
function getStyle(obj,style) {  
	if(obj.currentStyle) 
	{  
		return obj.currentStyle[style];  
	} 
	else 
	{  
		return getComputedStyle(obj)[style];  
	}  
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
function gun(){
	var timer = setInterval(function(){		
		var now = parseInt(getStyle(lbz,"left"));
		lbz.style.left = now-4+"px";
		if(now <=-420){
				lbz.style.left = now + 1600+"px";
			}
	},50)
}
function updateNext(){
	for(var i = 0;i<update.length;i++){
		update[i].className = "";
	}
	if(index > 5){
		update[0].className = "first";
	}
	else if(index == 0){
		update[4].className = "first";
	}
	else{
		update[index - 1].className = "first";
	}
}
for(var i = 0;i<update.length;i++){
	update[i].index = i;
	update[i].onclick = function(){
		index = this.index + 1;
		updateNext();
		animate(lbt,{left:-1200*index});
	}
}
leftBt.onclick = function(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index --;
	updateNext();
	animate(lbt,{left:-1200*index},function(){
		if(index == 0){
			lbt.style.left = "-6000px";
			index = 5;
		}
		isMoving = false;
	});
}
rightBt.onclick = function(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index ++;
	updateNext();
	animate(lbt,{left:-1200*index},function(){
		if(index == 6){
			lbt.style.left = "-1200px";
			index = 1;
		}
		isMoving = false;
	});
}
trunk.onmouseout = function(){
	animate(leftBt, {opacity:0});
	animate(rightBt, {opacity:0});
	time = setInterval(rightBt.onclick,3000);
}
trunk.onmouseover = function(){
	animate(leftBt, {opacity:65});
	animate(rightBt, {opacity:65});
	clearInterval(time);
}
window.onload = gun();
time = setInterval(rightBt.onclick, 3000);