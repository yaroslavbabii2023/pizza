import React from "react";
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {Link, useNavigate} from 'react-router-dom'
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const sortType = sort.sortProperty

    const onChangeCategory = (index: number) => {
        dispatch(setCategoryId(index))
    }
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page))
    }
    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        dispatch(
            // @ts-ignore
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
            getPizzas().then()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((obj: any) => (
        <Link key={obj.id} to={`/pizza/${obj.id}`}>
            <PizzaBlock {...obj}/>
        </Link>))

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