let results;
let current_text;
let i = 0;
let q_box = document.getElementById("question_box");
let current_state = "Q";

function next_question() {
    current_state = "Q";
    q_box.innerHTML = results[i][current_state];
    i++;
    document.getElementById("question_box").style.backgroundColor = "";
}

q_box.onclick = function() {
    switch_text();
    q_box.innerHTML = results[i-1][current_state];
}

function switch_text() {
    if (current_state == "Q") {
        current_state = "A";
        document.getElementById("question_box").style.backgroundColor = "lime";
    } else {
        current_state = "Q";
        document.getElementById("question_box").style.backgroundColor = "";
    }
}

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./data.csv", true);
    xhr.responseType = "text";
    xhr.onload = function() {
      results = Papa.parse(xhr.responseText, {
        header: true // set this to true if the first row contains the header names
      }).data;
    };
    xhr.send();
}