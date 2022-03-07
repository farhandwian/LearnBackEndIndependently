const mongoose = require('mongoose');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

//connect to db 
const url = 'mongodb://127.0.0.1:27017/game-of-thrones';

const db = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

const kittySchema = new mongoose.Schema({
  name: String
});

// Import model
const Customer = require("./models/customer")

// Add customer 
const addCustomer=(customer)=>{
   Customer.create(customer).then(()=>{
       console.info('New customer added');

   })     
}

// Update Customers
const updateCustomer = (_id,customer)=>{
    Customer.findByIdAndUpdate(_id,customer,function(err,docs){
      if(err)console.log(err);
      else{
        console.info('Customer Updated');
        console.log("Updated Docs : ", docs);
        db.close();
      }        
    })
      
}

// Remove Customers
const removeCustomer = (_id)=>{
  Customer.findByIdAndRemove(_id)
    .then(customer=>{
      console.info('Customer removed');
      db.close();
    });
}

// Find customer
const findCustomer = (name)=>{
   // Make case insensitive
   const search = new RegExp(name,'i');
   Customer.find({$or:[{firstname:search},{lastname:search}]})
    .then(customer=>{
        console.info(customer);
        console.info(`${customer.length} matches`);
        db.close();
    })  
}

// List Customers
const listCustomer = () => {
    Customer.find()
      .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers`);
        db.close();
      });
  }
  

module.exports={
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}