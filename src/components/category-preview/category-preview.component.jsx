import ProductCard from '../product-card/product-card.component'

import {CategoryPreviewContainer,TitleLink,Preview} from './category-preview.styles'


const CategoryPreview = ({ title, products }) => {

    return (
        <CategoryPreviewContainer>
            <TitleLink to={title}>
                {title.toUpperCase()}
            </TitleLink>
            <Preview>
                {
                    // Filter the products array to select the first 4 items for preview the underscore is convention with developers to indicate it's not necessary for the logic in this case, however, it could be anyother name for that variable that filter requires.
                    products.filter((_, idx) => idx < 4)
                        .map((product) =>
                            <ProductCard key={product.id} product={product} />
                        )
                }
            </Preview>
        </CategoryPreviewContainer>
    )

}

export default CategoryPreview