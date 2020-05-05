var width = window.innerWidth;
var height = window.innerHeight;
//Функция загрузки изображений
function loadImages(sources, callback) {
    // папка с изображениями
    var assetDir = './details/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + sources[src];
    }
}
function isNearOutline(detail, outline) {
    var a = detail;
    var o = outline;
    var ax = a.x();
    var ay = a.y();

    if (ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
        return true;
    } else {
        return false;
    }
}
function drawBackground(background, gridImage, text) {
    var context = background.getContext();
    context.drawImage(gridImage, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'black');
    context.fillText(text, background.getStage().width() / 2, 40);
}

function initStage(images) {
    var stage = new Konva.Stage({
        container: 'container',
        width: 578,
        height: 530
    });
    var background = new Konva.Layer();
    var animalLayer = new Konva.Layer();
    var animalShapes = [];
    var score = 0;

    // image positions
    var details= {
        first: {
            x: 450,
            y: 130
        },
        second: {
            x: 450,
            y: 100
        },
        three: {
            x: 450,
            y: 60
        },
        four:{
            x: 450,
            y: 180
        },
        five: {
            x: 0,
            y: 0
        },
        six:{
            x: 250,
            y: 300
        },
        seven: {
            x: 400,
            y: 300
        },
        eight: {
            x: 0,
            y: 200
        }
    };

    var outlines = {
        first_black:{
            x: 120,
            y: 126
        },
        second_black:{
            x: 233,
            y: 126
        },
        three_black:{
            x: 120,
            y: 241
        },
        four_black:{
            x: 233,
            y: 241
        },
        five_black:{
            x: 118,
            y: 126
        },
        six_black:{
            x: 179,
            y: 241
        },
        seven_black:{
            x: 179,
            y: 126
        },
        eight_black:{
            x: 286,
            y: 126
        }
    };

    // create draggable animals
    for (var key in details) {
        // anonymous function to induce scope
        (function() {
            var privKey = key;
            var anim = details[key];

            var animal = new Konva.Image({
                image: images[key],
                x: anim.x,
                y: anim.y,
                draggable: true,
                name: key
            });
            animal.on('dragstart', function() {
                this.moveToTop();
                animalLayer.draw();
            });
            /*
             * check if animal is in the right spot and
             * snap into place if it is
             */
            animal.on('dragend', function() {
                var outline = outlines[privKey + '_black'];
                if (!animal.inRightPlace && isNearOutline(animal, outline)) {
                    animal.position({
                        x: outline.x,
                        y: outline.y
                    });
                    animalLayer.draw();
                    animal.inRightPlace = true;

                    if (++score >= 8) {
                        let circle = new Konva.Circle({
                            x: 213,
                            y: 139,
                            radius: 10,
                            fill: 'yellow',
                            stroke: 'yellow',
                            strokeWidth: 0,
                        });
                        animalLayer.add(circle);
                        var text = 'Поздравляем вы прошли уровень';
                        drawBackground(background, images.rename, text);
                    }

                    // disable drag and drop
                    setTimeout(function() {
                        animal.draggable(false);
                    }, 50);
                }
            });
            // make animal glow on mouseover
            animal.on('mouseover', function() {
                // animal.image(images[privKey + '_glow']);
                animalLayer.draw();
                document.body.style.cursor = 'pointer';
            });
            // return animal on mouseout
            animal.on('mouseout', function() {
                animal.image(images[privKey]);
                animalLayer.draw();
                document.body.style.cursor = 'default';
            });

            animal.on('dragmove', function() {
                document.body.style.cursor = 'pointer';
            });

            animalLayer.add(animal);
            animalShapes.push(animal);
        })();
    }

    // create animal outlines
    for (var key in outlines) {
        // anonymous function to induce scope
        (function() {
            var imageObj = images[key];
            var out = outlines[key];

            var outline = new Konva.Image({
                image: imageObj,
                x: out.x,
                y: out.y
            });

            animalLayer.add(outline);
        })();
    }

    stage.add(background);
    stage.add(animalLayer);

    drawBackground(
        background,
        images.rename,
        'Поставь детали на свои позиции'
    );

}

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