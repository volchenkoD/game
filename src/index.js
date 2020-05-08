import './style/style.css';
import lesson from './js/lesson';
import createElement from './js/createElement';
import Konva from "konva";
let result = lesson;

// устанавливаем данные при первичной загрузке страницы
window.onload = function () {
    for (let key in result) {
        if (key === 'lesson1') {
            let textPart = document.querySelector('.text__info');
            let headerInfo = createElement('h2');
            let textInfo = createElement('p');
            let imageInfo = createElement('img');
            headerInfo.setAttribute('class', 'lesson__name');
            textInfo.setAttribute('class', 'lesson__text');
            imageInfo.setAttribute('class', 'img__schema');
            imageInfo.setAttribute('src', result[key][0].img);
            headerInfo.innerHTML = result[key][0].part;
            textInfo.innerHTML = result[key][0].text;
            imagePosition = result[key][0].detail_position;
            darkPosition = result[key][0].outline_detail;
            scoreLevel = result[key][0].score;
            textPart.append(headerInfo);
            textPart.append(textInfo);
            textPart.append(imageInfo);
            loadedImages(result[key][0].sources, initStage);
        }
    }
}
// переменная устанавливающая номер урока
let i = 1;
// переменная устанавливающая подурок
let count = 1;
// переменные, значения которых будут изменяться при смене урока
let header, text, image, imagePosition, darkPosition, scoreLevel;
// получаем кнопку, переключатель урока
const go = document.querySelector('.go');
// устанавливаем на кнопку событие
// go.addEventListener('click', changeValue);
let width = window.innerWidth;
let height = window.innerHeight;
/*
    перебираем значение полученые с сервера и устанавливаем значение для следующего урока
*/
function changeValue(data, value) {
    data = result;
    value = count;
    for (let key in data) {
        if (key === 'lesson' + i) {
            for (let j = 0; j < data[key].length; j++) {
                if (count === j) {
                    header = data[key][j].part;
                    text = data[key][j].text;
                    image = data[key][j].img;
                    imagePosition = data[key][j].detail_position;
                    darkPosition = data[key][j].outline_detail;
                    scoreLevel = data[key][j].score;
                    createLesson(header, text, image);
                    loadedImages(data[key][j].sources, initStage);
                }
            }
        }
        if (count >= data[key].length) {
            i++;
            count = 0;
            console.log('next');
        }
    }

    count++;
}
// функция отвечающая за вывод нового содержимого при переключении урока
function createLesson(head, text, img) {
    let header = document.querySelector('.lesson__name');
    let textInfo = document.querySelector('.lesson__text');
    let imgInfo = document.querySelector('.img__schema');
    header.innerHTML = head;
    textInfo.innerHTML = text;
    imgInfo.src = img;
}
//Функция загрузки изображений
function loadedImages(sources, callback) {
    // папка с изображениями
    const assetDir = '../src/details/';
    const images = {};
    let loadedImages = 0;
    let numImages = 0;
    for (let src in sources) {
        numImages++;
    }
    for (let src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + sources[src];
    }
}
// прорисовка заднего фона
function drawBackground(background, gridImage, text) {
    var context = background.getContext();
    context.drawImage(gridImage, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'black');
    context.fillText(text, background.getStage().width() / 2, 40);
}
// проверка утановки детали на место
function isNearOutline(detail, outline) {
    var a = detail;
    var o = outline;
    var ax = a.x();
    var ay = a.y();
    var id = a.id();
    if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
        // console.log(id);
        return true;
    } else {
        return false;
    }
}
// инициализация области для перетаскивания элементов
function initStage(images) {
    var stage = new Konva.Stage({
        container: 'container',
        width: 578,
        height: 530
    });
    var background = new Konva.Layer();
    var detailLayer = new Konva.Layer();
    var detailShapes = [];
    var score = 0;

    // image positions
    var details = imagePosition;

    var outlines = darkPosition;

    // create draggable animals
    for (var key in details) {
        // anonymous function to induce scope
        (function () {
            var privKey = key;
            var det = details[key];

            var animal = new Konva.Image({
                image: images[key],
                x: det.x,
                y: det.y,
                id: det.id,
                draggable: true,
                name: key
            });
            animal.on('dragstart', function () {
                this.moveToTop();
                detailLayer.draw();
            });
            /*
             * check if animal is in the right spot and
             * snap into place if it is
             */
            animal.on('dragend', function () {
                var outline = outlines[privKey + '_black'];
                if (!animal.inRightPlace && isNearOutline(animal, outline)) {
                    animal.position({
                        x: outline.x,
                        y: outline.y
                    });
                    detailLayer.draw();
                    animal.inRightPlace = true;

                    if (++score >= scoreLevel) {
                        let circle = new Konva.Circle({
                            x: 213,
                            y: 139,
                            radius: 10,
                            fill: 'yellow',
                            stroke: 'yellow',
                            strokeWidth: 0,
                        });
                        detailLayer.add(circle);
                        // устанавливаем на кнопку событие
                        go.addEventListener('click', changeValue);
                        var text = 'Поздравляем вы прошли уровень';
                        drawBackground(background, images.rename, text);
                    }

                    // disable drag and drop
                    setTimeout(function () {
                        animal.draggable(false);
                    }, 50);
                }
            });
            // make animal glow on mouseover
            animal.on('mouseover', function () {
                // animal.image(images[privKey + '_glow']);
                detailLayer.draw();
                document.body.style.cursor = 'pointer';
            });
            // return animal on mouseout
            animal.on('mouseout', function () {
                animal.image(images[privKey]);
                detailLayer.draw();
                document.body.style.cursor = 'default';
            });

            animal.on('dragmove', function () {
                document.body.style.cursor = 'pointer';
            });

            detailLayer.add(animal);
            detailShapes.push(animal);
        })();
    }

    // create animal outlines
    for (var key in outlines) {
        // anonymous function to induce scope
        (function () {
            var imageObj = images[key];
            var out = outlines[key];

            var outline = new Konva.Image({
                image: imageObj,
                x: out.x,
                y: out.y
            });

            detailLayer.add(outline);
        })();
    }

    stage.add(background);
    stage.add(detailLayer);

    drawBackground(
        background,
        images.rename,
        'Поставь детали на свои позиции'
    );

}