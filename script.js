import {MnistData} from './data.js';
var canvas, ctx, saveButton, clearButton;
var canvas1,ctx1, SaveButton, ClearButton;
var first,second;
var pos = {x:0, y:0};
var Pos = {x:0, y:0};
var rawImage,rawImage1;
var model;


function getModel() {
	model = tf.sequential();
import {MnistData} from './data.js';
var canvas, ctx, saveButton, clearButton;
var canvas1,ctx1, SaveButton, ClearButton;
var first,second;
var pos = {x:0, y:0};
var Pos = {x:0, y:0};
var rawImage,rawImage1;
var model;


function getModel() {
	model = tf.sequential();

	model.add(tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 32, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.add(tf.layers.conv2d({filters: 64, kernelSize: 3, activation: 'relu'}));
    model.add(tf.layers.conv2d({filters: 64, kernelSize: 3, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
	model.add(tf.layers.flatten());
	model.add(tf.layers.dense({units: 128, activation: 'relu'}));
	model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

	model.compile({optimizer: tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']});

	return model;
}

async function train(model, data) {
	const metrics = ['loss', 'val_loss', 'accuracy', 'val_accuracy'];
	const container = { name: 'Model Training', styles: { height: '640px' } };
	const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  
	const BATCH_SIZE = 512;
	const TRAIN_DATA_SIZE = 5500;
	const TEST_DATA_SIZE = 1000;

	const [trainXs, trainYs] = tf.tidy(() => {
		const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
		return [
			d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

	const [testXs, testYs] = tf.tidy(() => {
		const d = data.nextTestBatch(TEST_DATA_SIZE);
		return [
			d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

	return model.fit(trainXs, trainYs, {
		batchSize: BATCH_SIZE,
		validationData: [testXs, testYs],
		epochs: 20,
		shuffle: true,
		callbacks: fitCallbacks
	});
}





function setPosition(e){
	pos.x = e.clientX-100;
	pos.y = e.clientY-100;
}
function SetPosition(e)
{
    Pos.x = e.clientX-450;
    Pos.y = e.clientY-100;
}
function draw(e) {
	if(e.buttons!=1) return;
	ctx.beginPath();
	ctx.lineWidth = 24;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.moveTo(pos.x, pos.y);
	setPosition(e);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	rawImage.src = canvas.toDataURL('image/png');
}

function Draw(e) {
	if(e.buttons!=1) return;
	ctx1.beginPath();
	ctx1.lineWidth = 24;
	ctx1.lineCap = 'round';
	ctx1.strokeStyle = 'white';
	ctx1.moveTo(Pos.x, Pos.y);
	SetPosition(e);
	ctx1.lineTo(Pos.x, Pos.y);
	ctx1.stroke();
	rawImage1.src = canvas1.toDataURL('image1/png');
}
    
function erase() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
}
    
function Erase() {
	ctx1.fillStyle = "black";
	ctx1.fillRect(0,0,280,280);
}

function Digit()
{
    if(second==1)return "One " ;
    else if(second==2)return "Two " ;
    else if(second==3)return "Three " ;
    else if(second==4)return "Four" ;
    else if(second==5)return "Five " ;
    else if(second==6)return "Six" ;
    else if(second==7)return "Seven " ;
    else if(second==8)return "Eight" ;
    else if(second==9)return "Nine";
    else return;
}
function digit()
{
   //alert(first);
    if(first == "0")
        {
            if(second=="0")document.getElementById("demo").innerHTML = "Zero ";
            else document.getElementById("demo").innerHTML = Digit() ;
        }
    else if(first=="1"){
        if(second=="0")document.getElementById("demo").innerHTML = "Ten " ;
        else if(second=="1")document.getElementById("demo").innerHTML = "Eleven " ;
        else if(second=="2")document.getElementById("demo").innerHTML = "Twelve " ;
        else if(second=="3")document.getElementById("demo").innerHTML = "Thirteen " ;
        else if(second=="4")document.getElementById("demo").innerHTML = "Fourteen " ;
        else if(second=="5")document.getElementById("demo").innerHTML = "Fifteen " ;
        else if(second=="6")document.getElementById("demo").innerHTML = "Sixteen " ;
        else if(second=="7")document.getElementById("demo").innerHTML = "Seventeen " ;
        else if(second=="8")document.getElementById("demo").innerHTML = "Eighteen " ;
        else if(second=="9")document.getElementById("demo").innerHTML = "Nineteen " ;
    }
    else if(first=="2")
    {
        if(second=="0")
            document.getElementById("demo").innerHTML = "Twenty " ;
        else{
            document.getElementById("demo").innerHTML = "Twenty " + Digit();
        }
    }
    else if(first=="3")
    {
        if(second=="0")
            document.getElementById("demo").innerHTML = "Thirty " ;
        else
            document.getElementById("demo").innerHTML = "Thirty " + Digit();
        
    }
    else if(first=="4"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Fourty " ;
        else
            document.getElementById("demo").innerHTML = "Fourty " + Digit();
    }
    else if(first=="5"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Fifty " ;
        else
            document.getElementById("demo").innerHTML = "Fifty " + Digit();
    }
    else if(first=="6"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Sixty " ;
        else
            document.getElementById("demo").innerHTML = "Sixty " + Digit();
    }
    else if(first=="7"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Seventy " ;
        else
            document.getElementById("demo").innerHTML = "Seventy " + Digit();
    }
    else if(first=="8"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Eighty " ;
        else
            document.getElementById("demo").innerHTML = "Eighty " + Digit();
    }
    else if(first=="9"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Ninety " ;
        else
            document.getElementById("demo").innerHTML = "Ninety " + Digit();
    }
 //   else return;
}

function Save() {
	var raw = tf.browser.fromPixels(rawImage1,1);
	var resized = tf.image.resizeBilinear(raw, [28,28]);
	var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var PIndex = tf.argMax(prediction, 1).dataSync();
    second = PIndex;
    //alert(second);
    document.getElementById("Sec").innerHTML = first+ second;
    digit();
	
}
function save() {
	var raw = tf.browser.fromPixels(rawImage,1);
	var resized = tf.image.resizeBilinear(raw, [28,28]);
	var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var pIndex = tf.argMax(prediction, 1).dataSync();
    first = pIndex;
    //alert(first);
   // document.getElementById("demo").innerHTML = first;
    //digit();
	
}



function init() {
	canvas = document.getElementById('canvas');
	rawImage = document.getElementById('canvasimg');
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mousedown", setPosition);
	canvas.addEventListener("mouseenter", setPosition);
	saveButton = document.getElementById('sb');
	saveButton.addEventListener("click", save);
	clearButton = document.getElementById('cb');
	clearButton.addEventListener("click", erase);
    
    
    
    canvas1 = document.getElementById('canvas1');
	rawImage1 = document.getElementById('canvasimg1');
	ctx1 = canvas1.getContext("2d");
	ctx1.fillStyle = "black";
	ctx1.fillRect(0,0,280,280);
	canvas1.addEventListener("mousemove", Draw);
	canvas1.addEventListener("mousedown", SetPosition);
	canvas1.addEventListener("mouseenter", SetPosition);
	SaveButton = document.getElementById('sb');
	SaveButton.addEventListener("click", Save);
	ClearButton = document.getElementById('cb');
	ClearButton.addEventListener("click", Erase);
    //digit(first,second);
    //document.getElementById("Sec").innerHTML = first + second;
}


async function run() {  
	const data = new MnistData();
	await data.load();
	const model = getModel();
	tfvis.show.modelSummary({name: 'Model Architecture'}, model);
	await train(model, data);
	init();
	alert("Training is done, try classifying your handwriting!");
}

document.addEventListener('DOMContentLoaded', run);

	model.add(tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 16, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
    model.add(tf.layers.conv2d({filters: 32, kernelSize: 3, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
	model.add(tf.layers.flatten());
	model.add(tf.layers.dense({units: 128, activation: 'relu'}));
	model.add(tf.layers.dense({units: 10, activation: 'softmax'}));

	model.compile({optimizer: tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']});

	return model;
}

async function train(model, data) {
	const metrics = ['loss', 'val_loss', 'accuracy', 'val_accuracy'];
	const container = { name: 'Model Training', styles: { height: '640px' } };
	const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
  
	const BATCH_SIZE = 512;
	const TRAIN_DATA_SIZE = 5500;
	const TEST_DATA_SIZE = 1000;

	const [trainXs, trainYs] = tf.tidy(() => {
		const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
		return [
			d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

	const [testXs, testYs] = tf.tidy(() => {
		const d = data.nextTestBatch(TEST_DATA_SIZE);
		return [
			d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

	return model.fit(trainXs, trainYs, {
		batchSize: BATCH_SIZE,
		validationData: [testXs, testYs],
		epochs: 20,
		shuffle: true,
		callbacks: fitCallbacks
	});
}





function setPosition(e){
	pos.x = e.clientX-100;
	pos.y = e.clientY-100;
}
function SetPosition(e)
{
    Pos.x = e.clientX-450;
    Pos.y = e.clientY-100;
}
function draw(e) {
	if(e.buttons!=1) return;
	ctx.beginPath();
	ctx.lineWidth = 24;
	ctx.lineCap = 'round';
	ctx.strokeStyle = 'white';
	ctx.moveTo(pos.x, pos.y);
	setPosition(e);
	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	rawImage.src = canvas.toDataURL('image/png');
}

function Draw(e) {
	if(e.buttons!=1) return;
	ctx1.beginPath();
	ctx1.lineWidth = 24;
	ctx1.lineCap = 'round';
	ctx1.strokeStyle = 'white';
	ctx1.moveTo(Pos.x, Pos.y);
	SetPosition(e);
	ctx1.lineTo(Pos.x, Pos.y);
	ctx1.stroke();
	rawImage1.src = canvas1.toDataURL('image1/png');
}
    
function erase() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
}
    
function Erase() {
	ctx1.fillStyle = "black";
	ctx1.fillRect(0,0,280,280);
}

function Digit()
{
    if(second==1)return "One " ;
    else if(second==2)return "Two " ;
    else if(second==3)return "Three " ;
    else if(second==4)return "Four" ;
    else if(second==5)return "Five " ;
    else if(second==6)return "Six" ;
    else if(second==7)return "Seven " ;
    else if(second==8)return "Eight" ;
    else if(second==9)return "Nine";
    else return;
}
function digit()
{
   //alert(first);
    if(first == "0")
        {
            if(second=="0")document.getElementById("demo").innerHTML = "Zero ";
            else document.getElementById("demo").innerHTML = Digit() ;
        }
    else if(first=="1"){
        if(second=="0")document.getElementById("demo").innerHTML = "Ten " ;
        else if(second=="1")document.getElementById("demo").innerHTML = "Eleven " ;
        else if(second=="2")document.getElementById("demo").innerHTML = "Twelve " ;
        else if(second=="3")document.getElementById("demo").innerHTML = "Thirteen " ;
        else if(second=="4")document.getElementById("demo").innerHTML = "Fourteen " ;
        else if(second=="5")document.getElementById("demo").innerHTML = "Fifteen " ;
        else if(second=="6")document.getElementById("demo").innerHTML = "Sixteen " ;
        else if(second=="7")document.getElementById("demo").innerHTML = "Seventeen " ;
        else if(second=="8")document.getElementById("demo").innerHTML = "Eighteen " ;
        else if(second=="9")document.getElementById("demo").innerHTML = "Nineteen " ;
    }
    else if(first=="2")
    {
        if(second=="0")
            document.getElementById("demo").innerHTML = "Twenty " ;
        else{
            document.getElementById("demo").innerHTML = "Twenty " + Digit();
        }
    }
    else if(first=="3")
    {
        if(second=="0")
            document.getElementById("demo").innerHTML = "Thirty " ;
        else
            document.getElementById("demo").innerHTML = "Thirty " + Digit();
        
    }
    else if(first=="4"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Fourty " ;
        else
            document.getElementById("demo").innerHTML = "Fourty " + Digit();
    }
    else if(first=="5"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Fifty " ;
        else
            document.getElementById("demo").innerHTML = "Fifty " + Digit();
    }
    else if(first=="6"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Sixty " ;
        else
            document.getElementById("demo").innerHTML = "Sixty " + Digit();
    }
    else if(first=="7"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Seventy " ;
        else
            document.getElementById("demo").innerHTML = "Seventy " + Digit();
    }
    else if(first=="8"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Eighty " ;
        else
            document.getElementById("demo").innerHTML = "Eighty " + Digit();
    }
    else if(first=="9"){
        
        if(second=="0")
            document.getElementById("demo").innerHTML = "Ninety " ;
        else
            document.getElementById("demo").innerHTML = "Ninety " + Digit();
    }
 //   else return;
}

function Save() {
	var raw = tf.browser.fromPixels(rawImage1,1);
	var resized = tf.image.resizeBilinear(raw, [28,28]);
	var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var PIndex = tf.argMax(prediction, 1).dataSync();
    second = PIndex;
    //alert(second);
    document.getElementById("Sec").innerHTML = first+ second;
    digit();
	
}
function save() {
	var raw = tf.browser.fromPixels(rawImage,1);
	var resized = tf.image.resizeBilinear(raw, [28,28]);
	var tensor = resized.expandDims(0);
    var prediction = model.predict(tensor);
    var pIndex = tf.argMax(prediction, 1).dataSync();
    first = pIndex;
    //alert(first);
   // document.getElementById("demo").innerHTML = first;
    //digit();
	
}



function init() {
	canvas = document.getElementById('canvas');
	rawImage = document.getElementById('canvasimg');
	ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,280,280);
	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mousedown", setPosition);
	canvas.addEventListener("mouseenter", setPosition);
	saveButton = document.getElementById('sb');
	saveButton.addEventListener("click", save);
	clearButton = document.getElementById('cb');
	clearButton.addEventListener("click", erase);
    
    
    
    canvas1 = document.getElementById('canvas1');
	rawImage1 = document.getElementById('canvasimg1');
	ctx1 = canvas1.getContext("2d");
	ctx1.fillStyle = "black";
	ctx1.fillRect(0,0,280,280);
	canvas1.addEventListener("mousemove", Draw);
	canvas1.addEventListener("mousedown", SetPosition);
	canvas1.addEventListener("mouseenter", SetPosition);
	SaveButton = document.getElementById('sb');
	SaveButton.addEventListener("click", Save);
	ClearButton = document.getElementById('cb');
	ClearButton.addEventListener("click", Erase);
    //digit(first,second);
    //document.getElementById("Sec").innerHTML = first + second;
}


async function run() {  
	const data = new MnistData();
	await data.load();
	const model = getModel();
	tfvis.show.modelSummary({name: 'Model Architecture'}, model);
	await train(model, data);
	init();
	alert("Training is done, try classifying your handwriting!");
}

document.addEventListener('DOMContentLoaded', run);
