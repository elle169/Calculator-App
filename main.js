const numberButton = document.querySelectorAll("[data-number]")
const operatorButton = document.querySelectorAll("[data-operator]")
const equalButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-delete]")
const resetButton = document.querySelector("[data-reset]")
const displayFirst = document.querySelector("[data-first-display]")
const displaySecond = document.querySelector("[data-second-display]")

let tick = new Audio("./Sound/Tick.wav");
let resetsound = new Audio("./Sound/Reset.wav");
let opersound = new Audio("./Sound/Operator.wav");
let delsound = new Audio("./Sound/Del.wav");
let equalsound = new Audio("./Sound/Equal.wav");
let lightsound = new Audio("./Sound/light.wav");
let darktsound = new Audio("./Sound/Dark.wav");




class Calc {
constructor(displayFirst,displaySecond) {
    this.displayFirst = displayFirst
    this.displaySecond = displaySecond
    this.secondValue = ""
    this.firstValue = ""
    this.operator = undefined
}

addNumber(number){
    if( this.firstValue == 0 || this.firstValue == Infinity) {
        this.firstValue = ""
    }
if(number === "." && this.firstValue.includes(".")) return


   




    this.firstValue = this.firstValue + number
}

printDisplay() { 
    this.displayFirst.innerText = this.firstValue;
    this.displaySecond.innerText = this.secondValue;
}





toCalc() {
     let result;
     let convertSecond = parseFloat(this.secondValue);
     let convertFirst = parseFloat(this.firstValue);
     
     if(isNaN(convertFirst) || isNaN(convertSecond)) return

     switch(this.operator){
     case "+":
     result = convertSecond + convertFirst 
       break 
       case "/":
        result = convertSecond / convertFirst 
          break 

          case "-":
     result = convertSecond - convertFirst 
       break 

       case "*":
     result = convertSecond * convertFirst 
       break 

  
default: return


    } 
  
    this.firstValue = result
    this.secondValue = ""
    this.operator = undefined
    equalsound.play()
    

  
    
}

delete() {
     if(this.firstValue != 0 ) {
        delsound.play()
    }
 

    this.firstValue = this.firstValue.slice(0, -1)
    if (this.firstValue == "") {
        this.firstValue = 0
    }
   
    
}


selectOperation(operator){
    if(this.firstValue == "") return;
    if (this.secondValue !== "") {
        this.toCalc()
       
    }

    this.operator = operator
    this.secondValue = this.firstValue
    this.firstValue = 0
    
}


reset(){
    if (this.firstValue != "") {
        resetsound.play()
    }
    this.firstValue = ""
    this.secondValue = ""
    this.operator = undefined
    
}

}

const calc = new Calc(displayFirst, displaySecond)




numberButton.forEach(button => {
    button.addEventListener("click", ()=>{
     tick.play()
        calc.addNumber(button.innerText)
        calc.printDisplay()
    })
});





operatorButton.forEach(button => {
    button.addEventListener("click", ()=>{
        opersound.play()
        calc.selectOperation(button.innerText)
        calc.printDisplay()
    })
})


equalButton.addEventListener("click", () => {
    
    calc.toCalc()
    calc.printDisplay()
   
})


resetButton.addEventListener("click", () => {

    calc.reset()
    calc.printDisplay()

})

deleteButton.addEventListener("click", () => {
   
    calc.delete()
    calc.printDisplay()
})




const range = document.querySelector("[data-range]")

const rangeText = document.getElementsByTagName("input")

const theme = document.querySelectorAll("[data-theme]")


range.addEventListener("click", ()=>{
   if(range.value == 1) {
    theme.forEach( i =>{
    
        i.classList.remove("dark")

       i.classList.add("light")
       darktsound.load()
       lightsound.play()
    })
   
   }

   if(range.value == 2) {
    theme.forEach( i =>{
        i.classList.remove("light")

       i.classList.add("dark")

       darktsound.play()
       lightsound.load()
    })
   }
   if(range.value == 0) {
    theme.forEach( i =>{
        i.classList.remove("dark")
        i.classList.remove("light")
        darktsound.load()
        lightsound.load()
    })
   }

   
})



