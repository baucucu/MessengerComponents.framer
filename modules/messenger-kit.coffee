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

		options.image ?= "images/icons/meIconActive.png"	#user.image_0
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
				image: "images/icons/messengerIcon.png"
				borderWidth: options.scale * 2
			myDay:
				borderColor: "#FFFFFF"
				borderWidth: options.scale * 2
				image: null
				backgroundColor: "#0076FF"

		@.subLayers[0].animate(options.status)

	setUser: (user, setBadge) ->
		setBadge ?= true		
		@.image = user.image_0
		if (setBadge is true)		
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
			myDay.shadowY = 2
			myDay.shadowBlur = 11
			myDay.shadowColor = "rgba(0,0,0,0.3)" 
			myDay.subLayers[0].width = myDay.subLayers[0].height = 14
			myDay.subLayers[0].y = Align.top(-4)
			myDay.subLayers[0].x = Align.right(4)

			myDay.changeStatus("myDay")
			myDay.setUser(user)

		@.contentInset =
			right: 0
			left: 0

exports.MyDays = MyDays


# Message List Item

class MessageListItem extends Layer
	# @user = undefined

	constructor: (options = {}, user) ->
		options.name ?= "MessageListItem"
		options.scale ?= 1
		options.x = Align.center
		options.width = Screen.width - style.margins
		options.height = 74 * options.scale
		options.backgroundColor = "transparent"
		options.clip = true

		super options

		# @user = user

		avatar = new Avatar({parent: @, x: 2, y: style.margin * options.scale, scale:1.02 })
		avatar.setUser(user)
		avatar.changeStatus(user.status)

		name = new TextLayer
			name: "name"
			parent: @
			x: avatar.maxX + options.scale * 12
			y: avatar.y + 6
			lineHeight: 1
			text: user.firstname + " " + user.lastname
			fontSize: 17 * options.scale
			fontFamily: "San Francisco, sans-serif" 
			letterSpacing: -0.5

		lastMessage = new TextLayer
			name: "lastMessage"
			parent: @
			x: name.x
			y: name.maxY + 2
			lineHeight: 1.5
			width: @.width - avatar.width - 8
			height: 23
			text: user.messageText
			fontSize: 15 * options.scale
			truncate: "true"
			fontFamily: "San Francisco, sans-serif" 
			

		lastMessageTime = new TextLayer
			name: "lastMessageTime"
			parent: @
			x: Align.right
			y: name.y
			fontSize: 15 * options.scale
			text: user.messageTime
			marginTop: 5

		if user.unread is true
			lastMessage.fontWeight = 500
			lastMessage.color = "#000000"
			name.fontWeight = 500
			name.color = "#000000"
			lastMessageTime.fontWeight = 500
			lastMessageTime.color = "#000000"
		else
			mini_avatar = new Avatar({parent: @, x: Align.right(5), y: lastMessage.y, scale:0.6 })
			mini_avatar.setUser(user)

		@.on Events.TouchEnd, ->
			Screen.emit "GotoChat", user

exports.MessageListItem = MessageListItem


# Message List

class MessageList extends Layer
	constructor: (options = {}, users) ->
		options.name ?= "MessageList"
		options.scale ?= 1
		options.width = Screen.width - style.margins
		options.x = Align.center
		options.backgroundColor = "transparent"
		options.height = users.length * 80 * options.scale
		super options

		for user, index in users
			message = new MessageListItem({parent: @, y: options.scale * index * 68}, user)

exports.MessageList = MessageList

# Active users

class ActiveFriendsScrollList extends ScrollComponent
	constructor: (options = {}, users) ->
		options.name ?= "ActiveFriendsScroll"
		options.avatarScale ?= 1.1
		options.nameLabelPadding ?= 16
		options.scale ?= 1
		options.width = Screen.width
		# options.height = options.scale * 100
		options.scrollVertical = false
		options.directionLock = true

		super options

		for user, index in users
			container = new Layer
				parent: @.content
				x: index * 88 + 15
				width: 56
				backgroundColor: "transparent"
			avatar = new Avatar({parent: container, scale:options.avatarScale, y:Align.top(3)})
			name = new TextLayer
				parent: container
				text: user.firstname
				fontSize: 14 * options.scale
				y: avatar.maxY + options.nameLabelPadding
			container.width = options.avatarScale * avatar.width
			@.height = @.content.height = container.height = options.avatarScale * avatar.height + name.height + options.nameLabelPadding
			avatar.x = name.x = Align.center
			avatar.setUser(user, false)
		
		@.content.width = container.maxX

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
