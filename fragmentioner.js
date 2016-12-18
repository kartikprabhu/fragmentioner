"use strict";

(function(){
	//mustard cutting
	if (!window.getSelection || !encodeURI) {
        return;
	}

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
		node = selected.node,
		offsets = get_offsets();

		// check if some text was selected
		if (text != '') { 

			ui.style.left = selected.left + offsets.left + (selected.width)/2 + "px";
/*			MAGIC NUMBER 40 */
			ui.style.top = selected.top + offsets.top - 40 + "px";
			ui.getElementsByTagName("a")[0].setAttribute("href", text2frag(text, node));
			ui.style.visibility = "visible";
		}
		else {
			ui.style.visibility = "hidden";
			ui.style.top = "-100%";
		}
	}

	/* functions to convert text to fragmention */

	function text2frag(text, node){

		function getElementsByText(scope, text) {
			// iterate descendants of scope
			for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index) {
				// conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
				if (element.nodeType === 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text) !== -1) {
				    list = list.concat(getElementsByText(element, text));
				}
			}

			// return scope (no match)
			return list.length ? list : scope;
		}

		var hash = '#' + text;

		var elements = getElementsByText(document, text),
			length = elements.length,
			which = length && elements.indexOf(node);

		if (which && which > 0) {
			hash += '++' + which;
		}

		return encodeURI(window.location.protocol + "//" + window.location.host + window.location.pathname + hash);
	}

	/* function to get the position and text of selection */

	function get_selection() {
	    var sel = window.getSelection();
	    if (sel.rangeCount) {
	        var range = sel.getRangeAt(0).cloneRange();
	        if (range.getBoundingClientRect) {
	            var rect = range.getBoundingClientRect(),
					text = sel.toString(),
					node = sel.anchorNode && sel.anchorNode.parentElement,
	            	left = rect.left,
	            	top = rect.top,
					width = rect.right - rect.left;
	        }
	    }
		return { text: text, node: node, left: left, top: top, width: width };
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
