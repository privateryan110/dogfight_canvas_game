//index.js
//for canvas test website

//initialize config vars
let canvas, ctx

function init(){
	const canvas = document.getElementById('gameCanvas')
	const ctx = canvas.getContext('2d')
}

//wait for html to load
document.addEventListener('DOMContentLoaded', init);

