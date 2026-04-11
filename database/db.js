import mongoose from "mongoose";
import { residentModel } from "../models/residentModel.js";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
      console.log("DB connected successfully");

      const result = await residentModel.updateMany(
        {
          $or: [
            { propertyType: { $exists: false } },
            { propertyType: null },
            { propertyType: "" },
          ],
        },
        { $set: { propertyType: "house" } }
      );

      if (result.modifiedCount > 0) {
        console.log(
          `Backfilled propertyType=house for ${result.modifiedCount} residents`
        );
      }
    })
    .catch((err) => console.log(err));
};
