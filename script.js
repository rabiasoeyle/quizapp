let questions = [
    {
        "question": "Was ist die Hauptstadt von Ghana? ",
        "answer_1":"Wa",
        "answer_2":"Tschad",
        "answer_3":"Accra",
        "answer_4":"Tamale",
        "right_answer":3,
    },
    {
        "question": "Von wann bis wann dauerte der erste Weltkrieg?",
        "answer_1":"1789-1799",
        "answer_2":"1939-1945",
        "answer_3":"1961-1989",
        "answer_4":"1914-1918",
        "right_answer":4,
    },
    {
        "question": "Wann entdeckte Christoph Kolumbus Amerika?",
        "answer_1":"1504",
        "answer_2":"1492",
        "answer_3":"1312",
        "answer_4":"1464",
        "right_answer":2,
    },
    // {
    //     "question": "Welches Bundesland ist flächenmäßig das größte?",
    //     "answer_1":"Baden-Württemberg",
    //     "answer_2":"Nordrhein-Westfalen",
    //     "answer_3":"Bayern",
    //     "answer_4":"Niedersachsen",
    //     "right_answer":3,
    // },
    // {
    //     "question": "Wie viele Planeten gehören zu unserem Sonnensystem?",
    //     "answer_1":"8",
    //     "answer_2":"9",
    //     "answer_3":"4",
    //     "answer_4":"10",
    //     "right_answer":1,
    // },
]
let currentQuestion = 0;
let rightAnswers = 0;
let audioSuccess = new Audio ('./audio/win.mp3');
let audioFail = new Audio ('./audio/loose.mp3');

function init(){
    document.getElementById('questionsLength').innerHTML = questions.length;
    showQuestion();
}


function showQuestion(){
    if(currentQuestion >= questions.length){//showEnd
        //todo show end Screen
        document.getElementById('endScreen').style ="";
        // Hier wird auf das Style-Tag aus der html Datei zugegriffen, somit wird display none ungültig
        document.getElementById('questionBody').style = "display:none;";
        document.getElementById('questionsLengthEnd').innerHTML = questions.length;
        document.getElementById('amountRightAnswers').innerHTML = rightAnswers;
        document.getElementById('headerImage').src = "./img/quiz.png";
        document.getElementById('percent').innerHTML = 100 + '%';
        document.getElementById('percent').style.width = `100%`;
    }else{//show question
        let percent = Math.round((currentQuestion/questions.length)*100);
        //math.round wird genutzt, um die Nachkommastellen aufzurunden
        let question = questions[currentQuestion];
        document.getElementById('percent').innerHTML = percent + '%';
        document.getElementById('percent').style.width = `${percent}%`;
        document.getElementById('currentQuestion').innerHTML = currentQuestion+1;
        document.getElementById('questionText').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    
    }   
}


function answer(selection){
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    // um den letzten Buchstaben der angeklickten Antwort zu bekommen, in dem Fall die Zahl 1, 2,3 oder 4
    let idOfRightAnswer = `answer_${question['right_answer']}`
    if(selectedQuestionNumber == question['right_answer']){
        document.getElementById(selection).parentNode.classList.add('bg-success');
        //parentNode , um dem übergeordneten Element etwas hinzuzufügen  
        rightAnswers ++;
        audioSuccess.play();
    }else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioFail.play();
    }
    document.getElementById('nextButton').disabled = false;
    // disabled = false, damit die Eigenschaft disabled deaktiviert wird
}


function nextQuestion(){
    currentQuestion ++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function reloadQuiz(){
    document.getElementById('headerImage').src = "./img/background.jpg";
    currentQuestion=0;
    rightAnswers=0;
    document.getElementById('endScreen').style ="display:none";//endScreen ausblenden
    document.getElementById('questionBody').style = "";//questionBody wieder anzeigen
    init();
}