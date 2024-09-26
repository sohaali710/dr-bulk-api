const { createClient } = require("redis");
const redisClient = createClient({
  socket: {
    reconnectStrategy: function (retries) {
      if (retries > 20) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated"
        );
        return new Error("Too many retries.");
      } else {
        return retries * 500;
      }
    },
  },
});

redisClient.on("error", (error) => console.error("Redis client error:", error));
(async () => {
  await redisClient.connect();
  console.log("Redis client connected");
})();

const getOrSetCache = async (key, query) => {
  try {
    const cachedData = await redisClient.get(key);

    if (cachedData != null) {
      return JSON.parse(cachedData);
    }

    const freshData = await query;
    redisClient.set(key, JSON.stringify(freshData), {
      EX: process.env.REDIS_EXPIRE_TIME,
    });
    return freshData;
  } catch (err) {
    throw err;
  }
};

module.exports = getOrSetCache;
