import hostelApplicationModel from "../models/applicationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY="SECURITYKEY";
export const getApplication = async (req, res) => {
  try {
    const hostelApplications = await hostelApplicationModel.find();
    res.json(hostelApplications);
  } catch (error) {
    console.log("Not found any data.");
  }
};
export const getApplicationById = async (req, res) => {
  try {
    const user = await hostelApplicationModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const updateApplication = async (req, res) => {
  const user = req.body;
    const edituser = new hostelApplicationModel(user);
    try {
        await hostelApplicationModel.updateOne({ _id : req.params.id }, edituser);
        res.status(200).send(edituser);
    } catch (err) {
        res.status(500).send(err);
    }
};


export const deleteApplication = async (req, res) => {
  console.log("Delete is working");
  const newid = req.params.id;
  console.log(newid);
  try {
    await hostelApplicationModel.findByIdAndRemove(newid);
    res.json("deleted");
  } catch (error) {
    console.log("Error during deleting .... ");
  }
};


export const postApplication = async (req, res) => {
  const result = req.body;
 
  const {FullName,Username,Email,Password,PhoneNumber}=req.body;
  console.log(result);
  let existingUser;
  try {
    existingUser = await hostelApplicationModel.findOne({ Email: Email });
  } catch (err) {
    console.log("errors");
  }
  if (existingUser) {
    return console.log("exist");
  }
  const hashPassword = bcrypt.hashSync(Password, 2);
  const newApplicant = new hostelApplicationModel(
    {
      FullName,
      Username,
      Email,
      Password:hashPassword,
      PhoneNumber
    });
  try {
    await newApplicant.save();
    res.json(newApplicant);
  } catch (error) {
    console.log("Not saved...");
  }
};

export const Login= async (req, res) => {
  try {
    const { user, pass } = req.body;
    console.log(user);
    const userlogin = await hostelApplicationModel.findOne({ Username: user });
    if (userlogin) {
      // console.log("loged in successfully");
      const isMatch = await bcrypt.compare(pass, userlogin.Password);
      // const token= await userlogin.generateAuthToken();

      try {
        var token = jwt.sign({ _id: userlogin._id }, JWT_SECRET_KEY, {
          expiresIn: "35s",
        });
      } catch (error) {
        console.log("token not generated");
        console.log(error);
      }
      console.log(token);
      // res.cookie("jwToken",token)
      res.cookie("jwToken", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: "lax",
      });
      if (isMatch) {
        console.log("loged in successfully");
        res.send("200");
        //return res.status(200).json({message:"login successfully"})
      } else {
        console.log(" console Invalid credentials pass");
        // return res.status(404).json({error:"Invalid credentials pass"});
        res.send("404");
      }
    } else {
      console.log("Invalid credentials mail");
      // return res.status(400).json({error:"Invalid credentials pass"});
      res.send("404");
      // return res.status(404).json({error:"Invalid credentials mail"});
    }
  } catch (error) {
    console.log("not login");
    console.log(error);
  }
};
  



export const verifiedToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  console.log(token);
  if (!token) {
    res.status(404).json({ message: "No Token Found" });
  }
  jwt.verify(String(token), jwt_secretKey, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};


