export default function (background, gridImage, text) {
    var context = background.getContext();
    context.drawImage(gridImage, 0, 0);
    context.setAttr('font', '20pt Calibri');
    context.setAttr('textAlign', 'center');
    context.setAttr('fillStyle', 'black');
    context.fillText(text, background.getStage().width() / 2, 40);
}