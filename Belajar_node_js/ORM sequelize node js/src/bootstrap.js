module.exports = async () => {
  const Tweet = require("./src/models/tweet");
  const User = require("./src/models/User");

  User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
  Tweet.belongsTo(User, { as: "Users", foreignKey: "userID" });

  const user = await User.create({ username: "abcd", password: "123" }).catch(err);
  const tweet = await Tweet.create({ content: "this is tes content aaa", userId: user.id }).catch(err);

  const users = await User.findAll({ where: { username: "abcd" }, include: [{ model: Tweet, as: "Tweets" }] });

  console.log("abcd tweets: ", users);
};
