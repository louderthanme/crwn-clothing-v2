import {CardItemContainer,ItemDetails,Name,Price} from "./cart-item.styles"

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem

    return (
        <CardItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>

                <Name>{name}</Name>
                <Price>
                    {quantity} x ${price}
                </Price>
            </ItemDetails>

        </CardItemContainer>

    )
}

export default CartItem
