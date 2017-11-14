
//DESTRUKTURYZACJA OBIEKTÓW

const person = {
    name: 'Janek',
    age: 29,
    location: {
        city: 'Gdańsk',
        temp: 10
    }
};

const { name = 'Anonymous', age } = person; // name='Anonymous' tworzy domyślną wartość w razie jakby obiekt 
                                            //person nie miał name:

//powyżej dzięki destrukturyzacji w jednej lini tworzymy 2 consty:
// const name = person.name;
// const age = person.age;

console.log(`${name} is ${age}.`);


const {city, temp: temperature = 'pizga'} = person.location; //temp: temperature zmienia nazwę elementu temp 
                                                //temp: temperature = 'pizga' zmienia defaultową wartość temp
                                                //w razie jakby w obiekcie person.location nie było temp
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}.`);
}



const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

//DESTRUKTURYZACJA TABLIC

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];

const [, , state = 'Ohio'] = address; //liczy się kolejność, jak nie chcemy destrukturyzować wszystkiego to
                                     //dajemy przecinki aby zasygnalizować że coś wcześniej w tablicy było
console.log(`You are in ${state}.`); //dzięki wartości defaultowej (Ohio) funkcja zadziała 
                                     //nawet jeżeli tablica będzie pusta


                                    
const item = ['Coffe (hot)', '$2.00', '$2.50', '$2.75'];

const [drink, ,price] = item;

console.log(`A medium ${drink} costs ${price}.`);


//Destrukturyzacja obiektu będącego argumentem funkcji

let add = (data, c) => {
    return data.a + data.b + c;
};
//po destrukturyzacji
let add = ({ a, b }, c) => {
    return a + b +c;
}

console.log(add({a:1, b:12}, 100));
