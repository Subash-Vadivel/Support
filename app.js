


const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const Users = require('./models/Users');
const con = require("./connection");
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
require('./db');
app.post('/register',async(req,res)=>{

    try {
        const { 
            Name,
            Password,
            Email,
            DOB,
            Phone
         } = req.body;
        // console.log(req.body);
         const count = await Users.countDocuments({email: Email});         
         if(count>0)
         {
            
        res.status(200).json({
            text:"alredyExist"
        })
              
         }
         else
         {
            const values = [[Password,Email]];
            const i="#".concat(Name,Phone.substring(0,4));
         const newUser = new Users({
            email:Email,
            DOB,
            phone:Phone,
            name:Name,
            id:i
        });
        const savedUser = await newUser.save();
        
        await con.query(
            "insert into Users (pass,email) values ?",
            [values],
            (error, results, fields) => {
              if (error) console.log(error);
              else {          
                res.status(200).json({
                text:"success",
                uid:Email
        })
              }
            }
          );
        
        
        
    }

         
    }catch(err)
    {
         console.log(err);
    }

})

app.post("/profile", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await Users.findOne({ email:email });

    if (result) {
      res.status(200).json({
        email: result.email,
        DOB: result.DOB,
        phone: result.phone,
        name: result.name,
        id: result.id,
        from: "MongoDB",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/update", async (req, res) => {
  try {
    const { Email,DOB,Name,Phone } = req.body;
   const update={email:Email,name:Name,DOB,phone:Phone}
    const result = await Users.updateOne({ email:Email },update);
    const re = await Users.findOne({ email:Email });

    if (re) {
      res.status(200).json({
        email: re.email,
        DOB: re.DOB,
        phone: re.phone,
        name: re.name,
        id: re.id,
        from: "MongoDB",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(5000, () => {
    console.log("Listening...");
});
