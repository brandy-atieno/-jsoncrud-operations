const express = require ( 'express')
const ejs = require('ejs')
const cors = require( 'cors')
const path= require('path')
const fs= require('fs')
//create server
const app =express()
//view engine
app.set('view engine','ejs')
//define port 
const port =process.env.PORT || 9000
//parse req.body
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
let accounts=JSON.parse(
    fs.readFileSync(`${__dirname}/data/accounts.json`)
)

app.get('/accounts',(req,res)=>{
    res.status(200).json({
status:"success",
data:{
    accounts
}
    })
})
app.get('/account/:id',(req,res)=>{
    const id=Number(req.params.id)
    const getDetail=accounts.find((account)=> account.id===id)
    if(!getDetail){
        res.status(500).send('Account not found')
    }
    else{
        res.json(getDetail)
    }
})
app.post('/new',(req,res)=>{
    const newAccount=req.body
    accounts.push(newAccount)
    console.log(accounts)
    res.json(accounts)
})
app.put('/update/:id',(req,res)=>{
    const id=Number(req.params.id)
    const update=req.body
    const updateAccount=accounts.find((account)=> account.id===id)
    const index =accounts.indexOf(updateAccount)
    if(!updateAccount){
        res.status(500).send('Account not found')
    }
    else{
       const   newAccount=update
       updateAccount[index] = newAccount
       res.status(200).json({
        success:true,
        message:'Account  updated successfully',

        data:newAccount,
       })
    }

    
})
app.delete('/delete/:id',(req,res)=>{
    const id=Number(req.params.id)
    const deleteAccount=accounts.filter((account)=> account.id !=id)
    if(!deleteAccount){
        res.status(500).send('Account not found')
    }
    else{
        accounts=deleteAccount
       res.status(200).json({
        success:true,
        message:'Account deleted successfully',

        data:accounts,
       })

    }
})
//register with form

app.get('/register',(req,res)=>{
    res.render('index')
})
//post
app.post('/register',(req,res)=>{
    console.log(req.body);
})




//run server
app.listen(port,(req,res)=>{
    console.log(`Server running at http://localhost:${port}`)
})
