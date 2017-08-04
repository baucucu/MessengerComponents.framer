# Requires
##########
ios = require "ios-kit"
usersModule = require "ipz-dal-usersDAL"
IpzChatBot = require "ipz-chatbot"


# Global settings
#################
Screen.backgroundColor = "white"
Framer.Defaults.Layer.force2d = true
ios.device.name = "iphone-6s"
ios.device.scale = 1

# Users database
################

usersDB = new usersModule
users = usersDB.getUsers({}, 20, "", "serialno", -1)
activeUsers = usersDB.getActiveUsers(users)

loggedInUser = users[0]
loggedInUser.Friends = users[1..20]
loggedInUser.ActiveFriends = activeUsers
loggedInUser.Carrier = "VodafoneRO"

bot = new IpzChatBot(loggedInUser)
bot.showNext("Main")


