import data from './lesson';
export default function (data) {
    let result;
    for(let key in data){
        let i = 0;
        while (i < data[key].length){
            if(key === `lesson${i + 1}`){
                result = (data[key]);
                i++;
            }else{
                break;
            }
        }
    }
    return result;
}

