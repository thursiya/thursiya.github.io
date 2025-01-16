var today = new Date();
document.getElementById('headdate').innerHTML = syear(today,'full');
document.getElementById('headtitle').style.backgroundImage = 'url(vistas/bgvista' + Math.floor((Math.random() * 13) + 1) + '.jpg';