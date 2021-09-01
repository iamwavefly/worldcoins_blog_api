// import packages
import aws from "aws-sdk";
import fs from "fs";
// -- models
import postSchema from "../models/Post.js";
// routes controlles
export const createPost = async (req, res) => {
  // aws config
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
  });
  const s3 = new aws.S3();
  var params = {
    ACL: "public-read",
    Bucket: process.env.BUCKET_NAME,
    Body: fs.createReadStream(req.file.path),
    Key: `blog/assets/images/${req.file.originalname}`,
  };
  // upload image to aws
  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error occured while trying to upload to S3 bucket", err);
    }
    // check for res
    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      const locationUrl = data.Location;
      // save user to db
      let newUser = new postSchema({ ...req.body, thumbnail: locationUrl });
      newUser
        .save()
        .then((user) => {
          res.json({ message: "User created successfully", user });
        })
        .catch((error) => {
          res.json({ message: error });
        });
    }
  });
};
// find post

// delete post
export const deletePost = (req, res) => {
  const { id } = req.params;
  try {
    postSchema.findByIdAndDelete(id, (err) => {
      if (err) return res.json({ err });
      res.json({ message: "post deleted" });
    });
  } catch (error) {
    res.json({ message: error });
  }
};
