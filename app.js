const express = require('express');
const app = express();

const dbo = require('./db.js');
const chalk = require('chalk');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showoptions(){
console.log(chalk.cyanBright("Enter choices"));
console.log(chalk.greenBright("1. Insert a student"));
console.log(chalk.greenBright("2. Delete a student"));
console.log(chalk.greenBright("3. Update student"))
console.log(chalk.greenBright("4. Display all students"));
console.log(chalk.greenBright("5. Exit DB"));
console.log();

rl.question("Enter your choice : ",(choice) => {
    switch(choice.trim()){
        case '1':
            insert();
            break;
    
        case '2':
            deletestudent();
            break;

        case '3':
            updatestudent();
            break;

        case '4':
            displaystudent();
            break;
    
        case '5':
             console.log("Exiting...");
             rl.close();
            break;
        default:
            console.log(chalk.red('invalid choice'));
            showoptions();
    }
});
}
async function insert(){
    rl.question("Enter student name: ", (name) => {
        rl.question("Enter student age: ", async (age) => {
            rl.question("Enter student RollNo: ", async (rollno) => {
            const student = { NAME: name, AGE: parseInt(age), ROLLNO: parseInt(rollno)};

    
   const db = await dbo.getDB();
   const collection = db.collection('students');
   const result = await collection.insertOne(student);
//    console.log(result.insertedId);
if(result.insertedId){
   console.log('Inserted Successfully');
}else{
    console.log("No ID inserted");
}
   console.log();
    showoptions();
        })
    })
  })
};

async function deletestudent(){
  
        rl.question("Enter student RollNo: ", async (rollno) => {
            const student = {ROLLNO: parseInt(rollno) };

    
   const db = await dbo.getDB();
   const collection = db.collection('students');
   const result = await collection.deleteOne(student);
   
   if(result.deletedCount>0){
   console.log('deleted successfully');
        }
        console.log();
    showoptions();
        })

};

async function updatestudent() {
    rl.question("Enter student RollNo: ", async (rollno) => {
        rl.question("Enter student name: ", async (name) => {
            rl.question("Enter student age: ", async (age) => {

                const db = await dbo.getDB();
                const collection = db.collection('students');

                const result = await collection.updateOne(
                    { ROLLNO: parseInt(rollno) }, 
                    { $set: { NAME: name, AGE: parseInt(age) } } 
                );
                
                if (result.modifiedCount > 0) {
                    console.log('Updated successfully');
                } else {
                    console.log('No matching student found or no change in data');
                }
                showoptions();
            });
        });
    });
}



async function displaystudent(){
    const db = await dbo.getDB();
    const collection = db.collection('students');
    const students = await collection.find({}).toArray();
    // console.log(students);
    students.forEach((student,index)=>{
      console.log(`${index + 1}. NAME: ${student.NAME}`);
      console.log(`   AGE: ${student.AGE}`);
      console.log(`   ROLLNO: ${student.ROLLNO}`);
      console.log();
    })
    console.log();
    showoptions();
};
showoptions();