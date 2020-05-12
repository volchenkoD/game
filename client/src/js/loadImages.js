var width = window.innerWidth;
var height = window.innerHeight;
//Функция загрузки изображений
export default function(sources, callback) {
    // папка с изображениями
    var assetDir = '../src/details/';
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