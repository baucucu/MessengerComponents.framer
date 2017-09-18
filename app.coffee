# Requires
##########
IpzChatBot = require "ipz-chatbot"
data = require "ipz-data-providers"
utils = require "ipz-utils"
qs = require "ipz-querystring"



# Init view
#################
utils.init()
queryString = new qs.QueryString()
statusBarVisible = queryString.get("showStatusBar")

bot = new IpzChatBot
    showStatusBar: statusBarVisible is undefined || statusBarVisible == true    # TODO detect mobile
bot.gotoMain()



# Hook to Data
#################
# DB callback
gotUsers= (isError, usersString) ->
    loggedInUser = usersProvider.setLoggedInUser(usersString, "VodafoneRO")
    bot.setUser(loggedInUser)

# Get data
usersProvider = new data.UsersProvider
usersProvider.getUsers(gotUsers)



# Event handling
#################
gotUserFlow= (isError, flow) ->
    bot.runConversationFlow(bot, flow)

bot.on "ChatOpened", (user) ->  
    flowProvider = new data.FlowProvider
    flowProvider.getFlow(user.flow, gotUserFlow)  
    


if (queryString.get("showOverlay") == "true")
    overlay = new Layer
        width: Screen.width
        height: Screen.height
        image: "images/realScreens/yourDay1.png"
        opacity: 0.5