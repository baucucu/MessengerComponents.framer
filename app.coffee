# Requires
##########
ios = require "ios-kit"
usersModule = require "ipz-dal-usersDAL"
IpzChatBot = require "ipz-chatbot"
samples = require "chatSamples"



# Global settings
#################
Screen.backgroundColor = "white"
Framer.Defaults.Layer.force2d = true
ios.device.name = "iphone-6s"
ios.device.height = Screen.height
ios.device.width = Screen.width
ios.device.scale = 1



# Init view
#################
bot = new IpzChatBot({})
bot.gotoMain()



# SAMPLE
#################
bot.on "ChatOpened", (user) ->
    # TODO: we can get a different flow by user from the db
    bot.runConversationFlow(bot, samples.Vodafone1)



# Hook to Data
#################
# DB callback
gotUsers= (isError, usersString) ->
    # TODO better error handling
    if isError == true        
        return null

    loggedInUser = usersDB.setLoggedInUser(usersString, "VodafoneRO")
    bot.setUser(loggedInUser)

# Get data
usersDB = new usersModule
usersDB.getUsers({}, 20, "", "serialno", -1, gotUsers)

