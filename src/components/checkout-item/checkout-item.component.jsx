import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'


import {CheckoutItemContainer, ImageContainer, Name, Quantity, Price, Arrow, Value, RemoveButton} from './checkout-item.styles'



const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

    const clearItemHandler = () => clearItemFromCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)
    const addItemHandler = () => addItemToCart(cartItem)

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <Name> {name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler} role="button" aria-label="Decrease quantity">
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={addItemHandler} role="button" aria-label="Increase quantity">
                    &#10095;
                </Arrow>            
            </Quantity>
            <Price> {price} </Price>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem