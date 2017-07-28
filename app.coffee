# Global settings
#################

Screen.backgroundColor = "white"



# Requires
##########

ui = require("messenger-kit")
usersModule = require ("ipz-dal-usersDAL")



# Users database
################

usersDB = new usersModule
users = usersDB.getUsers({},20, "", "serialno", -1)
activeUsers = usersDB.getUsers({status: "active"}, 20, "", "serialno", -1)



# Playground
############

# activeFriends = new ui.ActiveFriends

#avatar = new ui.Avatar({}, users[1])

#listItem = new ui.MessageListItem({y: 20}, users[12])


homeScreen = new ScrollComponent
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
	directionLock: true

lastMessages = new ui.MessageList({parent: homeScreen.content}, users[0..2])

activeFriends = new ui.ActiveFriends({parent: homeScreen.content, y: lastMessages.maxY + 11}, activeUsers)

otherMessages = new ui.MessageList({parent: homeScreen.content, y: activeFriends.maxY + 11}, users[3..20])

###
class MyDays extends Layer
	constructor: (options = {}, users) ->
		print user
class MyDay extends Layer
	constructor: (options = {}, user) ->
		print user
		
###		
		
		
		
