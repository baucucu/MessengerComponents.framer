# Global settings

style =
	margin: 11
	margins: 22
	fontSizes:
		name: 17
		messageText: 16
		messageTime: 15
	fontWeights: []

exports.style = style

# Avatar

class Avatar extends Layer

	constructor: (options = {}) ->
		options.name ?= "Avatar"
		options.scale ?= 1
		options.width = options.height = 50 * options.scale
		options.backgroundColor = "#EEEEEE"
		options.borderRadius = 100

		options.image ?= "images/meIconActive.png"	#user.image_0
		options.status ?= "inactive" 				#user.status

		super options


		sign = new Layer
			name: "statusBadge"
			parent: @
			x: Align.right
			y: Align.bottom
			width: 28/100 * @.width
			height: 28/100 * @.height
			borderRadius: 100
			backgroundColor: "transparent"
			borderWidth: 2 * options.scale

		sign.states =
			inactive:
				borderWidth: 0
				backgroundColor: "transparent"
				image: null
			active:
				image: null
				backgroundColor: "#60CA11"
				borderColor: "#FFFFFF"
			messenger:
				borderColor: "#FFFFFF"
				image: "images/messengerIcon.png"
			myDay:
				borderColor: "#FFFFFF"
				borderWidth: options.scale * 2
				image: null
				backgroundColor: "#0076FF"

		@.subLayers[0].animate(options.status)

	setUser: (user) ->
		@.image = user.image_0
		@.subLayers[0].animate(user.status)

	changeStatus: (type) =>
		@.subLayers[0].animate(type)


exports.Avatar = Avatar


# MyDay

# MyDays

class MyDays extends ScrollComponent

	constructor: (options = {}, users) ->
		options.name ?= "MyDays"
		options.scale ?= 1
		options.x = Align.center
		options.width = Screen.width - style.margins
		options.height = options.scale * (125 + style.margins)
		options.scrollVertical = false
		options.directionLock = true

		super options

		for user, index in users
			myDay = new Avatar({})
			myDay.parent = @.content
			myDay.width = 90
			myDay.height = 125
			myDay.x = index * (myDay.width + style.margin/2)
			myDay.y = Align.center
			myDay.borderRadius = 5
			myDay.subLayers[0].width = myDay.subLayers[0].height = 14
			myDay.subLayers[0].y = Align.top(-4)
			myDay.subLayers[0].x = Align.right(4)

			myDay.changeStatus("myDay")
			myDay.setUser(user)

exports.MyDays = MyDays


# Message List Item

class MessageListItem extends Layer
	@user = undefined

	constructor: (options = {}, user) ->
		options.name ?= "MessageListItem"
		options.scale ?= 1
		options.x = Align.center
		options.width = Screen.width - style.margins
		options.height = 74 * options.scale
		options.backgroundColor = "transparent"
		options.clip = true

		super options

		@user = user

		avatar = new Avatar({parent: @, y: style.margin * options.scale })
		avatar.setUser(user)
		avatar.changeStatus(user.status)

		name = new TextLayer
			name: "name"
			parent: @
			x: avatar.maxX + options.scale * 20
			y: avatar.y
			lineHeight: 1.5
			text: user.firstname + " " + user.lastname
			fontSize: 17 * options.scale


		lastMessage = new TextLayer
			name: "lastMessage"
			parent: @
			x: name.x
			y: name.maxY
			lineHeight: 1.5
			width: @.width - avatar.width - 8
			height: 19
			text: user.messageText
			fontSize: 16 * options.scale
			truncate: "true"


		lastMessageTime = new TextLayer
			name: "lastMessageTime"
			parent: @
			x: Align.right
			y: name.y
			fontSize: 15 * options.scale
			text: user.messageTime

		if user.unread is true
			lastMessage.fontWeight = 500
			lastMessage.color = "#000000"
			name.fontWeight = 500
			name.color = "#000000"
			lastMessageTime.fontWeight = 500
			lastMessageTime.color = "#000000"

exports.MessageListItem = MessageListItem


# Message List

class MessageList extends Layer
	constructor: (options = {}, users) ->
		options.name ?= "MessageList"
		options.scale ?= 1
		options.width = Screen.width - style.margins
		options.x = Align.center
		options.backgroundColor = "transparent"
		options.height = users.length * 74 * options.scale
		super options

		for user, index in users
			message = new MessageListItem({parent: @, y: options.scale * index * 74}, user)

			message.on Events.Tap, ->
				Screen.emit "GotoChat", @.user

exports.MessageList = MessageList

# Active users

class ActiveFriendsScrollList extends ScrollComponent
	constructor: (options = {}, users) ->
		options.scale ?= 1
		options.width = Screen.width - style.margins
		options.height = options.scale * 100
		options.scrollVertical = false

		super options


		@.content.height = null

		for user, index in users
			container = new Layer
				parent: @.content
				x: index * (50 + style.margin)
				width: 50
				backgroundColor: "transparent"
			avatar = new Avatar({parent: container})
			name = new TextLayer
				parent: container
				text: user.firstname
				fontSize: 14 * options.scale
				y: avatar.maxY + 5
			container.width = avatar.width
			avatar.x = name.x = Align.center
			@.content.height = container.height = avatar.height + name.height + 5
			@.content.y = Align.center
			avatar.setUser(user)

exports.ActiveFriendsScrollList = ActiveFriendsScrollList

class ActiveFriends extends Layer
	constructor: (options = {}, users) ->
		options.scale ?= 1
		options.height = 150
		options.width = Screen.width - style.margins
		options.backgroundColor = "transparent"
		options.x =  Align.center
		options.directionLock = true
		super options

		activeFriendsLabel = new Layer
			parent: @
			width: @.width
			height: 50 * options.scale
			backgroundColor: "transparent"
		activeFriendsIcon = new Layer
			parent: activeFriendsLabel
			x: Align.left
			y: Align.center
			image: "images/activeNowIcon.png"
			width: 20
			height: 20
		activeNow = new TextLayer
			parent: activeFriendsLabel
			x: activeFriendsIcon.maxX + 12
			fontSize: 16
			fontWeight: "bold"
			fontColor: "black"
			y: Align.center
			text: "Active now (#{users.length}) >"
		activeNowSettings = new Layer
			parent: activeFriendsLabel
			x: Align.right
			y: Align.center
			image: "images/activeNowSettings.png"
			width: 35
			height: 35

		scroll = new ActiveFriendsScrollList({parent: @, y: Align.bottom}, users)


exports.ActiveFriends = ActiveFriends
