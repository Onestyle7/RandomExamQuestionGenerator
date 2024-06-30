document.addEventListener('DOMContentLoaded', () => {
// Po załadowaniu strony wykonywany jest poniższy skrypt
    const drawButton = document.getElementById('drawButton');
    const resultDiv = document.getElementById('result');

    let questions = [];
    let students = [];
    let drawnQuestions = new Set();
    let drawnStudents = new Set();

 // Funkcja asynchroniczna do pobierania danych z plików JSON
    async function fetchData() {
        try {
            const questionsResponse = await fetch('questions.json');
            const studentsResponse = await fetch('students.json');
            questions = await questionsResponse.json();
            students = await studentsResponse.json();
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }
// Funkcja do losowania pytania i studenta
    function drawQuestion() {
        // Sprawdzenie, czy wszyscy studenci zostali już wylosowani
        if (drawnStudents.size >= students.length) {
            resultDiv.textContent = 'Wszyscy studenci zostali już wylosowani.';
            drawButton.disabled = true; // Wyłączenie przycisku
            return;
        }

        let question, student;
// Losowanie pytania, jeśli są jeszcze dostępne pytania     
        if (drawnQuestions.size < questions.length) {
            do {
                question = questions[Math.floor(Math.random() * questions.length)];
            } while (drawnQuestions.has(question));// Powtarzanie losowania, aż znajdzie się nowe pytanie
            drawnQuestions.add(question);// Dodanie pytania do zbioru wylosowanych pytań
        } else {
            question = "Brak dostępnych pytań";
        }
// Losowanie studenta, który jeszcze nie był wylosowany
        do {
            student = students[Math.floor(Math.random() * students.length)];
        } while (drawnStudents.has(student));// Powtarzanie losowania, aż znajdzie się nowy student

        drawnStudents.add(student);// Dodanie studenta do zbioru wylosowanych studentów

        resultDiv.textContent = `${student} wylosował(a) pytanie: ${question}`;
    }
// Dodanie event listenera do przycisku, który uruchamia funkcję drawQuestion po kliknięciu
    drawButton.addEventListener('click', drawQuestion);
// wywołanie funkcji fetchData do pobrania danych z plików JSON
    fetchData();
});
