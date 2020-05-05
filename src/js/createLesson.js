// Функция создающая урок
import createElement from './createElement';
import createMiniThems from "./createMiniThems";

export default function createLesson(data){
    let textPart = document.querySelector('.text__info');
    const drapZone = document.querySelector('.drap__zone');
    let header = createElement('h2');
    let text = createElement('p');
    let image = createElement('img');
    let buttonNext = createElement('button');
    let div = document.createElement('div');
    div.setAttribute('class', 'canvas');
    header.setAttribute('class', 'lesson__name');
    text.setAttribute('class', 'lesson__text');
    image.setAttribute('class', 'img__schema');
    image.setAttribute('src', '../src/img/schema/lesson1-2.png');
    buttonNext.setAttribute('class', 'next__lesson');
    header.innerHTML = data[0].part;
    text.innerHTML = data[0].text;
    buttonNext.innerHTML = 'Далее';
    textPart.append(header);
    textPart.append(text);
    textPart.append(image);
    textPart.append(buttonNext);

    createMiniThems(data);
}