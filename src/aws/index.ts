import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

aws.config.update({
  region: "us-east-2",
  accessKeyId: "",
  secretAccessKey: "",
});

export const S3 = new aws.S3({});

export const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "bullseye-stage",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
