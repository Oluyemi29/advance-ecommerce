// type Tprops={
//   totalPrice: (totalPrice:number)=>void
// }
// const TotalPricePage = ({totalPrice}:Tprops) => {
//   console.log(totalPrice);
// };

// export default TotalPricePage;

import { useContext } from 'react';
import { CartContext } from './Provider'

const TotalPricePage = () => {
  const Cart = useContext(CartContext)
  const totalPrice = Cart?.cart.reduce((acc, Prices) => {
    return Math.ceil(Prices.quantity * Prices.price + acc);
  }, 0);
  return (totalPrice )
}

export default TotalPricePage
