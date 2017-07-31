# Global settings
#################

Screen.backgroundColor = "white"



# Requires
##########

ios = require "ios-kit"
MasterLayout = require "ipz-master-layout"

ui = require("messenger-kit")
usersModule = require ("ipz-dal-usersDAL")
{dpr} = require 'DevicePixelRatio'


# Users database
################

usersDB = new usersModule
users = usersDB.getUsers({},20, "", "serialno", -1)
activeUsers = usersDB.getUsers({status: "active"}, 20, "", "serialno", -1)


# Playground
############

# activeFriends = new ui.ActiveFriends

#avatar = new ui.Avatar({}, users[1])


homeScreen = new ScrollComponent
	y: 20
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false


myDays = new ui.MyDays({parent: homeScreen.content}, activeUsers)

lastMessages = new ui.MessageList({parent: homeScreen.content, y: myDays.maxY}, users[0..2])

activeFriends = new ui.ActiveFriends({parent: homeScreen.content, y: lastMessages.maxY + ui.style.margin}, activeUsers)

otherMessages = new ui.MessageList({parent: homeScreen.content, y: activeFriends.maxY + ui.style.margin}, users[3..20])


masterLayout = new MasterLayout
messenger = masterLayout.openApp("Messenger")
messenger.login(users[0])
