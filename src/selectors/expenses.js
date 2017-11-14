import moment from 'moment';

//Get visible expenses

export default (expenses, {text, sortBy, startDate, endDate}/*ten obiekt to zdestrukturyzowane filters*/) => {
    return expenses.filter((expense) => {
        //wcześniej gdy startDate nie było ustalane dzieki moment()
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch= startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true; //sprawdza czy createdAt jest większe od startDate filtra(https://momentjs.com/docs/#/query/is-same-or-before/)
        const endDateMatch= endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true; //sprawdza czy createdAt jest mniejsze od endtDate filtra(https://momentjs.com/docs/#/query/is-same-or-after/)
        const textMatch =  expense.description.toLowerCase().includes(text.toLowerCase()) ;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //jeżeli b zostało zrobione później od a (createdAt wieksze od a) pokaż b (1), jeżeli nie to pokaż a (-1)
        }
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};
