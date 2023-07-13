const express = require("express");
const { auth } = require("../middleware/auth.moddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/user.model");
const blog = express.Router();

blog.get("/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await BlogModel.find({ userID: req.params.id });
    // const data = await BlogModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(501).send({ error: "failed to fetch the data" });
  }
});

// routes for getting all created blogs of a particular user
blog.get("/ad/:id", auth, async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await BlogModel.findOne({ _id: req.params.id });
    if (data.userID === req.body.userID) {
      res.status(200).send(data);
    } else {
      res.status(401).send({ Error: "You are not authorized" });
    }
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
});

// routes for creating a blog by a particular user with autosave feature
blog.post("/add", auth, async (req, res) => {
  const apple = await BlogModel.findOne({
    userID: req.body.userID,
    title: req.body.title,
  });

  try {
    if (apple) {
      await BlogModel.findByIdAndUpdate({ _id: apple._id }, req.body);
      res.status(201).send("Autosave is working");
    } else {
      const data = new BlogModel(req.body);
      await data.save();
      res.status(201).send({ success: "blog has been added" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({ error: error.message });
  }
});

//routes for editing a blog by a particular user
blog.patch("/edit/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BlogModel.findOne({ _id: id });
    //console.log(data)
    if (data.userID === req.body.userID) {
      await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ Success: "Notes has been updated" });
    } else {
      res
        .status(401)
        .send({ Error: "you are not authorized to update this note" });
    }
  } catch (error) {
    res.status(404).send({ error: "failed to update the Note" });
  }
});

//routes for delete a blog by a particular user
blog.delete("/delete/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await BlogModel.findOne({ _id: id });
    // console.log(data)
    if (data.userID === req.body.userID) {
      await BlogModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ success: "Note has been deleted" });
    } else {
      res
        .status(401)
        .send({ Error: "you are not authorized to delete this note" });
    }
  } catch (error) {
    res.status(501).send({ error: "failed to delete the Note" });
  }
});

module.exports = {
  blog,
};
