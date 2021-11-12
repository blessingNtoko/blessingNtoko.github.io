document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
});

const nav = document.getElementById('navigate');
const letterN = document.getElementById('changeColour');

document.addEventListener('scroll', () => {
    if (window.scrollY) {
        nav.classList.add('black');
        letterN.classList.add('white');
    } else {
        nav.classList.remove('black');
        letterN.classList.remove('white');
    }
});