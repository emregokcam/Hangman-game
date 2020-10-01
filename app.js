const wordElement = document.getElementById('word');
const finalMessage = document.getElementById('final-message');
const popup = document.getElementById('popup-container');
const wrongLettersElement = document.getElementById('wrong-letters');
const figureParts = document.querySelectorAll('.figure-part');
const playButton = document.querySelector('#play-button');
const notification = document.querySelector('#notification-container');

const words = ['application', 'programming', 'interface', 'wizard'];

let rnd = Math.floor(Math.random() * words.length)

let selectedWord = words[rnd];

const correctLetters = [];
const wrongLetters = []



// window.addEventListener(event, fonksiyon)
// function myfunction(e) {
    
// }
// window.addEventListener('keydown', function(e){})
// window.addEventListener('keydown', myfunction)

window.addEventListener('keydown', e=> {
    // console.log(e.key);
    // console.log(e.keyCode);
    // console.log(e.which);
    // console.log(e.code);

    let letter = e.key;

  if (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
      if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
              correctLetters.push(letter);
              displayWord(); // henuz yazmadim.
          }else{
              showNotification();
          }
          
      } else {
          if (!wrongLetters.includes(letter)) {
              wrongLetters.push(letter);
              updateWrongLetterElement();
          } else {
              showNotification();              
          }
          
      }
  }
});

displayWord();

playButton.addEventListener('click', () =>{

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetterElement();
    popup.style.display = 'none';
})

function displayWord(){
    console.log(selectedWord);
    letters = selectedWord.split('');
    console.log(letters);

   /****************************************************
      <div class="word" id="word">
        <span class = "letter">w</span>
        <span class = "letter"></span>
        <span class = "letter">z</span>
        <span class = "letter"></span>
        <span class = "letter"></span>
    </div>
   ****************************************************/
   

//   let span =document.createElement('span');
//   span.className = 'letter';
// //    span.classList.add('letter'); // alternative
//    letters.forEach(letter => {
        
//        if(correctLetters.includes(letter)) span.textContent = letter;
//        else span.textContent = '';
//        wordElement.appendChild(span);

//    });

   wordElement.innerHTML = '';
    letters.forEach(letter => {
        let span =document.createElement('span');
        span.className = 'letter';
        if(correctLetters.includes(letter)) span.textContent = letter;
        else span.textContent = '';
        wordElement.appendChild(span); 
    });

    /****************************************************
      Bir element icerisine yeni olusturdugunuz bir elementi foreach dongusu eklerken her defasinda etiketin olusturulmasi gerekir. Yukaridaki ilk ornek gibi yaparsaniz sadece bir element ekler. Yani elementi bir kere olusturup defaetle kullanmaniza izin vermiyor. Birden fazla olusturmak istiyorsaniz etiket olusturma islemini dongu icerisinde yapmaniz gerekir.

      createElement() metodu olusturdugu elementi object olarak olusturur. Eger createElement() metodu ile olsuturulan element innerHTML ile eklenmek istenirse object yazdirir. createElement() metodu ile olusturulan bir element appendChild() metodu ile eklenmesi gerekir. 
    ****************************************************/
    
    const innerWord = wordElement.textContent;

    if(innerWord === selectedWord){
        finalMessage.innerHTML = 'Congratulations! You won!';
        popup.style.display = 'flex';
    }

    



}

function updateWrongLetterElement() {

    /****************************************************
       wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0 ? `<p>Wrong</p>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}    
    `;
    ****************************************************/    
    
    wrongLettersElement.innerHTML = '';
    if (wrongLetters.length > 0) {
        wrongLettersElement.innerHTML += '<p>Wrong</p>';
        // wrongLetters.forEach(letter =>{
        //     wrongLettersElement.innerHTML += `<span>${letter}</span>`;
        // });
        wrongLettersElement.innerHTML += `<span>${wrongLetters.toString()}</span>`;

    }

    const errorNumber = wrongLetters.length;

    figureParts.forEach((part, index) => {
        if(index<errorNumber) part.style.display = 'block';
        else part.style.display = 'none';
    });

    // console.log(figureParts);

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerHTML = 'Unfortunately you lost';
        popup.style.display = 'flex';
    }

}


function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{notification.classList.remove('show')}, 2000);

}






