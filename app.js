const express = require("express");

const logger = require("morgan");
const {create} = require("express-handlebars")
require("dotenv").config();

const app = express();

const hbs = create({
    extname: ".hbs"
})



app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(logger("dev"));


app.engine("hbs",hbs.engine);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/health", (_req, res) =>{
    res.status(200).json({
        success: true,
        env: process.env.ENVIRONMENT || "undefined"
    })
});

const fakeApi = () => [
    {name: "Pablo", line: "TopLiner"},
    {name: "Juan", line: "MidLiner"}
]

app.get("/", (_req, res) => {
    res.render("home", {suggestedChamps: fakeApi(), listExists: true})
})


const productos = [{title: "mouse", price: 2000, id:1},{title:"smatwatch", price:15000, id:2},{title:"laptop", price:200000, id:3},];

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
 

  app.post('/productos', (req, res) => {
    res.render("home")
    let title1 = req.body.title
    let price1 = parseInt(req.body.price)
    let id1 = parseFloat(productos.length + 1);
    

    object = {title: `${title1}`, price:`${Number(price1)}`, id:`${id1}`}
    object.price = parseInt(object.price);
    object.id = parseInt(object.id);
    productos.push(object)
    res.status(200).send(productos)
    
  })

  app.get("/productos",(_req,res) =>{
    res.render("formulario")
  })
  app.post("/productos",(_req,res) =>{
    res.render("formulario")
  })


  
module.exports = app;