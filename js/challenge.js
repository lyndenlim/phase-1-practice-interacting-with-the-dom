const minusBtn = document.querySelector("#minus")
const plusBtn = document.querySelector("#plus")
const heartBtn = document.querySelector("#heart")
const pauseBtn = document.querySelector("#pause")
const submitBtn = document.querySelector("#submit")
const resetBtn = document.querySelector("#reset")
const timeCounter = document.querySelector("#counter")
const form = document.querySelector("#comment-form")
let likeCounter = 0
let counterText = timeCounter.innerText
let isPaused = true
let countInterval = setInterval(() => {
    counterText++
    timeCounter.innerText = counterText    
    likeCounter = 0
}, 1000);

pauseBtn.addEventListener("click", e => {
    minusBtn.toggleAttribute("disabled")
    plusBtn.toggleAttribute("disabled")
    heartBtn.toggleAttribute("disabled")
    submitBtn.toggleAttribute("disabled")
    resetBtn.toggleAttribute("disabled")

    if (isPaused){
        clearInterval(countInterval)
        isPaused = false
    } else {
        isPaused = true
        countInterval = setInterval(() => {
            counterText++
            timeCounter.innerText = counterText
            likeCounter = 0
        }, 1000);
    }

    e.target.innerText === "resume" ? pauseBtn.textContent = "pause" : pauseBtn.textContent = "resume"
})

minusBtn.addEventListener("click", e => {
    counterText--
    timeCounter.innerText = counterText
})

plusBtn.addEventListener("click", e => {
    counterText++
    timeCounter.innerText = counterText
})

heartBtn.addEventListener("click", e => {
    likeCounter++
    
    const likes = document.querySelector(".likes")
    const li = document.createElement("li")
    
    //broken
    if (!!document.querySelector(`#likes${likeCounter}`)){
        const madeAlready = document.querySelector(`#likes${likeCounter}`)
        madeAlready.textContent = `${counterText} has been liked ${likeCounter} time(s)`
    }   else {
        li.classList.add("listItem")
        li.textContent = `${counterText} has been liked ${likeCounter} time(s)`
        li.id = `likes${likeCounter}`
        likes.appendChild(li)    
    }

})

form.addEventListener("submit", e => {
    e.preventDefault()
    if (e.target.elements[0].value === ""){
        alert("Comment cannot be blank.")
    } else {
        addComments(e.target.elements[0].value)
        form.reset();
    }  
})

function addComments(comment){
    const commentSection = document.querySelector("#list")
    const p = document.createElement("p")
    p.textContent = comment
    p.classList.add("comment")
    commentSection.appendChild(p)
}

resetBtn.addEventListener("click", e => {
    timeCounter.innerText = 0
    counterText = 0
    likeCounter = 0
    clearInterval(countInterval)
    countInterval = setInterval(() => {
        counterText++
        timeCounter.innerText = counterText
        likeCounter = 0
    }, 1000);

    minusBtn.disabled = false
    plusBtn.disabled = false
    heartBtn.disabled = false
    submitBtn.disabled = false

    const likes = document.querySelectorAll(".listItem")
    const comments = document.querySelectorAll(".comment")
    
    likes.forEach(like => like.remove())
    comments.forEach(comment => comment.remove())  
})