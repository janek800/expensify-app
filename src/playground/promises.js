const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'Janek',
        //     age: 29
        // });//w resolve() może być tylko 1 argument, jak chcemy więcej danych to musimy je zapisać jako obiekt
    reject('Something went wrong');
    }, 1500)
    
});

console.log('before');

//CHAINOWANIE promisa z pierwszego promisa
promise.then((data) => {
    console.log('1', data);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Thi is my other promise');
        }, 5000);
}).then((str) => { //str oznacza to co zwraca RETURN poprzedniego .then() (w tym wypadku jest to promise logujący string po czasie)
    console.log('does this run?', str)
}).catch((error) => {
    console.log('error:', error)
});

//CHAINOWANIE wartości z pierwszego promisa
// promise.then((data) => {
//     console.log('1', data);

//     return 'some data';
// }).then((str) => { //str oznacza to co zwraca RETURN poprzedniego .then() (w tym wypadku jest to string)
//     console.log('does this run?', str)
// }).catch((error) => {
//     console.log('error:', error)
// });

// Alternatywna składnia
// promise.then((data) => {
//     console.log('1', data);
// },(error) => {
//     console.log('error:', error)
// });



console.log('after');