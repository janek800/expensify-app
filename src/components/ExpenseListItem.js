import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
    <Link to={`/edit/${id}`}>
         <h3>{description}</h3>
    </Link>
    <p>
        {numeral(amount / 100).format('$0,0.00')} 
        - 
        {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
    </div>
);

export default ExpenseListItem;

//poniżej przykład DESTRUKTURYZACJI PROPSÓW 
//(zwrócić uwagę, że trzeba zapisać w zdestrukturyzowanych propsach równierz metody jak np dispatch)
//
// const ExpenseListItem = ({ dispatch, id, description, amount, createdAt }) => ( 
//     <div>
//     <Link to={`/edit/${id}`}>
//          <h3>{description}</h3>
//     </Link>
//     <p>{amount} - {createdAt}</p>
//     <button onClick={() => {
//         dispatch(removeExpense({ id }));
//     }}>Remove</button>
//     </div>
// );

// export default connect()(ExpenseListItem);