import './style/style.css';
import createLesson from "./js/createLesson";
import dataBase from './js/ObjectLesson';
import data from './js/lesson';
import nextLesson from "./js/nextLesson";
import loadImages from "./js/loadImages";
import initStage from "./js/initStage";

const dataNeed = dataBase(data);
createLesson(dataNeed);
nextLesson(dataNeed);

var sources = {
    rename: 'rename.png',
    first: '2_rotate.png',
    first_black: '2_black_rotate.png',
    second: '2_rotate.png',
    second_black: '2_black_rotate.png',
    three: '2_rotate.png',
    three_black: '2_black_rotate.png',
    four: '2_rotate.png',
    four_black: '2_black_rotate.png',
    five: '3.png',
    five_black: '3_black.png',
    six: '15.png',
    six_black: '15_black.png',
    seven: '18.png',
    seven_black: '18_black.png',
    eight: '19_rotate.png',
    eight_black: '19_black_rotate.png'
};
loadImages(sources, initStage);