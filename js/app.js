document.addEventListener("DOMContentLoaded", function () {
  var textInputs = document.querySelectorAll(".mask_text");

  textInputs.forEach(function (input) {
    input.addEventListener("keydown", function (event) {
      var k = event.key;
      var allowedKeys = [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ё",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я",

        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ё",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ъ",
        "Ы",
        "Ь",
        "Э",
        "Ю",
        "Я",

        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",

        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",

        " ",
        "Alt",
        "Backspace",
        "Shift",
        "Control",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
      ];

      if (!allowedKeys.includes(k)) {
        event.preventDefault();
      }
    });
  });

  [].forEach.call(
    document.querySelectorAll(".mask_phone"),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        ) {
          this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        }
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );
});


// Form
document
  .querySelector("form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var phoneInput = this.querySelector("input[name='phone']");
    var phone = phoneInput.value;

    if (String(phone)[4] != "9") {
      phoneInput.value = "";
      phoneInput.focus();
      return;
    }

    var formData = new FormData(this);
    var msg = new URLSearchParams(formData).toString();
    var utmData = new FormData(document.getElementById("utm_form"));
    var utm = new URLSearchParams(utmData).toString();

    if (phone) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/lead.php", true);
      xhr.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded; charset=UTF-8"
      );
      xhr.onload = function () {
        if (xhr.status === 200) {
          var textInputs = document.querySelectorAll("input[type=text]");
          var submitInputs = document.querySelectorAll(
            "form input[type=submit]"
          );
          var buttons = document.querySelectorAll("form button");
          textInputs.forEach(function (input) {
            input.disabled = true;
          });
          submitInputs.forEach(function (input) {
            input.disabled = true;
          });
          buttons.forEach(function (button) {
            button.disabled = true;
          });
        } else {
          console.log("Ошибка формы: " + xhr.status);
        }
      };
      xhr.send(msg + "&" + utm);

      var formInputs = this.querySelectorAll("input");
      formInputs.forEach(function (input) {
        input.disabled = true;
      });
    }
  });



var slider_money = document.getElementById("slider-money");
noUiSlider.create(slider_money, {
  start: 0,
  animate: false,
  connect: [true, false],
  step: 500,
  range: {
    min: 300000,
    max: 500000000,
  },
});

var slider_years = document.getElementById("slider-years");
noUiSlider.create(slider_years, {
  start: 0,
  animate: false,
  connect: [true, false],
  step: 1,
  range: {
    min: 1,
    max: 30,
  },
});

slider_money.noUiSlider.on("update", function (values, handle) {
  sum = Math.round(values[handle]);
  document.getElementById("calc_sum").value = sum;
  calc();
});

slider_years.noUiSlider.on("update", function (values, handle) {
  document.getElementById("calc_years").value = Math.round(
    values[handle]
  );
  calc();
});

function calc() {
  var sum = parseFloat(document.getElementById('calc_sum').value.replace(/\s/g, ''));
  var srok = parseFloat(document.getElementById('calc_years').value);
  var perc = 5.9;  // процент
  var term = srok * 12;  // срок в месяцах

  if (sum == 0 || srok == 0) {
    return;
  }

  if (sum > 500000000) {
    document.getElementById('calc_sum').value = 500000000;
    sum = 500000000;
  }
  if (sum < 300000) {
    document.getElementById('calc_sum').value = 300000;
    sum = 300000;
  }

  var p = perc / 1200;
  var a = p * Math.pow((1 + p), term) / (Math.pow((1 + p), term) - 1);
  a = (Math.ceil(a * 10000)) / 10000;

  var month_p = a * sum;
  var pay = Math.round(Math.round(month_p * 100) / 100);
  var result = pay.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  document.querySelector(".calculator__form-result span").textContent = result.toLocaleString();
}

document.getElementById("calc_sum").addEventListener('change', function () {
  var sum = this.value.replace(/\s/g, '');
  slider_money.noUiSlider.set(sum);
  sum = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  this.value = sum;
});

document.getElementById("calc_years").addEventListener('change', function () {
  slider_years.noUiSlider.set(this.value);
});


document.getElementById("calc_sum").addEventListener('change', calc());
document.getElementById("calc_years").addEventListener('change', calc());


const reviews = document.querySelector(".reviews");
if (reviews) {
  const items = reviews.querySelectorAll(".reviews__list .col-item");
  const btn = reviews.querySelector(".btn-more");

  btn.addEventListener("click", () => {
    items.forEach((item) => {
      item.classList.remove("hide");
    })

    btn.style.display = 'none'
  });
}

let dataFancybox = [
  "reviews",
];
dataFancybox.forEach((name) => {
  Fancybox.bind(`[data-fancybox="${name}"]`, {
    Images: {
      Panzoom: {
        maxScale: 3,
      },
    },
  });
});
