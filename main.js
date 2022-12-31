Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(Aarush){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+Aarush+'"/>';

    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NfLeIxJQ0/',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!!!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThat = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThat);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        console.log("emoji");
        if(results[0].label == "Superb"){
            document.getElementById("update_emoji").innerHTML = "&#x1f44c;;";
        }
        if(results[0].label == "Victory"){
            document.getElementById("update_emoji").innerHTML = "&#x270c;";
        }
        if(results[0].label == "Best"){
            document.getElementById("update_emoji").innerHTML = "&#x1f44d;";
        }
        if(results[1].label == "Superb"){
            document.getElementById("update_emoji2").innerHTML = "&#x1f44c;";
        }
        if(results[1].label == "Victory"){
            document.getElementById("update_emoji2").innerHTML = "&#x270c;";
        }
        if(results[1].label == "Best"){
            document.getElementById("update_emoji2").innerHTML = "&#x1f44d;";
        }


    }
}


