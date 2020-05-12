// let data = fetch('https://cloud.mongodb.com/v2/5eb8f6e4ec4aea360e289301#metrics/replicaSet/5eb8f77f3438e475eceaca85/explorer/gameCollection', {
//     method: 'GET',
//     mode: 'no-cors'
// });
// if (data.ok) {
//     console.log('ответ');
// } else {
//     console.log(data.status);
// }
let data;
async function getData() {
    data = await fetch('https://cloud.mongodb.com/v2/5eb8f6e4ec4aea360e289301#metrics/replicaSet/5eb8f77f3438e475eceaca85/explorer/gameCollection', {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
}
let item = getData();
console.log(item);