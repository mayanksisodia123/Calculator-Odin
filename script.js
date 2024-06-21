let num1,num2, operator,restart=false,display='';
const add =( num1,num2)=> num1+num2;
const subtract =( num1,num2)=> num1-num2;
const multiply =( num1,num2)=> num1*num2;
const divide =( num1,num2)=> num1/num2;
const operate=(num1,num2,operator)=>{
switch(operator){
    case '+': return add(num1,num2);
    case '-': return subtract(num1,num2);
    case '*': return multiply(num1,num2);
    case '/': return divide(num1,num2);
    default : return;
}
}

let numKeys=document.querySelectorAll('.numKey');
let actionKeys=document.querySelectorAll('.actionKey');
let screen =document.querySelector('.screen');

//helper functions
const displayHasOperator=()=>display.toString().match(/[/*+-]/);
const displayHasDigitPoint=()=>display.toString().trim().includes('.');
const numberOfNumbersInDisplay=()=> display.toString().trim().split(/[/*+-]/).filter(el=>el!=='').length;  
const secondNumberHasDigitPoint=()=> display.toString().trim().split(/[/*+-]/).filter(el=>el!=='')[1].includes('.');
const lastCharOfDisplay=()=>display.slice(-1);  

const readActionKey=(value)=>{
    restart=false;
    if(display===''){    //first input
        if(value==="+"){}
        else if(display.match(/[/*]/))display='';
        else if(value==='-')display=value;
        screen.textContent=display;  
    }
    else if( lastCharOfDisplay().match(/[/*+-]/)) display=display.slice(0,-1)+value;  //when the previous input is an operator-replacing the pervious operator with the new one
    else if(!lastCharOfDisplay().match(/[/*+-]/)) {   //when the previous input is not an operator
        if(displayHasOperator() && numberOfNumbersInDisplay()>1) evaluate();  //Chaining-evaluate first two numbers before going to the next operation 
        display= display + value; 
    } 
        // capture the last operator input
        operator=value;
}

const readNumKey=(value)=>{           
    if(restart===true) {   //resetting when number key is pressed after result
        display=''
        restart=false;
        display= display + value;
        } 
    else if(value==='.'){
             if(!displayHasOperator() && displayHasDigitPoint()&& value==='.'&&lastCharOfDisplay()==='.'|| //only one dot for first number
             displayHasOperator() && numberOfNumbersInDisplay()>1 && secondNumberHasDigitPoint()&&value==='.'){ }//only one digit dot for second number
        }
    else display= display + value;  
}
const readClearKey=()=>{
    display='';   
    screen.textContent=display;
}
const evaluate=()=>{
    let entries;
        entries=display.toString().trim().split(/[/*+-]/);
    if(display[0]==='-'){
        num1=parseFloat(entries[1])*-1;
        num2=parseFloat(entries[2]);
    }else{
        num1=parseFloat(entries[0]);
        num2=parseFloat(entries[1]);
    }
    display=operate(num1,num2,operator);
    if(entries[0]!==''){} 
    screen.textContent=display;
}
 const readEqualsKey=()=>{
    if(displayHasOperator()&&!display.toString().slice(-1).match(/[/*+-]/)){
        evaluate(); 
        restart=true;
    }
 }
const readBackspaceKey=()=>{
    display=display.toString().slice(0,-1);
    screen.textContent=display;
}

const readKeyClick=(e)=>{
    if(e.target.className==='numKey') readNumKey(e.target.textContent);
    if(e.target.className==='actionKey')readActionKey(e.target.textContent);
    screen.textContent=display;
}

const handleKeyboardInput=(e)=>{
     if(/^\d$/.test(e.key) || /[.]/.test(e.key)) readNumKey(e.key); //read numbers
     if(/[/*+-]/.test(e.key)) readActionKey(e.key);                 //read operators   
     if(/[=]/.test(e.key)||e.key==="Enter") readEqualsKey();         
     if(e.key==='Backspace')  readBackspaceKey();       
     if(e.key==='Delete') readClearKey();
     screen.textContent=display;
 }

 //adding event Listeners
document.addEventListener('keydown',handleKeyboardInput);
document.querySelector('.clearKey').addEventListener('click',readClearKey);
document.querySelector('.equalsKey').addEventListener('click',readEqualsKey);
document.querySelector('.backKey').addEventListener('click',readBackspaceKey);
for(el of numKeys){
    el.addEventListener('click',readKeyClick); 
}

for(el of actionKeys){
    el.addEventListener('click',readKeyClick); 
}