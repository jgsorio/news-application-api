import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import { config } from "dotenv";
config();

const s3: S3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

const storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export default storage
