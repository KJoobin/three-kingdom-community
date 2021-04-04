// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Storage } from "@google-cloud/storage";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";


const serviceKey = "keys.json";

require("dotenv").config();

const Prisma = new PrismaClient();

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.PROJECT_ID,
});


const multerMid = multer({
  storage: multer.memoryStorage(),
});

const bucket = storage.bucket("three-kingdom");

function runMiddleware(req:NextApiRequest, res:NextApiResponse, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async (req:NextApiRequest, res:NextApiResponse) => {

  await runMiddleware(req, res, multerMid.single("file"));

  const { name } = req.query;
  const { originalname, buffer } = req.file;
  console.log({ name, originalname, buffer });

  if (!name) {
    res.status(404).json("not found");
    return ;
  }
  if (Array.isArray(name)) {
    res.status(400).json("unexpected type");
    return;
  }
  const blob = bucket.file(originalname.replace(/ /g, "_"));

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    const result = Prisma.warlord.update({
      data: {
        picture: publicUrl,
      },
      where: {
        name,
      },
    });
    result.then((res) => {
      console.log(res);
    }).catch((error) => {
      console.error(error);
    });
    res.status(200).json(publicUrl);
  })
    .on("error", (error) => {
      console.log(error);
      res.status(400).json("Unable to upload image, something went wrong");
    }).end(buffer);
  res.status(200);

};
