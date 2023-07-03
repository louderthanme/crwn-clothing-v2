import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import {CardIconContainer,ShoppingIcon,ItemCount} from  './cart-icon.styles'


const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)

    const toggleIsCartOpen = () => { setIsCartOpen(!isCartOpen) }



    return (
        <CardIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount> {cartCount}</ItemCount>
        </CardIconContainer>
    )
}

export default CartIcon