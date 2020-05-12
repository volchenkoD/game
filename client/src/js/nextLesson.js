import loadImages from "./loadImages";
import initStage from "./initStage";
let count = 0;
export default function (data) {
    const checkboxLabel = document.querySelectorAll('.mini__lesson li');
    const checkbox = document.querySelectorAll('.mini__lesson input');
    const button = document.querySelector('.next__lesson');
    const header = document.querySelector('.lesson__name');
    const text = document.querySelector('.lesson__text');
    const img = document.querySelector('.img__schema');
    button.addEventListener('click', clickPlus);
     function clickPlus() {
        printArr(checkboxLabel);
         printData(data);
    }
    function printArr(arr) {
        if (count < arr.length) {
            for (let i = 0; i < arr.length; i++) {
                if (count === i) {
                    arr[count].classList.add('end__lesson');
                    checkbox[count].checked = true;
                }
            }
            plus();
        } else {
            minus();
        }
    }
    function printData(data) {
         for(let i = 0; i < data.length; i++){
             if(count === i){
                 header.innerHTML = data[count].part;
                 text.innerHTML = data[count].text;
                 img.setAttribute('src', data[count].img);
                 console.log(data[i].sources);
                 loadImages(data[i].sources, initStage);
             }
         }
    }
    function plus() {
        count++;
    }

    function minus() {
        count = 0;
    }
}