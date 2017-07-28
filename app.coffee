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
	y: 20

myDays = new ui.MyDays({parent: homeScreen.content}, users)


lastMessages = new ui.MessageList({parent: homeScreen.content, y: myDays.maxY}, users[0..2])

activeFriends = new ui.ActiveFriends({parent: homeScreen.content, y: lastMessages.maxY + ui.style.margin}, activeUsers)

otherMessages = new ui.MessageList({parent: homeScreen.content, y: activeFriends.maxY + ui.style.margin}, users[3..20])


		
		
