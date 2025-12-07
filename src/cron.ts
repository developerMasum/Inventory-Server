// import cron from "node-cron";
// import prisma from "./shared/prisma";

// // Schedule job to reset `isPaid` field at 12:00 am on the 1st of every month
// cron.schedule("0 0 1 * *", async () => {
//   try {
//     await prisma.room.updateMany({
//       data: { isPaid: false },
//     });
//     console.log(
//       "isPaid field reset to false for all rooms at 12:00 am on the 1st of the month"
//     );
//   } catch (error) {
//     console.error("Error resetting isPaid field:", error);
//   }
// });
