import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();
const port = 3000;

app.use(express.json());

// to make client side or browser can access to database using cors
app.use(cors())


const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

//get all products
app.get("/products", (req, res) => {
  const query = "select * from products";
  const data = sql.execute(query,(err,data)=>{
    if(err){
      res.json({message: "error", error: err.message})
    }else{
      res.json({ message: "success", data: data });
    }

  })
  
});

 //get single prduct
 app.get("/product/:id",(req,res)=>{
  const {id}= req.params;
  const query = "select * from products where id=?";
  sql.execute(query,[id],(err,data)=>{
    if (err) {
      res.json({ message: "error", error: err.message });
    } else {
      res.json({ message: "success", data: data });
    }
  })
 })

//add product
app.post("/addProduct", (req, res) => {
  const {name,price,description} = req.body;
  const query = "insert into products (name,price,description) values (?,?,?)";
  sql.execute(query,[name,price,description],(err,data)=>{
    if(err){
      console.log({ message: "error", error: err.message });
      
    }else{
      res.json({ message: "success", data: data });
    }
  });

});

//edit product
app.put("/edit/:id", (req, res) => {
  const {name,price,description} = req.body;
  const {id}=req.params;
  const query = "update products set name=?,price=?,description=? where id=?";
  const values = [name,price,description,id];
  sql.execute(query,values,(err,data)=>{
    if(err){
      res.json({ message: "error", error: err.message });
    }else{
      res.json({ message: "success", data: data });
    }
  });

});

//delete product
app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;
  const query = "delete from products where id=?";
  sql.execute(query,[id],(err,data)=>{
    if(err){
      res.json({ message: "error", error: err.message });
    }else{
      res.json({ message: "success", data: data });
    }
  })

});

//search product
app.get("/product",(req,res)=>{
  const {name} = req.query;
  const query = "SELECT * FROM products WHERE name LIKE ?";
  sql.execute(query, [`%${name}%`], (err, data) => {
    if (err) {
      res.json({ message: "error", error: err.message });
    } else {
      res.json({ message: "success", data: data });
    }
  });
})

app.listen(port, () => console.log(`server working on port ${port}!`));
