//=======================================================
let draggingCard = null;
let dragOverBox = null; //드래깅 객체가 방문 중인 객체
let dragOverCard = null; //드레깅 카드가 방문중인 카드
let count = 0;


//=======================================================
//EVENT HANDLER
//=======================================================
function onDragStartCard(ev) {
    draggingCard = this; //드래깅 중인 객체로 자신을 연결
    this.classList.add("draggingCard");
}

function onDragEndCard(ev) {
    draggingCard = null;
    this.classList.remove("draggingCard");
    //dragIver가 발생한 카드 위에서 drop이 발생 했다면....
    if(dragOverCard) {
        dragOverCard.classList.remove("overCard")
        dragOverCard = null;
    }
}

function onDragOverCard(ev) {
    ev.preventDefault();
    dragOverCard = this;
    this.classList.add("overCard");
}

function onDragLeaveCard(ev) {
    dragOverCard = null;
    this.classList.remove("overCard")
}

function onDragOverBox(ev) {
    ev.preventDefault(); //브라우저가 기본적으로 배제하는 코드를 배제
    this.classList.add("overBox");
    dragOverBox = this;
}

function onDragLeaveBox(ev) {
    ev.preventDefault();
    this.classList.remove("overBox")    
}

function onDropBox(ev) {
    let boxs = document.getElementById('box')
    ev.preventDefault();
    //카드 위에서 놓았는지, 아니면 박스 영역에서 놓았는지 구분하여 처리
     if(dragOverCard){//카드 위에서 넣은 경우
     this.insertBefore(draggingCard, dragOverCard); // this = darOverBox
     }
     else{//그냥 박스 위에서 놓은 경우
        ev.target.appendChild(draggingCard)
    }
}
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5)
  }

function wrap() {
    let korboxs = document.getElementById('koreanbox')
    let resultboxs = document.getElementById('resultbox')
    let boxs = document.getElementById('box')
    let wrapper = document.querySelector('.wrapper')
    wrapper.appendChild(korboxs)
    wrapper.appendChild(resultboxs)
    wrapper.appendChild(boxs)
    


}

function koreanBox() { //한글창
    let wrapper = document.querySelector('.wrapper')
    let korean = problems.prblib[count].kor
    let boxs = document.getElementById('koreanbox')
    boxs.innerHTML += korean
    // let koreaText = document.createTextNode(korean)
    // boxs.appendChild(koreaText)

    document.body.wrapper.appendChild(boxs)
}

function resultBox() { //결과창
 
    let eng = problems.prblib[count].eng.split(" ") 
    let wrapper = document.querySelector('.wrapper')
    for(let i=0; i<eng.length; i++){
        let newDiv = document.createElement('span');
        newDiv.setAttribute("id", "resultDiv");
        let boxs = document.getElementById('resultbox')
        boxs.appendChild(newDiv) 
        wrapper.appendChild(boxs)
        document.body.appendChild(wrapper)
    }
    
}

function initCards() {
    let wrapper = document.querySelector('.wrapper')
    let eng = problems.prblib[count].eng.split(" ") 
    shuffleArray(eng)
    for (let i=0; i<eng.length; i++) {         
        let newDiv = document.createElement('div');
        newDiv.innerHTML += eng[i]
        // let newText = document.createTextNode(array[i]) //div안에 들어갈 text 지정
        newDiv.setAttribute("id", "card") //새로 만들어진 div의 id값 부여
        newDiv.draggable="true";
        // newDiv.appendChild(newText);
        let boxs = document.getElementById('box')
        boxs.appendChild(newDiv)
        // let contain = document.getElementById('container')
        document.body.wrapper.appendChild(wrapper);
      }
    
}
function removeText() {
    let boxs = document.querySelectorAll('#resultDiv')
    let cards = document.querySelectorAll('#card')
    let kor = document.getElementById('koreanbox')
    for(let items of cards) {
        items.parentNode.removeChild(items)
    }
    for(let items of boxs) {
        items.parentNode.removeChild(items)
    }

    kor.innerHTML = ""
}


function checkResult() { //정답을 확인하는 함수

    let cards = document.querySelectorAll('#card') 
    let words = "" 
    let resultwords = ""
    let starteng = problems.prblib[count].eng.split(" ")
    for(let item of cards){
    words += item.innerHTML   
}
console.log(words)
for(let i of starteng) {
    resultwords += i
}

console.log(resultwords)

if(words == resultwords) {
    alert("정답")
    count++;
    removeText()
    start()
}
else {
    alert("오답")
}

}

function start() {
    koreanBox()
    resultBox()
    initCards()
      
}



//=======================================================
//=======================================================

window.onload = function() {


    
    

    start();    
    
    
    //card 객체에 event handler를 연결한다.
    let cards = document.querySelectorAll("#card")
    for(let card of cards) {
        card.addEventListener("dragstart", onDragStartCard);
        card.addEventListener("dragend", onDragEndCard);
        card.addEventListener("dragover", onDragOverCard);
        card.addEventListener("dragleave", onDragLeaveCard);
        
    }

    //box 객체에 event handler를 연결한다
    
    let boxes = document.querySelectorAll("#box");
    let result = document.querySelectorAll("#resultDiv")
    for(let box of result) {
        box.addEventListener("dragover", onDragOverBox);
        box.addEventListener("dragleave", onDragLeaveBox);
        box.addEventListener("drop", onDropBox);
    }
    for(let box of boxes) {
        box.addEventListener("dragover", onDragOverBox);
        box.addEventListener("dragleave", onDragLeaveBox);
        box.addEventListener("drop", onDropBox);
    }
    document.getElementById('onclick').addEventListener('click', checkResult)
    document.getElementById('1click').addEventListener('click', initCards)
   
    

}