import * as AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY, 
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadToS3 = async(file, userid, folderName) => {
    const { filename, createReadStream } = await file;
    const objectName = `${folderName}/${userid}-${Date.now()}-${file}`;
    const readStream = createReadStream();
    const { Location } = await new AWS.S3()
    .upload({
      Bucket: "woori-instaclone-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
    return Location;
};
