const tipBtn = document.querySelectorAll('[data-tip]')
const amountInput = document.getElementById('amount-input')
const customTipInput = document.querySelector('.customTip-input')
const peopleCount = document.getElementById('people-count')
const amountPerPerson = document.getElementById('individual-amount')
const totalAmount = document.getElementById('total-amount')
const reset = document.querySelector('.reset')
reset.addEventListener('click',resetTipCalculator)
let total;
let individualTipRatio;
let tipArray = [
    "inputAmount",
    "tipValue",
    "individualTipRatio"
]


function setPlaceholderText(){
    if(tipArray.length === 0 || isNaN(total) || isNaN(individualTipRatio)){
        totalAmount.innerText =  "00"
        amountPerPerson.innerText = "00"
    }
}
setPlaceholderText()

tipBtn.forEach(btn => {
    btn.addEventListener('click',function(e){
        if(e.target.dataset){
            tipBtn.forEach(btn => {
                btn.classList.remove('active-tip')
            })
            this.classList.add('active-tip')
            const tipValue = parseFloat(this.innerText)
            tipArray[1] = tipValue;
            renderTip()
        }
        if(reset.disabled){
            reset.classList.toggle('disabled-reset')
        }
    })
})

amountInput.addEventListener('input',() => {
    const amountValue = parseFloat(amountInput.value)
    tipArray[0] = amountValue
    renderTip()
})

peopleCount.addEventListener('input',() => {
    if(peopleCount.value !== ""){
        individualTipRatio = parseFloat(peopleCount.value)
        tipArray[2] = individualTipRatio;
        renderTip()
    }else{
       individualTipRatio = 1;
       tipArray[2] = individualTipRatio;
       renderTip()
    }
})

customTipInput.addEventListener('input',() =>{
    if(customTipInput.value !== ""){
        const customTipValue = parseFloat(customTipInput.value);
        tipBtn.forEach(btn => {
            btn.disabled = true;
            btn.classList.remove('active-tip')
        })
        tipArray[1] = customTipValue;
        renderTip()
    }else if(customTipInput.value === ""){
        tipBtn.forEach(btn => {
            btn.disabled = false;
        })
        renderTip()
    }
})

function renderTip(){
    if(tipArray.length === 3){
        total = tipArray[0] * tipArray[1] / 100
        individualTipRatio = total /  tipArray[2]
        totalAmount.innerText =  total.toFixed(3)
        amountPerPerson.innerText = individualTipRatio.toFixed(2);
    }
    setPlaceholderText()
}

function resetTipCalculator(){
    tipArray = []
    document.querySelectorAll('input').forEach(input => {
        input.value = ""
    })

    tipBtn.forEach(btn => {
        btn.classList.remove('active-tip')
    })
    renderTip()
}


window.onload = document.querySelectorAll('input').forEach(input => {
    input.value = ""
})





