chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		$(document).ready(function(){
			$('body').append('<div id="aim-container"><div id="top-left" class="corner"></div><div id="top-center" class="corner"></div><div id="top-right" class="corner"></div><div id="bottom-left" class="corner"></div><div id="bottom-center" class="corner"></div><div id="bottom-right" class="corner"></div><div id="aim" class="corner"></div></div>');
			var links = [
				{ from: "top-left", to: "top-center"},
				{ from: "top-left", to: "bottom-left"},
				{ from: "top-left", to: "aim"},
				{ from: "top-center", to: "top-right"},
				{ from: "top-center", to: "aim"},
				{ from: "bottom-center", to: "bottom-right"},
				{ from: "bottom-center", to: "bottom-left"},
				{ from: "bottom-center", to: "aim"},
				{ from: "bottom-right", to: "top-right"},
				{ from: "bottom-right", to: "aim"},
				{ from: "bottom-left", to: "aim"},
				{ from: "top-right", to: "aim"},
			];
			jsPlumb.ready(function() {
				plumb = jsPlumb.getInstance({
					Container: $("#aim-container"),
				});
				plumb.draggable("aim");
				links.forEach(function(link){
					plumb.draggable(link.from);
					plumb.connect({
						source:link.from,
						target:link.to,
						detachable: false,
						endpoint: "Blank",
						anchor: [ "Perimeter", { shape:"Circle" } ],
						connector: [ "Straight",
						{
							curviness: 0,
							margin: 0
						}
						],
						paintStyle:{strokeWidth:2,stroke:'rgb(0,0,0)'}
					});
				});
			});
		});
	}
	}, 10);
});