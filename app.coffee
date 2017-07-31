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

###
homeScreen = new ScrollComponent
	y: 20
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false


myDays = new ui.MyDays({parent: homeScreen.content}, activeUsers)

lastMessages = new ui.MessageList({parent: homeScreen.content, y: myDays.maxY}, users[0..2])

activeFriends = new ui.ActiveFriends({parent: homeScreen.content, y: lastMessages.maxY + ui.style.margin}, activeUsers)

otherMessages = new ui.MessageList({parent: homeScreen.content, y: activeFriends.maxY + ui.style.margin}, users[3..20])
###


callsScreen = new ScrollComponent
	y: 20
	width: Screen.width - ui.style.margins
	height: Screen.height
	scrollHorizontal: false
	x: Align.center

newCall = new Layer
	parent: callsScreen.content
	width: callsScreen.width
	height: 50 + ui.style.margins
	backgroundColor: "transparent"

newCallLabel = new TextLayer
	parent: newCall
	text: "New Call"
	x: Align.left
	y: Align.center
	fontSize: 17
	fontWeight: "medium"

callButtons = new Layer
	parent: newCall
	width: 150
	height: 50
	x: callButtonGroupx = Align.right
	y: Align.center
callButtonGroup = new Layer
	parent: callButtons
	width: 50
	height: 50
	x: Align.left
callButtonsPhone = 	new Layer
	parent: callButtons
	width: 50
	height: 50
	x: Align.center
callButtonVideo = 	new Layer
	parent: callButtons
	width: 50
	height: 50
	x: Align.right

recentCallsList = new Layer
	parent: callsScreen.content
	y: newCall.maxY
	height: 50
	width: Screen.width - ui.style.margins
recentCallsLabel = new TextLayer
	parent: recentCallsList
	x: Align.left
	y: Align.center
	text: "Recent"
	fontSize: 15
	fontWeight: "bold"
seeAllButton = new TextLayer
	parent: recentCallsList
	x: Align.right
	y: Align.center
	text: "See All"
	fontSize: 15
	color: "blue"

