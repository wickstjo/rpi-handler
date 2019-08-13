import React from 'react';
import Divider from 'ink-divider';

function Header({ text }) { return (
   <Divider title={ text } width={ 70 } dividerChar={ '#' } />
)}

export default Header;