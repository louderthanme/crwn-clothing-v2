import {DirectoryItemContainer,BackgroundImageContainer,Body} from './directory-item.styles'


const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category

    return (

        <DirectoryItemContainer>
            <BackgroundImageContainer
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <Body>
                <h2>{title}</h2>
                <p> shop now</p>
            </Body>
        </DirectoryItemContainer>

    )
}

export default DirectoryItem