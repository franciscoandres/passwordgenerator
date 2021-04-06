const selectedOptions = document.getElementsByName("options");
const passwordLength = document.getElementById("passwordLength");
const form = document.getElementById("form");
const toCopy = document.getElementById("clickToCopy");

const DEFAULT_PASSWORD_LENGTH = 8;

const CHARACTERS_SET = {
  lettersLowercase: "abcdefghijklmnopqrstuvwxyz",
  lettersUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "!()-.?[]_;:#$%&*+",
  numbers: "0123456789",
};

function text(element, text) {
  return (document.querySelector(element).innerHTML = text);
}

function copyToClipboard(element) {
  const text = document.querySelector(element).innerText;
  const elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
}

function getCharactersSetSelected(list) {
  return list.filter((item) => item.checked);
}

function getCharactersValue(list, set) {
  return list.reduce((previousValue, currentValue) => {
    return previousValue.concat(Array.from(set[currentValue.value]));
  }, []);
}

function generatePassword(list, length) {
  return Array.from({ length })
    .map((item) => (item = list[Math.floor(Math.random() * list.length)]))
    .join("");
}

function run({ length = DEFAULT_PASSWORD_LENGTH, selected = [] }) {
  return generatePassword(
    getCharactersValue(
      getCharactersSetSelected(Array.from(selected)),
      CHARACTERS_SET
    ),
    length
  );
}

function render(element, length, selected) {
  text(
    element,
    run({
      length,
      selected,
    })
  );
}

toCopy.addEventListener("click", () => copyToClipboard("#passwordContainer"));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (selectedOptions.length) selectedOptions[1].setAttribute("checked", true);

  render(
    "#passwordContainer",
    passwordLength.value || DEFAULT_PASSWORD_LENGTH,
    selectedOptions
  );
});

render(
  "#passwordContainer",
  passwordLength.value || DEFAULT_PASSWORD_LENGTH,
  selectedOptions
);
