Prediction = 0;

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
})

camera = document.getElementById("camera");
Webcam.attach("#camera");



  
function Snapshot ()
{    Webcam.snap(function(data_uri){

        document.getElementById("results").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version:", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json",modelLoaded)


function modelLoaded(){
    console.log("model loaded!")
}

function check (){
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResults)
}

function gotResults (error , results){
    if (error){
        console.error(error);       
    }
else {
    console.log(results);
    document.getElementById("name").innerHTML = results[0].label;
   Prediction = results[0].label;
   toSpeak = "";
   if(Prediction == "amazing")
   {toSpeak = "This is amazing"; document.getElementById("icon").innerHTML = "&#128076;"; }
   else
   if(Prediction == "best")
   {toSpeak = "This is best"; document.getElementById("icon").innerHTML = "&#128077;"; }
   else if(Prediction == "victory")
   {toSpeak = "This is victory"; document.getElementById("icon").innerHTML = "&#9996;"; }

   speak(); }}

function speak(){
    var synth = window.speechSynthesis;
speak_data = toSpeak;
var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
}