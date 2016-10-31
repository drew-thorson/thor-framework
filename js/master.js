$(function () {

	var el = document.getElementById('overlay');

	var c = document.createElement('canvas'),
	    f = c.getContext('2d'),
	    w = c.width = window.innerWidth,
	    h = c.height = window.innerHeight,
	    lines = [],
	    lineCount = 50;

	el.appendChild(c);

	function init() {
	  for (var i = 0; i < lineCount; i++)
	    lines.push(new Line());
	  stage();
	  loop();
	}

	function stage() {
	  w = c.width = window.innerWidth;
	  h = c.height = window.innerHeight;
	  f.fillStyle = 'rgba(50, 50, 50, 1)';
	  f.fillRect(0, 0, w, h);
	}

	function Line() {
	  this.location = {
	    x: Math.random() * w,
	    y: Math.random() * h
	  };
	  this.width = Math.random() * 1 + 0.25;
	  this.color = 'hsla('+~~(Math.random() * 360)+', 100%, 75%, 0.90)';
	}

	function draw() {
	  f.fillStyle = 'rgba(50, 50, 50, 0.025)';
	  f.fillRect(0, 0, w, h);
	  for (var i = 0; i < lines.length; i++) {
	    var l = lines[i],
	        a = ~~(Math.random() * 4) * 90,
	        lL = Math.random() * 15 + 5;
	    f.lineWidth = l.width;
	    f.strokeStyle = l.color;
	    f.beginPath();
	    f.moveTo(l.location.x, l.location.y);
	    switch(a) {
	      case 0:
	        l.location.y -= lL;
	        break;
	      case 90:
	        l.location.x += lL;
	        break;
	      case 180:
	        l.location.y += lL;
	        break;
	      case 270:
	        l.location.x -= lL;
	        break;
	      default:
	        break;
	    }
	    f.lineTo(l.location.x, l.location.y);
	    if (l.location.x < 0 || l.location.x > w)
	      l.location.x = Math.random() * w;
	    if (l.location.y < 0 || l.location.y > h)
	      l.location.y = Math.random() * h;
	    f.stroke();
	  }
	}

	function loop() {
	  draw();
	  requestAnimationFrame(loop);
	}

	window.addEventListener('resize', stage);

	init();


	$('.code-to-prettify').each( function () {
		var mystring = $(this).html();

		mystring = mystring.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

		var mystring = '<div class="l-row pretty-print-code-block"><div class="l-lg-col-1-1"><pre>'+mystring+'</pre></div></div>';

		$(this).after(mystring);
	});

	var pre_elements = document.getElementsByTagName('pre');

	for (var i = 0; i < pre_elements.length; i++) {
		var content = pre_elements[i].innerHTML;

		var tabs_to_remove = '';
		while (content.indexOf('\t') == '0') {
			tabs_to_remove += '\t';
			content = content.substring(1);
		}

		var re = new RegExp('\n' + tabs_to_remove, 'g');
		content = content.replace(re, '\n');

		pre_elements[i].outerHTML = '<pre class="prettyprint linenums">'+content+'</pre>';
	}

	prettyPrint();

});
