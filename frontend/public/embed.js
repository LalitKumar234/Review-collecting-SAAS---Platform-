var scriptTag = document.currentScript;

var head = document.head;
var link = document.createElement('link');

link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'http://localhost:5173/embed.css';

head.appendChild(link);
var widgetUrl = scriptTag.getAttribute('data-widget-url');

var container = document.createElement('iframe');

container.id = 'widget-container';
container.classList = 'wall-of-love'
container.src = widgetUrl;
container.setAttribute("scrolling", "no")

scriptTag.parentNode.insertBefore(container, scriptTag.nextSibling);


