document.addEventListener('DOMContentLoaded', () =>{
    const drawButton = document.getElementById('drawButton');
    const resultDiv = document.getElementById('result');

    let questions = [];
    let students = [];
    let drawQuestions = new Set();
    let drawStudents = new Set();

    async function fetchData(){
        try{
            const questionsResponse = await fetch('questions.json');
            const studentsResponse = await fetch('students.json');
            questions = await questionsResponse.json();
            students = await studentsResponse.json();
        }
        catch(error){
            console.log('Error fetching data:',error);
        }
    }
    function drawQuestion(){
        if(drawQuestion.size >= questions.lenght || drawStudents.size >= students.lenght){
            resultDiv.textContent = 'Wszystkie pytania lub studenci zostali wylosowani.';
            return;
        }
        let question, student;
        do{
            question = questions[Math.floor(Math.random() * questions.length)];
        }
        while(drawQuestions.has(question));

        do{
            student = students[Math.floor(Math.random() * students.length)];
        }while (drawStudents.has(student));

        drawQuestions.add(question);
        drawStudents.add(student);

        resultDiv.textContent = `${student} wylosował(a) pytanie: ${question}`;
    }

    drawButton.addEventListener('click', drawQuestion);

    fetchData();
})