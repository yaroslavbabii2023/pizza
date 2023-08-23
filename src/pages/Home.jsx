import React from "react";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from 'react-router-dom'
import {fetchPizzas} from "../redux/slices/pizzasSlice";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)
    const {items, status} = useSelector((state) => state.pizza)
    const sortType = sort.sortProperty
    const {searchValue} = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = number => {
        dispatch(setCurrentPage(number))
    }
    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage,
            }),
        )

        window.scrollTo(0, 0)
    }

    // Якщо змінились параметри і був перший рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage,])

    // Якщо був перший рендер, то перевіряєс url і зберігаєм в редуксі
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);


    // Якщо був перший рендер то запрошуємо піци
    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading' ? skeletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}
export default Home