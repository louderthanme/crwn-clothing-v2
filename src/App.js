import "./categories.styles.scss"

const App = () => {

  const categories = [
    {
      id: 1,
      title: 'hats'
    },
    {
      id: 2,
      title: 'jackets'
    },
    {
      id: 3,
      title: 'sneakers'
    },
    {
      id: 4,
      title: "women's"
    },
    {
      id: 5,
      title: "men's"
    },
  ]

  return (
    <div className="categories-container">
      {categories.map(({ title, id }) => (
        <div key={id} className="category-container">
          <div className="background-image" />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p> shop now</p>
          </div>
        </div>
      ))}
    </div>



  );
}

export default App;
