import React, { useEffect, useState } from 'react';
import './Styles.scss'
import api from './api';
import { connect, disconnect, subscribeTonewDelivery, removeOrder} from './socket';
export default function Pedido() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
       

    async function getRequest() {
        const response = await api.get('pedidos')
        setOrders(response.data)
    }

    async function handleNewOrder(event){
        event.preventDefault();
        disconnect()
        
        try{
            await api.post('pedidos', {
                'id': id,
                'estado': '0'
            })
            console.log('to entrando no metodo')
        }catch(error){
            console.log("dei erro na hora de inserir")
        }
        
        try {
            let order = document.querySelector('#pedido-chamado').innerHTML;
            await api.put('pedidos', {
                "id": order,
                "estado": "1"
            })
        } catch (error) {
            console.log("dei erro na hora de atualizar")
            window.location.reload();
        }
        
        setLoading(!loading)
        setId('');
        connect()
        subscribeTonewDelivery(id)
    }

    async function handleDelete(deliver){
        try {
            await api.put('pedidos',{
                "id": deliver,
                "estado": "2"
            })

            removeOrder(deliver)
        } catch (e) {
            console.log("dei erro na hora de excluir")
        }

        setLoading(!loading)
    }


    useEffect(() => {
        getRequest()
        connect()
    }, [loading]);

    return (
        <>
            <div className="form">
                <form onSubmit = { handleNewOrder }>
                    <label>Pedido Pronto</label>
                    <input required type='text' id="pedido" value = {id} onChange = {event => setId(event.target.value)}/>
                    <button type='submit'>Chamar Pedido</button>
                </form>

                <label>Ultimo Pedido chamado</label>
                {orders.map(order => (
                    <>
                        {order.estado == '0' ?
                            <label id="pedido-chamado">{order.id}</label>
                        :   null}
                    </>
                ))}

            </div>

            <div className="table">
                <h1>Pedidos em espera</h1>
                <ul>
                    {orders.map(order => (
                        <>
                            {order.estado == '1' ?
                                <li>
                                    <label>{order.id}</label>
                                    <button onClick ={() => handleDelete(order.id)}>Entregue</button>
                                </li>
                            : null}
                        </>
                    ))}
                </ul>
            </div>
        </>
    )
}