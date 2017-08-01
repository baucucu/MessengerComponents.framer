# Requires
##########

ios = require "ios-kit"
MasterLayout = require "ipz-master-layout"
Screen.backgroundColor = "white"

# ui = require "messenger-kit"
usersModule = require "ipz-dal-usersDAL"

Framer.Defaults.Layer.force2d = true
ios.device.name = "iphone-6s"
ios.device.scale = 1

# Global settings
#################



# Users database
################

usersDB = new usersModule
users = usersDB.getUsers({}, 20, "", "serialno", -1)
activeUsers = usersDB.getUsers({status: "active"}, 20, "", "serialno", -1)


# Playground
############

# activeFriends = new ui.ActiveFriends

#avatar = new ui.Avatar({}, users[1])


# homeScreen = new ScrollComponent
# 	y: 20
# 	width: Screen.width
# 	height: Screen.height
# 	scrollHorizontal: false
# 
# 
# myDays = new ui.MyDays({parent: homeScreen.content}, activeUsers)
# 
# lastMessages = new ui.MessageList({parent: homeScreen.content, y: myDays.maxY}, users[0..2])
# 
# activeFriends = new ui.ActiveFriends({parent: homeScreen.content, y: lastMessages.maxY + ui.style.margin}, activeUsers)
# 
# otherMessages = new ui.MessageList({parent: homeScreen.content, y: activeFriends.maxY + ui.style.margin}, users[3..20])


# Master Layout
masterLayout = new MasterLayout
messenger = masterLayout.openApp("Messenger")
messenger.login(users[0])

# # Single line clipping 
# paragraph = new TextLayer
#     truncate: true
#     width: 150
#     height: 20
#     fontSize: 14
#     text:
#         """
#         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
#         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
#         """