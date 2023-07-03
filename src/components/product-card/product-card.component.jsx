import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

import {CardContainer, Footer} from './product-card.styles'


const ProductCard = ({ product }) => {


    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => { addItemToCart(product) }



    return (
        <CardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <div className="name"> {name}</div>
                <div className="price"> {price}</div>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}> ADD TO CART </Button>
        </CardContainer>
    )
}


export default ProductCard