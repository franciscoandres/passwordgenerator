const selectedOptions = document.getElementsByName('options');
const passwordContainer = document.getElementById('passwordContainer');
const passwordLength = document.getElementById('passwordLength');

const DEFAULT_LENGTH = 8;

const characters = {
	lettersLowercase: 'abcdefghijklmnopqrstuvwxyz',
	lettersUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	symbols: '!()-.?[]_;:#$%&*+',
	numbers: '0123456789'
}

const defaultConfiguration = {
	length: DEFAULT_LENGTH,
	createFrom: []
}

let currentOptions = [];
let charsBasedOnOptions = '';
let yourAwesomePassword = '';

function prepareCharsBasedOnOptions (options) {
	charsBasedOnOptions = '';
	options.forEach(option => {
		charsBasedOnOptions += characters[option];
	});
}

function prepareOptions () {
	currentOptions = [];
	for (let selected of selectedOptions) {
		if (selected.checked && !defaultConfiguration.createFrom.includes(selected.value)) {
			currentOptions.push(selected.value);
		}
	}
	if (currentOptions.length === 0) {
		currentOptions.push(selectedOptions[0].checked = true);
	}
}

function pickRandom (characters) {
	return Array.from(characters)[Math.floor(Math.random() * characters.length)];
}

function generatePassword () {
	const length = passwordLength.value ? passwordLength.value : defaultConfiguration.length;
	let counter = 1;
	yourAwesomePassword = '';
	while (counter <= length) {
		yourAwesomePassword += pickRandom(charsBasedOnOptions);
		counter += 1;
	}
}

function displayPassword (password) {
	passwordContainer.innerHTML = '';
	passwordContainer.innerHTML = password;
}

function run () {
	prepareOptions(event);
	prepareCharsBasedOnOptions(currentOptions);
	generatePassword();
	displayPassword(yourAwesomePassword);	
}

document.getElementById('form').addEventListener('submit', (event) => {
	event.preventDefault();
	run();
});

run();
