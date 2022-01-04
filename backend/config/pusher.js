const Pusher = require("pusher");
const _ = require("lodash");
const moment = require("moment");

const asyncDispatchMessages = async (
  data = [],
  startMessage = "",
  endMessage = "",
  processDelay = 1000
) => {
  const delay = (time) => new Promise((r) => setTimeout(r, time));

  const maxJobs = process.env.MAX_JOBS;
  let jobQueue = data;

  const jobProcessor = async function () {
    while (jobQueue.length > 0) {
      const job = jobQueue.pop();
      const callback = job;
      callback(moment().format("DD/MM/YYYY HH:ss"));
      await delay(processDelay);
    }
    return;
  };

  (async () => {
    const start = moment();
    console.warn(startMessage + " at: ", new Date());
    await Promise.all([...Array(maxJobs).keys()].map((e) => jobProcessor()));
    const end = moment();
    console.warn(
      endMessage + " in: ",
      end.subtract(start).seconds() + " seconds"
    );
  })();
};

module.exports = {
  pusher: new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  }),
  asyncDispatchMessages,
};
