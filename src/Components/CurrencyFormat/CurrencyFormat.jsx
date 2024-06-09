// import React from 'react'
// import numeral from 'numeral'


// const CurrencyFormat = (amount)=>{

// const formatedAmount= numeral(amount).format("$0,0.00")

// return <div>{formatedAmount}</div>
// }


// export default CurrencyFormat

import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';

const CurrencyFormat = ({ amount }) => {
  // Check if the amount is a valid number
  const validAmount = isNaN(amount) ? 0 : amount;
  const formattedAmount = numeral(validAmount).format('$0,0.00');

  return <div>{formattedAmount}</div>;
};

CurrencyFormat.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default CurrencyFormat;
