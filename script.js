let dash,dot,space,code,decode,speedRange,backgroundMusicCtl, settingsMenu ;
let first = true;
let firstMusic = true;
let speed = 500;
let dashSound = new Audio('sounds/dash.wav');
let dotSound = new Audio('sounds/dot.wav');
let swipeSound = new Audio('sounds/swipe.mp3');
let keepText = "";

let backgroundMusic = new Audio('sounds/leftBankToo.mp3');
backgroundMusic.volume =0.2;
backgroundMusic.loop = true;

function init(){
    settingsMenu = document.getElementById("settingsMenu");
    backgroundMusicCtl = document.getElementById("backgroundMusicCtl");
    speedRange = document.getElementById("speedRange");
    dash = document.getElementById("dash");
    dot = document.getElementById("dot");
    space = document.getElementById("space");
    code = document.getElementById("code");
    decode = document.getElementById("decode");
}

function changeSpeed(s){
    speed = s.value;
}

function add(x){
    if(first){
        first =false;
        code.innerHTML ="";
        if(firstMusic){
            firstMusic=false;
            backgroundMusic.play();
        }
    }
    if(x=='s'){
        if(code.innerHTML.charAt(code.innerHTML.length-1) == " ")
            code.innerHTML += " / ";
        else
            code.innerHTML += " ";
        render();
    }
    else if(x=='.'){
        dotSound.play();
        code.innerHTML += x;
        render();
    }
    else{
        dashSound.play();
        code.innerHTML += x;
        render();
    }
}

function onkey(event){
    if(event.target.keyCode == 27){
        //left
        add('-');
    }else if(event.target.keyCode == 26)
    {
        //right
        add('.');
    }else{
        //space
        add('s');
    }
}

function del(){
    let newString = "";
    for(let i =0;i<code.innerHTML.length-1;i++){
        newString += code.innerHTML.charAt(i);
    }
    code.innerHTML = newString;
    render();
}

function render(){
    decode.innerHTML ="";
    let i =0;
    while(i<code.innerHTML.length){
        let letter ='';
        while(code.innerHTML.charAt(i) != " " && i<code.innerHTML.length){
            letter += code.innerHTML.charAt(i);
            i++;
        }
        if(i==code.innerHTML.length){
            break;
        }
        else{
            if(dictionary(letter)=="i" && ((code.innerHTML.charAt(i-4)=="/" ||i==2) && (code.innerHTML.charAt(i+2)=="/" ||i+1==code.innerHTML.length)))
                decode.innerHTML += "I";
            else
                decode.innerHTML += dictionary(letter);
            
        }
        i++;
        if(code.innerHTML.charAt(i)=="/")
            decode.innerHTML += " ";
    }
}

function redo(){
    first = true;
    swipeSound.play();
    code.innerHTML ="Welcome To Morse Decoder!";
    decode.innerHTML="";
}
function initiatRead(){
    keepText = code.innerHTML;
    code.innerHTML = "";
    readAloud(0,"")
}
function readAloud(i,text){
    if(i==keepText.length)
        return;
    if(keepText.charAt(i)=='.'){
        dotSound.play();
        code.innerHTML +=keepText.charAt(i);
        render();
        setTimeout(function(){               
            return readAloud(i+1);
        },speed); 
    } 
    else if(keepText.charAt(i)=='-'){
        dashSound.play();
        code.innerHTML +=keepText.charAt(i);
        render();
        setTimeout(function(){
            return readAloud(i+1);
        },speed);     
    }
    else if(keepText.charAt(i)==' '){
        code.innerHTML +=keepText.charAt(i);
        render();
        setTimeout(function(){
            return readAloud(i+1);
        },speed);
    }
    else{
        code.innerHTML +=keepText.charAt(i);
        render();
        return readAloud(i+1);
    }
}

function musicOff(){
    if(backgroundMusic.loop){
        backgroundMusic.loop = false;
        backgroundMusic.pause();
        backgroundMusicCtl.innerHTML = "Off";
    }
    else{
        backgroundMusic.loop = true;
        backgroundMusic.play();
        backgroundMusicCtl.innerHTML = "On";
    }
}

function showSettings(){
    if(settingsMenu.style.visibility == "hidden"){
        settingsMenu.style.visibility = "visible";
    }else{
        settingsMenu.style.visibility = "hidden";
    }
}

function dictionary(letter){
    switch(letter){
        case '.-':
            return 'a';
            break;
        case '-...':
            return 'b';
            break;
        case '-.-.':
            return 'c';
            break;
        case '-..':
            return 'd';
            break;
        case '.':
            return 'e';
            break;
        case '..-.':
            return 'f';
            break;
        case '--.':
            return 'g';
            break;
        case '....':
            return 'h';
            break;
        case '..':
            return 'i';
            break;
        case '.---':
            return 'j';
            break;
        case '-.-':
            return 'k';
            break;
        case '.-..':
            return 'l';
            break;
        case '--':
            return 'm';
            break;
        case '-.':
            return 'n';
            break;
        case '---':
            return 'o';
            break;
        case '.--.':
            return 'p';
            break;
        case '--.-':
            return 'q';
            break;
        case '.-.':
            return 'r';
            break;
        case '...':
            return 's';
            break;
        case '-':
            return 't';
            break;
        case '..-':
            return 'u';
            break;
        case '...-':
            return 'v';
            break;
        case '.--':
            return 'w';
            break;
        case '-..-':
            return 'x';
            break;
        case '-.--':
            return 'y';
            break;
        case '--..':
            return 'z';
            break;
        
            case '--..--':
            return ',';
            break;
        case '.-.-.-':
            return '.';
            break;
        case '..--..':
            return '?';
            break;
        case '-.-.--':
            return '!';
            break;

        case '-----':
            return '0';
            break;
        case '.----':
            return '1';
            break;
        case '..---':
            return '2';
            break;
        case '...--':
            return '3';
            break;
        case '....-':
            return '4';
            break;
        case '.....':
            return '5';
            break;
        case '-....':
            return '6';
            break;
        case '--...':
            return '7';
            break;
        case '---..':
            return '8';
            break;
        case '----.':
            return '9';
            break;
        default:
            return "";
            break;
    }
}