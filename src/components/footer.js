import React from 'react';
import Header from './header';

function Footer({ show }) {
   switch(show) {

      // RENDER FOOTER
      case true: { return (
         <Header text={ 'Task Complete' } />
      )}

      // RENDER NOTHING
      default: {
         return null;
      }
   }
}

export default Footer;