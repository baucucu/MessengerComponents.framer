# Requires
##########
IpzChatBot = require "ipz-chatbot"
data = require "ipz-data-providers"
utils = require "ipz-utils"



# Init view
#################
utils.init()

bot = new IpzChatBot
    showStatusBar: false    # TODO detect mobile
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
    