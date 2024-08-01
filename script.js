document
  .getElementById("darkModeSwitch")
  .addEventListener("change", function (event) {
    if (event.target.checked) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  });

const textarea = document.querySelector("textarea");
const summaryDiv = document.querySelector(".summary p");
const readingTimeDiv = document.querySelector(".summary p:nth-of-type(2)");
let textHistory = [];
let historyIndex = -1;

const saveHistory = () => {
  textHistory = textHistory.slice(0, historyIndex + 1);
  textHistory.push(textarea.value);
  historyIndex++;
};

const updateText = (newText) => {
  saveHistory();
  textarea.value = newText;
  updateSummary();
};

const updateSummary = () => {
  const text = textarea.value;
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = text.length;
  const statementCount = (text.match(/[.!?]/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const exclamationCount = (text.match(/!/g) || []).length;
  const readingTime = Math.ceil(wordCount / 200);

  summaryDiv.innerHTML = `${wordCount} words, ${charCount} characters, ${statementCount} statements, ${questionCount} questions, ${exclamationCount} exclamations.`;
  readingTimeDiv.innerHTML = `${readingTime} Minutes read`;
};

document.querySelector("button:nth-child(1)").addEventListener("click", () => {
  updateText(textarea.value.toUpperCase());
});

document.querySelector("button:nth-child(2)").addEventListener("click", () => {
  updateText(textarea.value.toLowerCase());
});

document.querySelector("button:nth-child(3)").addEventListener("click", () => {
  const sentenceCaseText = textarea.value
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
  updateText(sentenceCaseText);
});

document.querySelector("button:nth-child(4)").addEventListener("click", () => {
  const encodedText = btoa(textarea.value);
  updateText(encodedText);
});

document.querySelector("button:nth-child(5)").addEventListener("click", () => {
  updateText("");
});

document.querySelector("button:nth-child(6)").addEventListener("click", () => {
  const numbers = textarea.value.match(/\d+/g);
  updateText(numbers ? numbers.join(" ") : "");
});

document.querySelector("button:nth-child(7)").addEventListener("click", () => {
  const links = textarea.value.match(/https?:\/\/[^\s]+/g);
  updateText(links ? links.join("\n") : "");
});

document.querySelector("button:nth-child(8)").addEventListener("click", () => {
  updateText(textarea.value);
});

document.querySelector("button:nth-child(9)").addEventListener("click", () => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textarea.value);
  synth.speak(utterThis);
});

document.querySelector("button:nth-child(10)").addEventListener("click", () => {
  const textWithoutWhitespace = textarea.value.replace(/\s+/g, "");
  updateText(textWithoutWhitespace);
});

document.querySelector("button:nth-child(11)").addEventListener("click", () => {
  const textWithoutSpecialChars = textarea.value.replace(/[^\w\s]/gi, "");
  updateText(textWithoutSpecialChars);
});

document.querySelector("button:nth-child(12)").addEventListener("click", () => {
  navigator.clipboard.writeText(textarea.value);
});

document
  .querySelector("button:nth-child(13)")
  .addEventListener("click", async () => {
    const textFromClipboard = await navigator.clipboard.readText();
    updateText(textFromClipboard);
  });

document.querySelector("button:nth-child(14)").addEventListener("click", () => {
  const reversedText = textarea.value.split("").reverse().join("");
  updateText(reversedText);
});

document.querySelector("button:nth-child(15)").addEventListener("click", () => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(textarea.value);
  synth.speak(utterThis);
});

document.querySelector("button:nth-child(16)").addEventListener("click", () => {
  const newText = textarea.value + " - Text changed";
  updateText(newText);
});

document.querySelector("button:nth-child(17)").addEventListener("click", () => {
  if (historyIndex > 0) {
    historyIndex--;
    textarea.value = textHistory[historyIndex];
    updateSummary();
  }
});

document.querySelector("button:nth-child(18)").addEventListener("click", () => {
  if (historyIndex < textHistory.length - 1) {
    historyIndex++;
    textarea.value = textHistory[historyIndex];
    updateSummary();
  }
});

textarea.addEventListener("input", () => {
  saveHistory();
  updateSummary();
});

// Initial summary update
updateSummary();
