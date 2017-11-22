import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  export { firebase, database as default };


// //SUBSCRIBER CHILD_REMOVED nasłuchujący expenses i uruchamiający się kiedy poszczególny rekord został usunięty

// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //SUBSCRIBER CHILD_CHANGED nasłuchujący expenses i uruchamiający się kiedy poszczególny rekord został zmieniony

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //SUBSCRIBER CHILD_ADDED nasłuchujący expenses i uruchamiający się kiedy poszczególny rekord został dodany

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

//POBIERANIE DANYCH Z BAZY DO TABLICY W MOMENCIE KIEDY SIĘ ZMIENIĄ---------------------

//   database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
//   }); 

//TWORZENIE PRAWDZIWEJ TABLICY Z TABLICY (TK JAKBY) Z BAZY DANYCH

//   database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
//   });


//EDYTOWANIE POSZCZEGÓLNYCH REKORDÓW W TABLICY--------------------------------

// database.ref('notes/-KzO5Lr0DHBRv4X9oTn_').update({
//     body: 'Buy food'
// });

// database.ref('notes/-KzO5Lr0DHBRv4X9oTn_').remove();

//DODAWANIE TABLIC (TAK JAKBY) DO BAZY DANYCH-------------------------------------------

//wywołując funkcję .push({})dodajemy kolejne elementy do tablicy (każdy z wygenerownym identyfikatorem)
 //   database.ref('notes').push({
//       title: 'Course Topics',
//       body: 'React Native, Angular, Python'
//   });

// database.ref('expenses').push({
//     description: 'Rent',
//     note: '',
//     amount: 4561,
//     createdAt: 12121212
// });

// database.ref('expenses').push({
//     description: 'Gas',
//     note: 'yuyuyuy',
//     amount: 100000,
//     createdAt: 2233232
// });

// database.ref('expenses').push({
//     description: 'Water',
//     note: '',
//     amount: 4561,
//     createdAt: 454545666
// });

//POBIERANIE DANYCH Z BAZY W MOMENCIE KIEDY SIĘ ZMIENIĄ-----------------------

  // database.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
// });

// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching', e);
// });

// setTimeout(() => {
//     database.ref('age').set(29);
// }, 3500);

// //ZAPRZESTANIE POBIERANIA DANYCH Z BAZY KIEDY SIĘ ZMIENIĄ---------------------
// setTimeout(() => {
//     database.ref().off(onValueChange);
// }, 7000);

// //poniższe zmieni dane w bazie, ale nie wyświetli ich bo w kodzie powyżej użylismu .off()
// setTimeout(() => {
//     database.ref('age').set(30);
// }, 10500);


  //POBIERANIE DANYCH Z BAZY RAZ------------------------------------------

//   database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//       const val = snapshot.val();
//       console.log(val);
//   })
//   .catch((e) => {
//       console.log('Error fetching data', e);
//   });
  
  //DODAWANIE-----------------------------------------------------------

//   database.ref().set({
//       name: 'Janek',
//       age: 29,
//       //isSingle: true,
//       stressLevel: 3,
//       job: {
//           title: 'Software developer',
//           company: 'Google'
//       },
//       location: {
//           city: 'Gdańsk',
//           country: 'Poland'
//       }
//   }).then(() => {
//       console.log('Data is saved');
//   }).catch((e) => {
//     console.log('This failed.', e);
//   })

//   database.ref().set('This is my data.'); 
//   .set() zawsze nadpisuje tym co w nim podaliśmy, usuwając z bazy starą wersję danych.
//   Aby temu zapobiec musimy w .ref() wpisać to co chcemy zaktualizować:
  
//   database.ref('age').set(27);

//   database.ref('location/city').set('NewYork');

//   database.ref('attributes').set({
//       height: 185,
//       weight: 85
//   }).then(() => {
//     console.log('Second set call worked.');
// }).catch((e) => {
//   console.log('This failed also.', e);
// })

//Powyższy kod w komentarzach służył do umieszczenia danych w bazie, gdy baza została sporządzona, kod ten nie był już potrzebny

//USUWANIE------------------------------------------------------

// database.ref('isSingle')
// .remove()
// .then(() => {
//         console.log('remove call worked.');
//     }).catch((e) => {
//       console.log('This failed.', e);
//     })

// Alternatywny sposób usówania

// database.ref('isSingle').set(null);

//AKTUALIZACJA----------------------------------------------------------

// database.ref().update({ 
//     name: 'Mike',
//     age: 26,
//     job: 'Manager',
//     isSingle: null
// }); 
//przy .update() trzeba podać obiekt w argumentach

// database.ref().update({
//     job: 'Manager',
//     location: {
//         city: 'Warszawa'
//     }
// });

//.update() nie aktualizuje zagnieżdżonych obiektów, w powyższym wypadku na obiekt location
//zadziała tak jak .set() zmieniając nazwę miasta i usuwając kraj
//aby zadziałało, trzeba zrobić tak jak poniżej:

// database.ref().update({
//     job: 'Manager',
//     'location/city': 'Warszawa'
// });

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

