const express = require("express");
const app1 = require("./app");
require("dotenv").config();

const app = express();
const productos = [{title: "mouse", price: 2000, id:1},{title:"smatwatch", price:15000, id:2},{title:"laptop", price:200000, id:3}];

app.get("/api/productos",(_req,res)=>{
    res.status(200).send(productos);
})

app.get("/api/productos/:id",(req,res)=>{
    try{
        if(isNaN(parseInt(req.params.id))){
            return res.status(400).json({
                error: `El parametro ${req.params.id} no es un numero`
            })
            
        }
        
        const position = productos[req.params.id -1] ;
        res.status(200).send(position)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
    
})

 app.post("/api/productos",(_req,res)=>{
     productos.push({title: "smartphone", price: 40000, id:4});
     productos.forEach((object)=>{
        if(object.id === 4){
            return res.status(200).send(object);
        }
     })
     
 })

 app.put("/api/productos/:id",(req,res)=>{
    const producto = {title: "cargador", price: 2000, id: parseInt(req.params.id)}
    productos[parseInt(req.params.id -1)] = producto;
    res.status(200).json({
     agregada: producto,
     id:parseInt(req.params.id)
    })
 })

 app.delete("/api/productos/:id",(req,res)=>{   
        
      productos.splice(parseInt(req.params.id -1),1)     
      res.status(200).send(productos);

  })
 


const PORT = process.env.PORT || 3002;

app.listen(PORT,()=>{
    console.info(`server corriendo en el puerto ${PORT}`)
})


