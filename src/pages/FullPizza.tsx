import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()
    const {id} = useParams()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://64d26e02f8d60b1743620bc0.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('помилка при отриманні піцци')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>'зарузка...'</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price}</h4>
        </div>
    )
}
export default FullPizza