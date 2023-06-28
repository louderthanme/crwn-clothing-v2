import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { Link } from 'react-router-dom'

const CategoryPreview = ({ title, products }) => {

    return (
        <div className="category-preview-container">





            <h2>
                <Link className='title' to={title}>

                    {title.toUpperCase()}


                </Link>
            </h2>
            <div className='preview'>
                {
                    // Filter the products array to select the first 4 items for preview the underscore is convention with developers to indicate it's not necessary for the logic in this case, however, it could be anyother name for that variable that filter requires.
                    products.filter((_, idx) => idx < 4)
                        .map((product) =>
                            <ProductCard key={product.id} product={product} />
                        )
                }
            </div>
        </div>
    )

}

export default CategoryPreview