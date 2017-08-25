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

runBubbles = () ->
    setTimeout(appendSampleMessage, 1000, samples.botInfo, "ChatHeader")
    setTimeout(appendSampleMessage, 3000, "", "TypingIndicator")
    setTimeout(appendSampleMessage, 4000, samples.messageText2, "TextBubble")
    setTimeout(appendSampleMessage, 6000, samples.messageText2, "TextBubble")

    setTimeout(appendSampleMessage, 8000, samples.messageText1, "TextBubble")
    setTimeout(appendSampleMessage, 10000, samples.messageText1, "TextBubble")
    
    setTimeout(appendSampleMessage, 15000, "", "TypingIndicator")
    setTimeout(appendSampleMessage, 16000, samples.messageText2, "TextBubble")    
    setTimeout(appendSampleMessage, 18000, samples.messageText2, "TextBubble")
    setTimeout(appendSampleMessage, 21000, "", "TypingIndicator")
    setTimeout(appendSampleMessage, 22000, samples.messageText2, "TextBubble")
    
    # setTimeout(appendSampleMessage, 24000, samples.messageText1, "TextBubble")

runSample = () ->
    setTimeout(appendSampleMessage, 500, samples.botInfo, "ChatHeader")
    setTimeout(appendSampleMessage, 1000, samples.buttonsContent, "TextButtons")
    setTimeout(appendSampleMessage, 4000, samples.messageText1, "TextBubble")
    setTimeout(appendSampleMessage, 6000, samples.replies, "QuickReplies")
    setTimeout(appendSampleMessage, 8000, samples.location, "Location")
    setTimeout(appendSampleMessage, 10000, samples.carouselMessage, "Carousel")
    setTimeout(appendSampleMessage, 13000, "", "TypingIndicator")
    setTimeout(appendSampleMessage, 14000, samples.messageText2, "TextBubble")
    setTimeout(appendSampleMessage, 16000, samples.listMessage, "List")
    setTimeout(appendSampleMessage, 20000, samples.messageText1, "TextBubble")
    setTimeout(appendSampleMessage, 22000, samples.receiptSampleData, "Receipt")
    

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

