import moment from 'moment';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf() //moment(0) tworzy timestamp na starcie UNIX epoch (1970 r) potem .subtract() odejmuje od tego 4 dni a na końcu valueOf() zamienia to na Number
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf() //add() dodaje 4 dni do timestampa moment(0)
}]