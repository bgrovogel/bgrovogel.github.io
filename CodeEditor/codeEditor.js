var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
	lineNumbers: true,
	styleActiveLine: true,
	matchBrackets: true,
	theme: 'material',
	mode: 'javascript',
	autoCloseBrackets: true,
	extraKeys: {
		"F11": function (cm) {
			cm.setOption("fullScreen", !cm.getOption("fullScreen"));
		},
		"Esc": function (cm) {
			if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
		},
		"Ctrl-Space": "autocomplete",
		"Ctrl-Enter": function () {
			runCode();
		}
	}
});

var preview = document.getElementById('preview');

function runCode() {
	var code = editor.getValue();
	preview.innerText = ''; // Clear previous output
	try {
		var result = eval(code);
		if (result !== undefined) {
			preview.innerText = result;
		} else {
			preview.innerText = 'Output will appear here...';
		}
	} catch (error) {
		console.error(error);
		preview.innerText = 'Error: ' + error.message;
	}
}

editor.on('change', function () {
	runCode();
});

function loadFile(event) {
	var file = event.target.files[0];
	var reader = new FileReader();
	reader.onload = function (event) {
		editor.setValue(event.target.result);
		runCode(); // Run code after loading file
	};
	reader.readAsText(file);
}

function saveFile() {
	var content = editor.getValue();
	var blob = new Blob([content], { type: 'text/javascript' });
	var url = URL.createObjectURL(blob);
	var a = document.createElement('a');
	a.href = url;
	a.download = 'code.js';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function openInNewTab() {
	var content = editor.getValue();
	var newTab = window.open();
	newTab.document.write('<pre>' + content + '</pre>');
	newTab.document.close();
}
