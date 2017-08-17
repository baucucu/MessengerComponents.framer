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


# Init view
#################
bot = new IpzChatBot({})
bot.gotoMain()


# Navigation events
#################
Screen.on "GotoMain", ->
    bot.gotoMain()

Screen.on "GotoChat", (user)->
    bot.gotoChat(user)

    bot.appendMessage("test")

Screen.on "GoBack", ->
    bot.goBack()


# DB callback
getUsers_Callback= (isError, usersString) ->
    if isError == true
        # TODO better error handling
        return null

    users = JSON.parse usersString
    myDays = usersDB.getMyDays(users)

    loggedInUser = users[0]
    loggedInUser.Carrier = "VodafoneRO"
    loggedInUser.Friends = users[1..20]
    loggedInUser.MyDays = myDays
    loggedInUser.HomeBadge = 5
    loggedInUser.PeopleBadge = 2

    bot.setUser(loggedInUser)

# Get data
usersDB = new usersModule
usersDB.getUsers({}, 20, "", "serialno", -1, getUsers_Callback)

