export default function (detail, outline) {
    var a = detail;
    var o = outline;
    var ax = a.x();
    var ay = a.y();
    var id = a.id();
    //ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20
    if (id === o.id) {
        // console.log(id);
        return true;
    } else {
        return false;
    }
}