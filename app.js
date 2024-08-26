
const nextBtn = document.getElementById('next-btn')
const questionEl = document.querySelector('#question')
const codeBox = document.querySelector('pre code')
const btnDiv = document.getElementById('right')
let currentIndex = 0
let score = 0
function startQuiz(){

    showQuestion()
}
function showQuestion() {
    resetState()
    let currentQuestion = Questions[currentIndex]
    questionEl.textContent = currentQuestion.q
    codeBox.innerHTML = currentQuestion.code
    currentQuestion.answers.forEach((answer)=>{
        const optionsBtn = document.createElement("button")
        optionsBtn.innerHTML = answer.text
        optionsBtn.classList.add('btn')
        btnDiv.appendChild(optionsBtn)
        if(answer.correct){
            optionsBtn.dataset.correct = answer.correct
        }
        optionsBtn.addEventListener('click',(e)=>{
            const selectedBtn = e.target
            const isCorrect = selectedBtn.dataset.correct === "true"
            if (isCorrect) {
                selectedBtn.classList.add('correct')
                score++
            }else{
                selectedBtn.classList.add("incorrect")
            }
            Array.from(btnDiv.children).forEach(button=>{
                if (button.dataset.correct === "true") {
                    button.classList.add('correct')
                }
                button.disabled = true
            })
            nextBtn.style.display = "block"
        })
        
    })
}
function resetState() {
    nextBtn.style.display = "none"
    while (btnDiv.firstChild) {
        btnDiv.removeChild(btnDiv.firstChild)
    }
}
function showScore() {
    resetState()
    questionEl.innerHTML = `You scored ${score} out of ${Questions.length}!`
    nextBtn.innerHTML = "Play Again"
    codeBox.style.display = "none"
}
function handleNextBtn() {
    currentIndex++
    if (currentIndex < Questions.length) {
        showQuestion()
    }else{
        showScore()
    }
}
nextBtn.addEventListener('click', ()=>{
    if (currentIndex < Questions.length) {
        handleNextBtn()
    }else{
        startQuiz()
    }
})
startQuiz()



