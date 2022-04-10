"use strict";

let oyatEn = [];
let oyatAr = [];
let oyatmp3 = [];
let id;

document.querySelector(".one").addEventListener("click", () => {
  popUp.style.visibility = "visible";
  func1(67);
});
document.querySelector(".one1").addEventListener("click", () => {
  popUp.style.visibility = "visible";
  func1(36);
});

document.querySelector(".one3").addEventListener("click", () => {
  popUp.style.visibility = "visible";
  func1(18);
});
document.querySelector(".one4").addEventListener("click", () => {
  popUp.style.visibility = "visible";
  func1(38);
});
let sura = document.querySelector(".sura--card");
let close = document.querySelector(".close");

let englishPopUp = document.querySelector(".english1");
let arabicPopUp = document.querySelector(".arabic1");

let englishPopUpBtn = document.querySelector(".english");
let arabicPopUpBtn = document.querySelector(".arabic");
let popUp = document.querySelector(".popUp");
let audio = document.querySelector("audio");

let func = function () {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((a) => {
      return a.json();
    })
    .then((s) => {
      s.data.forEach((element) => {
        let html = `<div class="sura--card-1" id="${element.number}">
            <div class="tartib flex"><p class="tartib1">${element.number}</p></div>
            <div class="sura-nomi-english">
              <h2>${element.name.transliteration.en}</h2>
              <p>${element.name.translation.en}</p>
            </div>
            <div class="arabchasi">
              <h2>${element.name.short}</h2>
              <p>${element.numberOfVerses}</p>
            </div>
          </div>`;
        sura.insertAdjacentHTML("beforeend", html);
      });
    });
};
func();

sura.addEventListener("click", function (e) {
  if (e.target.classList.contains("sura--card-1")) {
    popUp.style.visibility = "visible";
    document.querySelector(".img").style.visibility = "visible";
    id = e.target.id;
    oyatmp3 = [];
    func1(id);
    audio1();
  }
});

let popUpEnglish = function () {
  englishPopUp.innerHTML = "";
  oyatEn.forEach((element) => {
    let html = ` <p>${element}</p>`;
    englishPopUp.insertAdjacentHTML("beforeend", html);
  });
};
let popUpArabic = function () {
  arabicPopUp.innerHTML = "";
  oyatAr.forEach((element) => {
    let html = ` <p class="popUp-p">${element}</p>`;
    arabicPopUp.insertAdjacentHTML("beforeend", html);
  });
};

let sanash = 0;
let sanash1 = 0;
let t = 1;

let func1 = async function (id) {
  fetch(`https://api.quran.sutanlab.id/surah/${id}`)
    .then((a) => {
      return a.json();
    })
    .then((b) => {
      oyatmp3 = [];
      oyatEn = [];
      oyatAr = [];
      b.data.verses.forEach((element) => {
        oyatmp3.push(element.audio.primary);
        oyatEn.push(element.text.transliteration.en);
        oyatAr.push(element.text.arab);
      });
      audio.src = oyatmp3[0];
      audio.addEventListener("ended", function () {
        audio.innerHTML = "";
        if (t < oyatmp3.length) {
          audio.src = oyatmp3[t++];
          audio.play();
        }
      });
      popUpEnglish();
    })
    .finally(() => {
      document.querySelector(".img").style.visibility = "hidden";
    });
};
let audio1 = function () {};

arabicPopUpBtn.addEventListener("click", function (e) {
  popUpArabic();
  englishPopUp.style.display = "none";
  arabicPopUp.classList.add("bir");
  arabicPopUp.style.textAlign = "right";
  arabicPopUp.style.display = "block";
  sanash1++;
});
englishPopUpBtn.addEventListener("click", function (e) {
  popUpEnglish();
  englishPopUp.style.display = "block";
  arabicPopUp.style.display = "none";
  englishPopUp.classList.add("bir");
  popUpEnglish();
  sanash++;
});

close.addEventListener("click", function () {
  document.location.reload();
  audio.src = "";
  popUp.style.visibility = "hidden";
  popUpEnglish();
  englishPopUp.style.display = "block";
  arabicPopUp.style.display = "none";
  englishPopUp.classList.add("bir");
  popUpEnglish();
  sanash++;
});
// document.querySelector(".english").click();
