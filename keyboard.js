const forCheck = {
  elements: {
    main: null,
  },

  init() {
    this.elements.main = document.createElement("p");
    this.elements.main.classList.add("description");
    this.elements.main.innerHTML = "Работа выполнена в операционной системе iOS. Для переключения языка используется клавиша Shift.";
    document.body.appendChild(this.elements.main);
  }
}

const textArea = {
  elements: {
    main: null,
  },

  init() {

    this.elements.main = document.createElement("textarea");

    this.elements.main.classList.add("use-keyboard-input");
    this.elements.main.placeholder = "Enter text...";

    document.body.appendChild(this.elements.main);
  },

}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    // // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "/", "del",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "pageup", "doneRight",
      "fn", "control", "option", "command", "space", "command", "option", "pageLeft", "pageDn", "pageRight"
    ];

    const keyLayoutRu = [
      "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "_", "+", "backspace",
      "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/", "del",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё", "enter",
      "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?",
      "ctrl", "space"
    ];


    const createIconHTML = (icon_name) => {
      return `<class="material-icons">${icon_name}`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "del", "enter", "doneRight"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("Backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "del":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("DEL");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;



        case "tab":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("Tab");

          keyElement.addEventListener("click", () => {
            this.properties.value += "    ";
            this._triggerEvent("oninput");
          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("⇑");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "command":
          keyElement.classList.add("keyboard__key");
          keyElement.innerHTML = createIconHTML("⌘");

          keyElement.addEventListener("click", () => {
            this.properties.value = "";
            this._triggerEvent("oninput");
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("ENTER");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("Shift");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "doneRight":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("Shift");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "pageup":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("↑");

          keyElement.addEventListener("click", () => {
            this.properties.value += "↑";
            this._triggerEvent("oninput");
          });

          break;

        case "pageRight":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("→");

          keyElement.addEventListener("click", () => {
            this.properties.value += "→";
            this._triggerEvent("oninput");
          });

          break;

        case "pageLeft":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("←");

          keyElement.addEventListener("click", () => {
            this.properties.value += "←";
            this._triggerEvent("oninput");
          });

          break;


        case "pageDn":
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("↓");

          keyElement.addEventListener("click", () => {
            this.properties.value += "↓";
            this._triggerEvent("oninput");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  }
};

window.addEventListener("DOMContentLoaded", function () {
  textArea.init();
})


window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

window.addEventListener("DOMContentLoaded", function() {
  forCheck.init();
});
