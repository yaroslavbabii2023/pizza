import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";


const Home = () => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [ categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярности', sortProperty: 'rating'
    })

    React.useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''

        fetch(`https://64d26e02f8d60b1743620bc0.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then(response => response.json())
            .then((json) => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
                }
            </div>
        </div>
    )
}

export default Home