import createElement from "./createElement";

export default function createMiniThems(data){
    const textPart = document.querySelector('.text__info');
    let ul = createElement('ul');
    ul.setAttribute('class', 'mini__lesson');
    for(let i = 0; i < data.length; i++){
        let textInLi = i + 1;
        let li = createElement('li');
        let checkbox = createElement('input');
        let label = createElement('label');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'invisible');
        label.setAttribute('id', 'invisible');
        checkbox.setAttribute('for', 'invisible');
        label.innerHTML = textInLi;
        label.append(checkbox);
        li.append(label);
        ul.append(li);
    }
    textPart.append(ul);
}