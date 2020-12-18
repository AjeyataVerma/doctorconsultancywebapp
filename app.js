const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var flash = require('express-flash')
const app = express();

app.set('view-engine', 'ejs')
app.use(express.urlencoded({
  extended: false
}))
app.use(express.static(__dirname + '/public'));

// db connections
mongoose.connect("mongodb+srv://admin-ajeyata:Ajeyata@05@cluster0.n1dg8.mongodb.net/patientsDB", {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});
// mongoose.connect('mongodb://localhost:27017/patientsDB', {useNewUrlParser: true});


// schemas
const userSchema = {
  name: String,
  email: String,
  password: String
};
const doctorSchema = new mongoose.Schema({
  doctorID: Number,
  name: String,
  experience: String,
  specialization: String,
  degree: String,
  address: String,
  phoneNo: Number,
  fees: Number,
  openDays: String,
  openTime: String,
  password: Number
});
const appointmentSchema = new mongoose.Schema({
  email: String,
  doctorID: Number,
  patientName: String,
  contact: Number,
  date: Date,
  time: String,
  status: String
});


// models
const User = mongoose.model("User", userSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

// default list of doctors
const doc1 = new Doctor({
  doctorID: 101,
  name: "Dr. Ankita Jindal",
  experience: "12 years ",
  specialization: "Periodontist,Dentist",
  degree: "MDS - Periodontics, BDS",
  address: "Plot No 16, Zone 1, MP Nagar, Bhopal",
  phoneNo: 1234567890,
  fees: 200,
  openDays: "Mon-Sat",
  openTime: "11:00am - 2:00pm and 6:00pm - 9:00pm",
  password: 123
});
const doc2 = new Doctor({
  doctorID: 102,
  name: "Dr. Ankit Jindal",
  experience: "5 years",
  specialization: "Periodontist,Dentist",
  degree: "MDS - Periodontics, BDS",
  address: "Plot No 16, Zone 1, MP Nagar, Bhopal",
  phoneNo: 1234567890,
  fees: 200,
  openDays: "Mon-Sat",
  openTime: "11:00am - 2:00pm and 6:00pm - 9:00pm",
  password: 123
});
const doc3 = new Doctor({
  doctorID: 103,
  name: "Dr. Surendra Kumar",
  experience: "15 years",
  specialization: "Homeopathy",
  degree: "MBBS, D Ortho, DNB",
  address: "347, Mandakini Society, Mandakini Colony, Landmark: Shree Vinayak Hospital, Bhopal",
  phoneNo: 4528283789,
  fees: 400,
  openDays: "Mon-Sat",
  openTime: "10:00am - 02:00pm and 04:00pm - 08:00pm",
  password: 123
});
const doc4 = new Doctor({
  doctorID: 104,
  name: "Dr. Prakhar Gupta",
  experience: "4 years",
  specialization: "General Physician, Consultant Physician",
  degree: "MBBS, MD - General Medicine",
  address: "347, Kamal Society, Mandakini Colony, Bhopal",
  phoneNo: 9875642895,
  fees: 250,
  openDays: "Mon-Fri",
  openTime: "10:30am - 02:00pm and 04:00pm - 07:30pm",
  password: 123
});
const doc5 = new Doctor({
  doctorID: 105,
  name: "Dr. Anil Philip",
  experience: "20 years",
  specialization: "Homoeopath",
  degree: "DHMS (Diploma in Homeopathic Medicine and Surgery)",
  address: "153- A, Durgesh Vihar J.K Road, Bhopal",
  phoneNo: 7586645289,
  fees: 350,
  openDays: "Mon-Sat",
  openTime: "08:00 am - 09:00 am and 06:00 pm - 08:30 pm",
  password: 123
});
const doc6 = new Doctor({
  doctorID: 106,
  name: "Dr. P.P. Chowdhary",
  experience: "33 years",
  specialization: "General Physician",
  degree: "MBBS",
  address: "Ground Floor, Ganpati Apartment, Phase-1, Sarvadharam Colony, Sector-B, Bhopal",
  phoneNo: 8546945289,
  fees: 350,
  openDays: "Mon-Sat",
  openTime: "09:00 am - 09:00 am and 06:00 pm - 08:30 pm",
  password: 123
});
const doc7 = new Doctor({
  doctorID: 107,
  name: "Dr. Prabhu Agarwal",
  experience: "15 years",
  specialization: "Ophthalmologist/ Eye Surgeon",
  degree: "MBBS, MD - Ophthalmology, DNB - Ophthalmology, FRCS - Ophthalmology (Edin)",
  address: "Plot Number 131/14, Zone 2, Landmark: Near Pragati Petrol Pump, Near Vodafone Mobile Store, Bhopal",
  phoneNo: 9446945289,
  fees: 400,
  openDays: "Mon-Thu",
  openTime: "02:00 pm - 05:30 pm",
  password: 123
});
const doc8 = new Doctor({
  doctorID: 108,
  name: "Dr. Vivek Kumar",
  experience: "10 years",
  specialization: "Physiotherapist",
  degree: "BPTh/BPT",
  address: "E 1, Mandakani Colony, 80 Feet Road, Bhopal",
  phoneNo: 9446945289,
  fees: 400,
  openDays: "Mon-Sat",
  openTime: "10:00 am - 12:00 am and 02:00 pm - 06:30 pm",
  password: 123
});
const doc9 = new Doctor({
  doctorID: 109,
  name: "Dr. Sachin Maravi",
  experience: "13 years",
  specialization: "Pediatrician",
  degree: "MBBS, MD - Pediatrics",
  address: "Building Number 136, C- Sector, Bhopal",
  phoneNo: 9547315289,
  fees: 550,
  openDays: "Mon-Sat",
  openTime: "05:00 pm - 08:30 pm",
  password: 123
});
const doc10 = new Doctor({
  doctorID: 110,
  name: "Dr. Shashi Prabhu",
  experience: "28 years",
  specialization: "Obstetrician, Gynecologist",
  degree: "MBBS, DGO",
  address: "D1/2, Punjabi Bagh, Raisen Road, Bhopal",
  phoneNo: 9446945289,
  fees: 500,
  openDays: "Mon-Sat",
  openTime: "11:00 am - 02:00 pm and 05:00 pm - 08:30 pm",
  password: 123
});
const defaultItems = [doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10];


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/home.html")
});

app.get("/register", function(req, res) {
  res.render('register.ejs')
})

app.post("/register",async function(req, res) {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.pass, salt);
      
const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
   
  

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render('login.ejs')
    }
  })
})

app.get("/login", function(req, res) {
  // res.sendFile(__dirname + "/signin.html")
  res.render('login.ejs')
})

let aemail;
let aid;
app.post("/login", function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}, async function(err, foundUser) {
    if (err) {
      console.log(err);
    } 
      else {
      if (foundUser) {
          console.log(foundUser.password);
          console.log(password);
        
              if(await bcrypt.compare(password,foundUser.password)){
          aemail = email;
                  
          Doctor.find({}, function(err, foundDr) {
            if (foundDr.length === 0) {
              Doctor.insertMany(defaultItems, function(err) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("added to db");
                }
              })
              res.redirect("/doctors")
            } else {
              res.render('doc.ejs', { newListItems: foundDr})
            }
          })
                  
        }else{
           req.flash('error',"incorrect password");
            res.redirect('/login');
        }
          
          
      }
      else{
           req.flash('error',"incorrect credentials"); 
          res.redirect('/login');
      }
    }
  })
})
app.get("/doctors", function(req, res) {

  Doctor.find({}, function(err, foundDr) {
    if (foundDr.length === 0) {
      Doctor.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("added to db");
        }
      })
      res.redirect("/doctors")
    } else {
      res.render('doc.ejs', {
        newListItems: foundDr
      })
    }
  })
});
app.post("/doctors", function(req, res) {
  let searchItem = req.body.search;

  Doctor.find({name: searchItem}, function(err, searchDr) {
    if (err) {
      console.log(err);
    } else {
      res.render("doc.ejs", {newListItems: searchDr});
    }
  })

})
app.get("/appointment", function(req, res) {
  res.sendFile(__dirname + "/app.html")
})
app.post("/appointment", function(req, res) {
  const newApp = new Appointment({
    // email: req.body.email,
    email: aemail,
    doctorID: req.body.docId,
    patientName: req.body.pName,
    contact: req.body.contact,
    date: req.body.date,
    time: req.body.time,
    status: "pending"
  });
  newApp.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.sendFile(__dirname + "/app.html")
    }
  })
})

app.get("/viewappointment", function(req, res) {

  Appointment.find({email: aemail}, function(err, foundApp) {
    if (err) {
      console.log(err);
    } else {
      res.render("view.ejs", {
        apps: foundApp
      });
    }
  })
})

app.post("/delete", function(req, res) {
  const deleteappId = req.body.deleteapp;
  Appointment.findByIdAndRemove(deleteappId, function(err) {
    if (!err) {
      console.log("appointment deleted");
      res.redirect("/viewappointment")
    }
  })
})

app.get("/doctorlogin", function(req, res) {
  // res.sendFile(__dirname + "/signin.html")
  res.render('doctorlogin.ejs')
})
app.post("/doctorlogin", function(req, res) {
      const doctorID = req.body.doctorID;
      const password = req.body.password;
      console.log(doctorID);
      aid = doctorID;
      // res.sendFile(__dirname + "/doctor-side.html")
      // res.redirect('/doctorside')
      Doctor.findOne({doctorID: doctorID}, function(err, foundUser){
        if(err){
          console.log(err);
        } else{
          if(foundUser){
            if(foundUser.password == password){
              res.redirect('/doctorside')

            }else{

              res.redirect("/doctorlogin")
            }
          }
        }
      })
})
app.get("/doctorside", function(req, res) {
    Appointment.find({doctorID: aid}, function(err, foundApp) {
          if (err) {
            console.log(err);
          } else {
            res.render("doctor-side.ejs", {apps: foundApp});
          }
        })
        // res.render('doctor-side.ejs')

      })
      app.post("/docdeny", function(req, res) {
        const denyappId = req.body.denyapp;
        Appointment.findByIdAndUpdate(denyappId, {
          status: "denied"
        }, function(err) {
          if (!err) {
            console.log("appointment deleted");
            res.redirect("/doctorside")
          }
        })
      })
      app.post("/docapprove", function(req, res) {
        const approveappId = req.body.acceptapp;
        Appointment.findByIdAndUpdate(approveappId, {
          status: "approved"
        }, function(err) {
          if (!err) {
            console.log("appointment approved");
            res.redirect("/doctorside")
          }
        })
      })

      app.post("/", function(req, res) {
        res.redirect("/");
      })

      app.post("/login", function(req, res) {
        res.redirect("/");
      })

      app.post("/register", function(req, res) {
        res.redirect("/");
      })

      // app.get("/about", function(req,res){
      //   res.send("<h1>thus is ajeyata verma</h1>")
      // });
      // app.get("/contact", function(req,res){
      //   res.send("<h1>contact me</h1>")
      // });

        let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

      app.listen(port, function() {
        console.log("server has started successfully");
      });
