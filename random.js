//Synchronze

console.log('1. First execution');

let value = 'Hello World !!';

function doAsync() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('2. Operating inside the timer');
            resolve('Async Operation');
        }, 3000);
    });

}

async function ExecuteOperation() {

    let operation = await doAsync();

    console.log('3. ' + operation);
}

ExecuteOperation();

console.log('4. Fourth Operation');

