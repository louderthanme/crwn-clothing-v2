import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

const Checkout = () => {

    const { cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext)

    return (
        <div className='cartItem-container'>
            {cartItems.map(({ id, imageUrl, name, quantity, price }) => ( // Destructuring properties of cartItem
                <div key={id}>
                    <div className="item-details">
                        <span className="name">{name}</span>
                        <span className="price">
                            <span onClick={() => removeItemFromCart({ id })}>{`<`}</span> {quantity}{' '}
                            <span onClick={() => addItemToCart({ id })}>{`>`}</span> x ${price} <span onClick={() => deleteItemFromCart({ id })}> X </span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Checkout;


