
let count = 0;
export default function (data) {
    const checkboxLabel = document.querySelectorAll('.mini__lesson li');
    const checkbox = document.querySelectorAll('.mini__lesson input');
    const drapZone = document.querySelector('.drap__zone');
    const button = document.querySelector('.next__lesson');
    const dragElement = document.querySelector('.drap__zone-elements');
    const header = document.querySelector('.lesson__name');
    const text = document.querySelector('.lesson__text');
    const img = document.querySelector('.img__schema');
    button.addEventListener('click', clickPlus);
     function clickPlus() {
        printArr(checkboxLabel);
         printData(data);
         changeDetail(data);
         createDrop();
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