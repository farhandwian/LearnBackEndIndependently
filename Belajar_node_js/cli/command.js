const program = require('commander');
const {addCustomer,findCustomer,updateCustomer,removeCustomer,listCustomer}=require('./index');
const {prompt}=require('inquirer');

// Question
const question=[
    {
        type:'input',
        name:'firstName',
        message:"customer first name"
    },
    {
        type:'input',
        name:'lastName',
        message:"customer last name"
    },
    {
        type:'input',
        name:'phoneNumber',
        message:"customer phone number"
    },
    {
        type:'input',
        name:'email',
        message:"customer email"
    },
]

program
    .version('1.0.0')
    .description('client managemenent system');

// Add command
program
    .command('add')
    .alias('a')
    .description('add a customer')
    .action(() =>{
        prompt(question).then(answers=> addCustomer(answers));
    });

// Find command    
program
    .command(`find <name>`)
    .alias('f')
    .description('find a customer')
    .action(name=>{
        findCustomer(name);
    });

// update command
program
    .command('update <_id>')
    .alias('u')
    .description('update a customer')
    .action(_id =>{
        prompt(question).then(answers=> updateCustomer(_id,answers));
    });

// Remove command    
program
    .command(`remove <_id>`)
    .alias('r')
    .description('remove a customer')
    .action(_id=>{
        removeCustomer(_id);
    });

// List Command
program
  .command('list')
  .alias('l')
  .description('List all customers')
  .action(() => listCustomer());

    
program.parse(process.argv);    
    
    
