window.onload = function () {
  show(0);
};

let questions = [
  {
    id: 1,
    question: "What is the full form of RAM ?",
    answer: "Random Access Memory",
    options: [
      "Random Access Memory",
      "Randomely Access Memory",
      "Run Aceapt Memory",
      "None of these",
    ],
  },
  {
    id: 2,
    question: "What is the full form of CPU?",
    answer: "Central Processing Unit",
    options: [
      "Central Program Unit",
      "Central Processing Unit",
      "Central Preload Unit",
      "None of these",
    ],
  },
  {
    id: 3,
    question: "What is the full form of E-mail",
    answer: "Electronic Mail",
    options: [
      "Electronic Mail",
      "Electric Mail",
      "Engine Mail",
      "None of these",
    ],
  },
];

function submitFrom(e) {
  e.preventDefault();

  console.log("submitFrom");
  let name = document.forms.frm.input.value;

  sessionStorage.setItem("Name", name);

  location.href = "quiz.html";
}

let cnt = 0;
let qPoint = 0;

function next() {
  //Checking Answer With Array-object Answer(questions)
  let uAns = document.querySelector("li.option.active").innerHTML;

  if (uAns == questions[cnt].answer) {
    qPoint += 10;

    sessionStorage.setItem("Points", qPoint);
  }

  //To GO On Result Page
  if (cnt == questions.length - 1) {
      sessionStorage.setItem('Time', `${minutes}Minutes &  ${seconds} Seconds`);
      clearInterval(mTime);
    location.href = "win.html";
    return;
  }

  console.log(uAns);
  cnt++;
  show(cnt);
  // console.log(cnt);
}

function show(count) {
  let question = document.getElementById("questions");

  question.innerHTML = `
    <h2>Q${cnt+1}.${questions[count].question}</h2>
        <ul class="qList">
            <li class="option active">${questions[count].options[0]}</li>
            <li class="option ">${questions[count].options[1]}</li>
            <li class="option ">${questions[count].options[2]}</li>
            <li class="option ">${questions[count].options[3]}</li>
        </ul>
    `;

  active();
}

function active() {
  let option = document.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
          option[i].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
