import { createStore } from 'redux';

//Action generators - funkcje tworzące action objects (nie trzeba tworzyć obiektów po store.dispatch, wystarczy odnieść się do tych funkcji)

// const incrementCount = (payload = {}) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

//Powyższe po destrukturyzacji argumentu payload wygląda tak:

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy //dzieki temu, że ustaliliśmy wartość defaultową powyżej,
                             //nie potrzebujemy sprawdzać czy incrementBy jest typeof === 'number'
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy //to znaczy to samo co decrement: decrementBy
});

const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
})

// Reducers
//1. pure functions same z siebie nic nie tworzą, potrzebują jakichś argumentów z zewnątrz (state, action)
//nie należy zmieniać zmiennych poza ich scope i polegać na zmiennych zadeklarownych poza ich scope
//2. Zwracają obiekt reprezentujący nowy state ale same go nie modyfikują

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
    // if (action.type === 'INCREMENT'){  częściej stosuje się switch ale tak jak tutaj też można
    //     return {
    //         count: state.count + 1
    //     };
    // } else {
    //     return state;
    // }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})



// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5}));

//unsubscribe();  to wpisujemy gdy chcemy przestać obserwować zmiany w store

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({count: 101}));


