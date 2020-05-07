// Функция создающая урок
import createElement from './createElement';

export default function createLesson(data, value) {
    let textPart = document.querySelector('.text__info');
    let header = createElement('h2');
    let text = createElement('p');
    let image = createElement('img');
    let buttonNext = createElement('button');
    let div = document.createElement('div');
    header.setAttribute('class', 'lesson__name');
    text.setAttribute('class', 'lesson__text');
    image.setAttribute('class', 'img__schema');
    image.setAttribute('src', '../src/img/schema/lesson1-2.png');
}