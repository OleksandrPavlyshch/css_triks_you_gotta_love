'use strict';
(function () {
	var code = document.querySelectorAll('pre code')
		, count = code.length;

	while(count--){
		hljs.highlightBlock(code[count]);
		}
})();