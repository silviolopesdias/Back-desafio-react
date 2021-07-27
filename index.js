const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())




const orders = []

const checkOrderId = (request, response, next) => {

const { id } = request.params
const index =  orders.findIndex(client => client.id === id)

if(index < 0){
    return response.status(404).json({error:"Order not found"})
}
request.orderIndex = index
request.orderId = id

 next()

}
const checkMethodUrl = (request, response, next) =>{

    console.log(request.method)
    console.log(request.url)

    next()
}


app.get('/orders', checkMethodUrl,(request, response)=>{

    return response.json(orders)
})

app.post('/orders', checkMethodUrl, (request, response) =>{

    const {order, clientName, price, status} = request.body

    const newOrder = { id: uuid.v4(), order, clientName, price, status: "Em preparação" }

     orders.push(newOrder)

    return response.status(201).json(newOrder)

})

app.put('/orders/:id', checkOrderId, checkMethodUrl, (request,response) => {
      
    const index = request.orderIndex
    const id = request.orderId
   
    const { order, clientName, price, status} = request.body

    const updateOrder = { id, order, clientName, price, status: "Em preparação" }

   
    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.delete('/orders/:id', checkOrderId, checkMethodUrl, (request, response) => {

    const index = request.orderIndex

orders.splice(index, 1)

return response.status(204).json()

})

app.get('/orders/:id', checkOrderId, checkMethodUrl, (request, response)=>{

const id = request.orderId

const  { order } = request.body

const newOrder = { order: "macarrão com queijo e salada"}

    return response.json(newOrder)
})

app.patch('/orders/:id', checkOrderId, checkMethodUrl, (request,response) => {
      
    const  id  = request.orderId
    const index = request.orderIndex

    const { order, clientName, price, status} = request.body

    const updateOrder = { id, order, clientName, price, status: "Pronto" }

       
    orders[index] = updateOrder

    return response.json(updateOrder)

})

app.listen(port, () =>{ 
    console.log(`Server stated on port ${port}`)
})