const socket = io();

socket.on('datos', function(data){
  console.log(data)
  
  let hum = document.getElementById('hum')
  hum.innerHTML = `${data[0]}%`

  let temp = document.getElementById('temp')
  temp.innerHTML = `${data[1]}ºC`

});

