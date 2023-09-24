const express  = require('express');
const path = require('path');
const Cont = require('../model/contacts')
const router =  express.Router();




router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','home.html'));
})


//Add contact to database
router.get('/addcontact',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','register.html'));
})

router.post('/addcontact', async (req,res)=>{
    let lname = req.body.lastname;
    let fname = req.body.firstname;
    let email = req.body.email;
    let age = req.body.age;
    const myusr = await Cont.create({
        lastname:lname,
        firstname:fname,
        email:email,
       age:Number(age)
    }).then((data)=>{
        console.log(data, 'data')
    })

    
    if(myusr){
     console.log('New Contact Added Successfully')
    }
    res.send("Contact Successfully Added");
    
    res.end()
})

//To display all contact list
router.get('/contactlist',async(req,res)=>{
    const contacts = await Cont.find();

    const handleTable = (contacts)=>{
       return contacts.map((contact, index)=>(
            `<tr><td>${index}</td> <td>${contact.lastname}</td> <td>${contact.firstname}</td> <td>${contact.email}</td> <td>${contact.age}</td></tr>`
        ))
    }
    
    let pagelist = `<h2>All Contact List</h2><table border='1'>
    <tr><th>S/N</th> <th>LASTNAME</th> <th>FIRSTNAME</th> <th>EMAIL</th> <th>AGE</th></tr>
        ${handleTable(contacts)}

    </table>`
   res.send(pagelist);
 
    res.end();
 
  
});

//single user details
router.get('/contact/:id',async(req,res)=>{
    let urid = req.params.id;
    const contacts = await Cont.findOne({_id:urid});
    
    let pagelist = `<h2>CONTACT DETAILS OF THIS ID:${urid} </h2><table border='1'>
    <tr><th>S/N</th> <th>LASTNAME</th> <th>FIRSTNAME</th> <th>EMAIL</th> <th>AGE</th></tr>
    <tr><td>1</td> <td>${contacts.lastname}</td> <td>${contacts.firstname}</td> <td>${contacts.email}</td> <td>${contacts.age}</td></tr>
    </table>`;  
   res.send(pagelist);
 
    res.end();
 
  
});


//Display all the contacts with an age >18. $gt(greater than ) $lt(less than)
router.get('/contactgreater',async(req,res)=>{
    
    const contacts = await Cont.findOne({age:{$gt:18}});
  
    //let maintest = contacts.count();

    
    let pagelist = `<h2>LESS THAN 18</h2><table border='1'>
    <tr><th>S/N</th> <th>LASTNAME</th> <th>FIRSTNAME</th> <th>EMAIL</th> <th>AGE</th></tr>
    <tr><td>1</td> <td>${contacts[0].lastname}</td> <td>${contacts[0].firstname}</td> <td>${contacts[0].email}</td> <td>${contacts[0].age}</td></tr>
    <tr><td>2</td> <td>${contacts[1].lastname}</td> <td>${contacts[1].firstname}</td> <td>${contacts[1].email}</td> <td>${contacts[1].age}</td></tr>
    <tr><td>3</td> <td>${contacts[2].lastname}</td> <td>${contacts[2].firstname}</td> <td>${contacts[2].email}</td> <td>${contacts[2].age}</td></tr>
    <tr><td>4</td> <td>${contacts[3].lastname}</td> <td>${contacts[3].firstname}</td> <td>${contacts[3].email}</td> <td>${contacts[3].age}</td></tr>
    <tr><td>5</td> <td>${contacts[4].lastname}</td> <td>${contacts[4].firstname}</td> <td>${contacts[4].email}</td> <td>${contacts[4].age}</td></tr>
    </table>`;  
   res.send(pagelist);
 
    res.end();
 
  
});

//Name contain contacts with an age>18 and name containing "ah"
router.get('/contactcontain',async(req,res)=>{

         //Cont.findOne({"username" : /.*son.*/});
         //Cont.findOne({"username" : /.*son.*/i}); //this to check for case-sentive
    const contacts = await Cont.find({$and:[{age:{$gt:18},lastname : {$regex : "ah"}}]});
  
    //let maintest = contacts.count();

    // let pagelist = `<h2>age>18 and name containing "ah"</h2><table border='1'>
    // <tr><th>S/N</th> <th>LASTNAME</th> <th>FIRSTNAME</th> <th>EMAIL</th> <th>AGE</th></tr>
    // <tr><td>1</td> <td>${contacts.lastname}</td> <td>${contacts.firstname}</td> <td>${contacts.email}</td> <td>${contacts.age}</td></tr>
    // </table>`;  
   res.send(contacts);
 
    res.end();
 
  
});


//


//Change the contact's first name from"Kefi Seif" to "Kefi Anis".
router.get('/update',async(req,res)=>{
    
    const contacts = await Cont.find();
  
    //let maintest = contacts.count();

    
    let pagelist = `<h2>CONTACT LIST FOR UPDATE</h2><table border='1'>
    <tr><th>S/N</th> <th>LASTNAME</th> <th>FIRSTNAME</th> <th>EMAIL</th> <th>AGE</th> <th>UPDATE Profile</th></tr>
    <tr><td>1</td> <td>${contacts[0].lastname}</td> <td>${contacts[0].firstname}</td> <td>${contacts[0].email}</td> <td>${contacts[0].age}</td><td><a href="/update/${contacts[0]._id}">Update Profile</a></tr>
    <tr><td>2</td> <td>${contacts[1].lastname}</td> <td>${contacts[1].firstname}</td> <td>${contacts[1].email}</td> <td>${contacts[1].age}</td><td><a href="/update/${contacts[1]._id}">Update Profile</a></tr>
    <tr><td>3</td> <td>${contacts[2].lastname}</td> <td>${contacts[2].firstname}</td> <td>${contacts[2].email}</td> <td>${contacts[2].age}</td><td><a href="/update/${contacts[2]._id}">Update Profile</a></tr>
    <tr><td>4</td> <td>${contacts[3].lastname}</td> <td>${contacts[3].firstname}</td> <td>${contacts[3].email}</td> <td>${contacts[3].age}</td><td><a href="/update/${contacts[3]._id}">Update Profile</a></tr>
    <tr><td>5</td> <td>${contacts[4].lastname}</td> <td>${contacts[4].firstname}</td> <td>${contacts[4].email}</td> <td>${contacts[4].age}</td><td><a href="/update/${contacts[4]._id}">Update Profile</a></tr>
    </table>`;   
   res.send(pagelist);
 
    res.end();
 
  
});

//update form
router.get('/update/:id',async(req,res)=>{
    let uid= req.params.id
    const contacts = await Cont.findOne({_id:uid});

    let pagelist = `<h2>CONTACT DETAILS OF THIS ID:${uid} </h2><form method="post" action=""><table border='1'>
    <input type="hidden" name="id" value="${uid}" />
    <tr><td><label>Lastname</label></td> <td><input type="text" name="lastname" value="${contacts.lastname}"/></tr>
    <tr><td><label>Firsttname</label></td> <td><input type="text" name="firstname" value="${contacts.firstname}"/></tr>
    <tr><td><label>Email</label></td> <td><input type="text" disabled name="email" value="${contacts.email}"/></tr>
    <tr><td><label>Age</label></td> <td><input type="text"  name="age" value="${contacts.age}"/></tr>
    <tr><td><input type="submit" value="Update Now" name="submit"/></td><td><input type="reset" value="Clear" name="reset"/></td>
    </tr>
    </table></form>`; 

   res.send(pagelist);
})

//update profile in database
router.post('/update/:id',async(req,res)=>{
     let uid = req.params.id;
      let newname= req.body.firstname;
      console.log(newname);
    const contacts = await Cont.findOne({_id:uid});
    const doc = await Cont.findOneAndUpdate(
        { lastname: 'Kefi' },
        { firstname: newname },
        { new: true }
      );

      if(doc){
        res.send("Document Updated Successfully");
      }else{
        res.send("Document NOT Updated");
      }
      

   
})







module.exports = router;