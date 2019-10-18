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
	setTimeout(timer,1000);
	record.disabled = true;
	pause.disabled = false;
	console.log('I was clicked');
    stopRecord.disabled=false;
    audioChunks = [];
    rec.start();
}

stopRecord.onclick = e => {
	console.log("I was clicked");
	pause.disabled = true;
    record.disabled = false;
    stopRecord.disabled=true;
    rec.stop();
}
var i=1;
pause.onclick = e => {
	i++;
	console.log(i);
	if(i % 2==0){
	rec.pause();
	console.log("I was clicked");
	stopRecord.disabled=true;
	record.disabled = true;
	}
	else{
	console.log("I was clicked");
	rec.resume();
	stopRecord.disabled=false;
	record.disabled = true;
}
        
}	
	
	


function timer(){
 var obj=document.getElementById('timer_inp');
 obj.innerHTML++;

 if(obj.innerHTML==0)
 {alert('Hello');
setTimeout(function(){},1000);
}
 else{
	 setTimeout(timer,1000);
 }
}


