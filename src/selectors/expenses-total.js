

// export default (expenses) => {
//     if (expenses.length === 0) {
//         return 0;
//     } else {
//         return expenses
//         .map((expense) => expense.amount) //zamienia tablicę obiektów na tablicę wartości tych obiektów (w tym wypadku amount)
//         .reduce((sum, value) =>  sum + value, 0);
//     }
// };
//Powyżej mamy to jak na początku wyglądał kod, tworzony równolegle z tesyami,
//dzieki testom wiemy, że równierz poniższa wersja działa, wiec pozwala nam to uprościć kod

export default (expenses) => {
    return expenses
    .map((expense) => expense.amount) //zamienia tablicę obiektów na tablicę wartości tych obiektów (w tym wypadku amount)
    .reduce((sum, value) =>  sum + value, 0);
};



