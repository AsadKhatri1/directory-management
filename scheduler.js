// scheduler.js
import cron from "node-cron";
import { residentModel } from "./models/residentModel.js";

// Schedule a job to run every day at midnight
cron.schedule("0 * * * *", async () => {
  console.log("Cron job running at midnight");
  try {
    const now = new Date();
    console.log(`Current date: ${now.toISOString()}`);
    // Find all residents whose paidExpiry date is before the current date and set paid to false
    const result = await residentModel.updateMany(
      { paid: true, paidExpiry: { $lt: now } },
      { $set: { paid: false, paidExpiry: null } }
    );

    console.log(
      `${result.modifiedCount} residents' payment status updated to false.`
    );
  } catch (err) {
    console.error("Error updating residents payment status:", err);
  }
});
