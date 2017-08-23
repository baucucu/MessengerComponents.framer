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

appendSampleMessage = (message, messageType) ->
    bot.appendMessage(message, messageType)

runSample = () ->
    setTimeout(appendSampleMessage, 500, samples.botInfo, "ChatHeader")
    setTimeout(appendSampleMessage, 1500, samples.messageText1, "TextBubble")
    setTimeout(appendSampleMessage, 2500, samples.messageText2, "TextBubble")
    setTimeout(appendSampleMessage, 3500, samples.replies, "QuickReplies")
    setTimeout(appendSampleMessage, 4500, samples.buttonsContent, "TextButtons")
    setTimeout(appendSampleMessage, 5500, samples.carouselMessage, "Carousel")
    setTimeout(appendSampleMessage, 6500, samples.listMessage, "List")
    setTimeout(appendSampleMessage, 7500, samples.location, "Location")
    setTimeout(appendSampleMessage, 8500, samples.receiptSampleData, "Receipt")


# Navigation events
#################
Screen.on "GotoMain", ->
    bot.gotoMain()

Screen.on "GotoChat", (user)->
    bot.gotoChat(user)
    runSample()

Screen.on "SendMessage", (message) ->
    userMessage = { text: message, sender: "user" }
    bot.appendMessage(userMessage, "TextBubble")

Screen.on "GoBack", ->
    bot.goBack()



# Hook to Data
#################

# DB callback
getUsers_Callback= (isError, usersString) ->
    if isError == true
        # TODO better error handling
        return null

    users = JSON.parse usersString
    myDays = usersDB.getMyDays(users)
    unreadMessageCount = usersDB.getUnreadCount(users)

    loggedInUser = users[0]
    loggedInUser.Carrier = "VodafoneRO"
    loggedInUser.Friends = users[1..20]
    loggedInUser.MyDays = myDays
    loggedInUser.HomeBadge = unreadMessageCount

    bot.setUser(loggedInUser)

# Get data
usersDB = new usersModule
usersDB.getUsers({}, 20, "", "serialno", -1, getUsers_Callback)

