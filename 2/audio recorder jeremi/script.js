navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {handlerFunction(stream)})

function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        console.log(btoa(e.data).length);
		console.log(btoa(e.data));
		audioChunks.push(e.data);
		
        if (rec.state == "inactive"){
            let blob = new Blob(audioChunks,{type:'audio/wav'});
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls=true;
            recordedAudio.autoplay=false;
            sendData(blob)
        }
    }
}

function sendData(data) {}

record.onclick = e => {
	contin.disabled = true;
	record.disabled = true;
	pause.disabled = false;
	console.log('I was clicked');
    //record.style.backgroundColor = "blue";
    stopRecord.disabled=false;
    audioChunks = [];
    rec.start();
}

stopRecord.onclick = e => {
	
    console.log("I was clicked");
	contin.disabled = true;
	pause.disabled = true;
    record.disabled = false;
    stop.disabled=true;
    //record.style.backgroundColor = "red";
    rec.stop();
}
pause.onclick = e => {
	 console.log("I was clicked");
	//pause.style.backgroundColor = "green";
	contin.disabled = false;
	pause.disabled = true;
	stopRecord.disabled=true;
	record.disabled = true;
	rec.pause();
	
}
contin.onclick = e => {
	contin.disabled = false;
	record.disabled = true;
	stopRecord.disabled=false;
if(pause.disabled == true){
	rec.resume();
	pause.disabled = false;
	}	
	
}
function timer(){
 var obj=document.getElementById('timer_inp');
 obj.innerHTML--;

 if(obj.innerHTML==0)
 {alert('Hello');
setTimeout(function(){},1000);
}
 else{
	 setTimeout(timer,1000);
 }
}
setTimeout(timer,1000);

