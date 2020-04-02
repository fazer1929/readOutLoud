mainCon = document.querySelector('main');
toogelBtn = document.getElementById('toggle-btn');
closeBtn = document.getElementsByClassName('close-btn')[0];
textmodal = document.getElementById('textbox-modal');
readBtn = document.getElementById('readout');
selectOptions = document.getElementById('voice-options');

const defElements =[
    {
        text: "Relax man",
        image: 'resources/relax.jpeg'
    },
    {
        text: "Are you crazy?",
        image: 'resources/crazy.jpg'
    },
    {
        text: "I'm hungry",
        image: 'resources/hungry.jpg'
    },
    {
        text: "What the fuck!",
        image: 'resources/wtf.jpg'
    },
    {
        text: "Just Chill",
        image: 'resources/chill.jpg'
    },
    {
        text: "Stay Home, Stay Safe",
        image: 'resources/home.jpg'
    },
    {
        text: "This is Business",
        image: 'resources/business.jpg'
    },
];

//Getting The Voices
let voices=[];
function getVoice(){
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name}`;
        selectOptions.appendChild(option);
    });
}
// Voices Changed
speechSynthesis.addEventListener('voiceschanged',getVoice);


defElements.forEach(createBox);

function createBox(item){

    const {text , image} = item;
    const ele = document.createElement('div');
    ele.classList.add('pic-box');
    ele.innerHTML = `<image class="inner-img" src="${image}" alt="${text}"></image>
    <p class="inner-text">${text}</p>
    `    ;
    ele.addEventListener('click',() => {
        speakText(text);
        speak();
    });
    mainCon.appendChild(ele);
}
// Intializing the speech utterance
const message = new SpeechSynthesisUtterance();
getVoice();

//Setting the speech properties
function speakText(text){
    message.text = text;
}
function speak(){
    speechSynthesis.speak(message);
}
//Adding custom message
readBtn.addEventListener('click',() => {
    const text = document.getElementById('text').value;
    speakText(text);
    speak();
});
//Changing THe voice
selectOptions.addEventListener('change',changeVoice);
function changeVoice(e){

    message.voice = voices.find(voice => voice.name === e.target.value)
}
//Show and Hide Modal
toogelBtn.addEventListener('click',() => textmodal.classList.toggle('show'));
closeBtn.addEventListener('click',() => textmodal.classList.remove('show'));