(function(){
	// get the UI element
	var ui = document.getElementById("fragmentioner-ui");
	// show button on mouseup/touchend
	document.body.addEventListener("mouseup", show_frag_btn, false);
	document.body.addEventListener("touchend", show_frag_btn, false);

	/* function to reveal the UI */

	function show_frag_btn(event) {
		var
		selected = get_selection(),
		text = selected.text,
		offsets = get_offsets();

		// check if some text was selected
		if (text!=''){ 

			ui.style.left = selected.left + offsets.left + (selected.width)/2 + "px";
/*			MAGIC NUMBER 40 */
			ui.style.top = selected.top + offsets.top - 40 + "px";
			ui.getElementsByTagName("a")[0].setAttribute("href", text2frag(text));
			ui.style.visibility = "visible";
		}
		else {
			ui.style.visibility = "hidden";
			ui.style.top = "-100%";
		}
	}

	/* function to convert text to fragmention */

	function text2frag(text){
		return encodeURI(window.location.protocol + "//" + window.location.host + window.location.pathname + "#" + text);
	}

	/* function to get the position and text of selection */

	function get_selection() {
		var sel, range;
		var left = 0, top = 0, width = 0;
		if ('getSelection' in window) {
		    sel = window.getSelection();
		    if (sel.rangeCount) {
		        range = sel.getRangeAt(0).cloneRange();
		        if (range.getBoundingClientRect) {
		            var rect = range.getBoundingClientRect();
					text = sel.toString();
		            left = rect.left;
		            top = rect.top;
					width = rect.right - rect.left;
		        }
		    }
		}
		else if ('selection' in document) {
			sel = document.selection;
		    if (sel.type != "Control") {
		        range = sel.createRange();
				text = range.text;
		        left = range.boundingLeft;
		        top = range.boundingTop;
				width = range.boundingWidth;

		    }
		} 
		return { text: text, left: left, top: top, width: width };
	}

	/*  function to get scroll offsets */

	function get_offsets(){
		var left = 0, top = 0;
		if ('pageXOffset' in window){
			left = window.pageXOffset;
			top = window.pageYOffset;
		}
		else if ('scrollLeft' in document.documentElement){
			left = document.documentElement.scrollLeft;
			top = document.documentElement.scrollTop;
		}
		return { left: left, top: top };
	}
})();
