
# TextBubble
############
class TextBubble extends TextLayer
	constructor: (options = {}, message) ->
		options.text = message.text
		options.sender = message.sender
		options.borderRadius = 18
		options.fontSize = 17
		options.padding =
			vertical: 8
			horizontal: 12
		super options
		@.states =
				chatbot:
					backgroundColor: "#F1F0F0"
					color: "#000000"
				user:
					backgroundColor: "#0084FF"
					x: Align.right(-8)
					color: "#FFFFFF"
				button:
					backgroundColor: "#F1F0F0"
					width: 256
					color: "#000000"
					borderRadius:
						bottomLeft: 0
						bottomRight: 0
				stackBottomLeft:
					borderRadius:
						bottomLeft: 0
				stackBottomRight:
					borderRadius:
						bottomRight: 0
				stackTopLeft:
					borderRadius:
						topLeft: 0
				stackTopRight:
					borderRadius:
						topRight: 0
		@.maxWidth()
		@.stateSwitch options.sender
	maxWidth: () ->
		if  @.width > 256 then @.width = 256

	mergeBottom: (side) ->
		if (side == "left" || side == "both")
			@.stateSwitch "stackBottomLeft"
		if (side == "right" || side == "both")
			@.stateSwitch "stackBottomRight"

	mergeTop: (side) ->
		if (side == "left" || side == "both")
			@.stateSwitch "stackTopLeft"
		if (side == "right" || side == "both")
			@.stateSwitch "stackTopRight"

exports.TextBubble = TextBubble



#QuickReplies
#############
class QuickReply extends TextLayer
	constructor: (options = {}, reply) ->
		if options.icon is undefined
			options.iconWidth = 0
		else
			options.iconWidth = 24
		options.text = reply
		options.fontSize = 17
		options.color = "#0084FF"
		options.padding =
			vertical: 8
			left: 12 + options.iconWidth
			right: 12
		options.borderColor = "#0084FF"
		options.borderWidth = 1
		options.borderRadius = 18
		super options
		
		@.on Events.TouchEnd, ->
			buttonClick options.text

		if options.icon isnt undefined
			icon = new Layer
				parent: @
				x: 6
				y: 6
				width: 24
				height: 24
				image: options.icon

	buttonClick= (message) ->
		Screen.emit "SendMessage", message

	mockTap: () ->
		message = @.text
		buttonClick(message)

class QuickReplies extends ScrollComponent
	constructor: (options = {}, replies) ->
		options.scrollVertical = false
		options.directionLock = true
		options.width ?= options.superLayer.width
		super options
		@.appendReplies(replies)
		@.scrollable()
		@.on Events.TouchEnd, ->
			@.destroy()

	scrollable: () ->
		if @.content.width < Screen.width + 1
			@.scrollHorizontal = false
			@.x = Align.center

	appendReplies: (replies) ->
		container = new Layer
			backgroundColor: "transparent"
			width: 0
		for reply, index in replies
			quickReply = new QuickReply({icon: reply.icon, parent: container}, reply.reply)
			container.width += quickReply.width + 12
			if container.width < 375 then container.x = Align.center else container.x = Align.left()
			if index isnt 0 then quickReply.x = container.children[index - 1].maxX + 12
		container.width -= 12
		container.height = quickReply.height

		container.parent = @.content
		@.contentInset =
			right: 0
			left: 0
		@.height = container.height

	mockTap= (replies, target) ->
		target.mockTap()
		replies.destroy()

	mockScrollAndTap: (customEvent) ->
		container = @.content.children[0]
		scrollTarget = container.children[customEvent.scrollindex]
		tapTarget = container.children[customEvent.tapindex]
		if (scrollTarget != undefined)
			if (@.scrollHorizontal == true)
				@.scrollToPoint(x:scrollTarget.x, y:scrollTarget.y, true, time: 2)
		
		if (tapTarget != undefined)
			replies = @
			setTimeout(mockTap, customEvent.tapDelay*1000, replies, tapTarget)


exports.QuickReply = QuickReply
exports.QuickReplies = QuickReplies



#TextButtons
############

class Button extends TextLayer
	constructor: (options) ->
		options.backgroundColor ?= "#FFFFFF"
		options.fontSize ?= 17
		options.color ?= "#0084FF"
		options.borderWidth ?= 0.5
		options.borderColor ?= "#F1F0F0"
		
		super options

		@.on Events.TouchEnd, ->
			buttonClick @.text

	buttonClick= (message) ->
		Screen.emit "SendMessage", message

	mockTap: (customEvent) ->
		message = @.text
		setTimeout(buttonClick, customEvent.tapDelay*1000, message)


exports.Button = Button

class Buttons extends Layer
	constructor: (options = {}, buttons) ->
		options.backgroundColor = "#FFFFFF"
		options.width = 256
		options.height = 0
		super options
		for button, index in buttons
			button = new Button
				parent: @
				text: buttons[index]
				x: Align.left()
				y: index * 45
				height: 45
			@.height += button.height
			button.padding =
				horizontal: (256 - button.width) / 2
				vertical: 10

		button.borderRadius =
			bottomLeft: 18
			bottomRight: 18

exports.Buttons = Buttons

class TextButtons extends Layer
	@buttons = undefined
	constructor: (options = {}, message) ->
		options.backgroundColor = "transparent"
		super options

		textBubble = new TextBubble({parent: @}, message.message)
		@buttons = new Buttons({parent: @, y: textBubble.maxY}, message.buttons)

		@.height = textBubble.height + @buttons.height

	mockTap: (customEvent) ->
		targetButton = @buttons.children[customEvent.tapindex]
		if (targetButton != undefined)
			targetButton.mockTap(customEvent)

exports.TextButtons = TextButtons



#Card
#####
class Card extends Layer
	constructor: (options ={}, message) ->
		options.x = Align.left(options.padding)
		options.width = 256
		options.borderRadius = 18
		options.borderColor = "#F1F0FF0"
		options.clip = true
		super options
		@.states =
			left:
				borderRadius:
					topRight: 4
			middle:
				borderRadius:
					topRight: 4
					topLeft: 4
			right:
				borderRadius:
					topLeft: 4

		image = new Layer
			parent: @
			image: message.image
			width: 256
			height: 256/1.9

		titles = new Layer
			parent: @
			y: image.maxY
			width: 256
			backgroundColor: "#FFFFFF"
			borderColor: "#F1F0F0"
			borderWidth: 0.5

		title = new TextLayer
			parent: titles
			text: message.title
			fontSize: 14
			fontWeight: "medium"
			x: Align.left(12)
			y: Align.top
			width: 256
			color: "#000000"
			padding:
				top: 8				
		titles.height = title.maxY

		if (message.subtitle != undefined)
			subtitle = new TextLayer
				parent: titles
				text: message.subtitle
				x: Align.left(12)
				y: title.maxY
				width: 256
				fontSize: 13
				color: "#666666"
				padding:
					bottom: 8
			titles.height = subtitle.maxY

		buttons = new Buttons({parent: @, y: titles.maxY}, message.buttons)
		@.height = 0
		for layer in @.children
			@.height += layer.height

	mockTap: (customEvent) ->
		targetButtons = @.children[@.children.length - 1]
		targetButton = targetButtons.children[customEvent.tapindex]

		if (targetButton != undefined)
			targetButton.mockTap(customEvent)

exports.Card = Card

class Carousel extends ScrollComponent
	@currentCardIndex = undefined

	constructor: (options = {}, message) ->
		options.width = Screen.width
		options.scrollVertical = false
		options.directionLock = true

		super options

		options.offset ?= 0

		for card, index in message
			card = new Card({parent: @.content}, message[index])
			card.x = index * (card.width + 4) + options.offset
			
		@.height = card.height		
		@.content.width = message.lenght * card.width
		@.content.draggable.overdrag = false		
		@.contentInset =
			right: 30
			left: 0
		@.fitCards()

		@currentCardIndex = 0

		scroll = @
		@.onScrollEnd ->
			scroll.scrollToClosestLayer(0.5, 0.5)


	fitCards: (options = {}) ->
		cards = @.content.children
		for card, index in cards
			if index is 0
				card.animate "left"
			else if index is Object.keys(cards).length - 1
				card.animate "right"
			else
				card.animate "middle"

	mockScroll= (scroll, index, scrollTime) ->
		targetCard = scroll.content.children[index]
		scroll.scrollToLayer(targetCard, 0.5, 0, true, curve: "ease-out", time: scrollTime/8)

	mockScrollAndTap: (customEvent) ->
		scroll = @
		for index in [@currentCardIndex..customEvent.scrollindex]
			delay = index
			if @currentCardIndex > customEvent.scrollindex
				delay = @currentCardIndex - index

			setTimeout(mockScroll, customEvent.scrolltime * 1000 * delay, scroll, index, customEvent.scrolltime)

		@currentCardIndex = customEvent.scrollindex

		if (customEvent.tapindex != undefined)
			targetCard = scroll.content.children[customEvent.scrollindex]
			targetCard.mockTap(customEvent)

exports.Carousel = Carousel



#Typing Indicator
#################
class TypingIndicator extends Layer
	constructor: (options = {}) ->
		options.height = 36
		options.width = 50
		options.borderRadius = 18
		options.backgroundColor = "#F1F0F0"
		super options
		for i in [0..2]
			dot = new Layer
				parent: @
				backgroundColor: "#939393"
				width: 7
				height: 7
				borderRadius: 100
				y: Align.center
				x: 10 + i * 12
			dot.states =
				up:
					y: Align.center(-8)
				down:
					y: Align.center
		@.moveDots(@.children)

	moveDots: (dots) ->
		Utils.interval 0.5, ->
			Utils.delay 0,->
				dots[0].stateCycle()
			Utils.delay 0.2,->
				dots[1].stateCycle()
			Utils.delay 0.4,->
				dots[2].stateCycle()


exports.TypingIndicator = TypingIndicator



#ChatHeader
###########
class ChatHeader extends Layer
	constructor: (options = {}, bot) ->
		options.width = Screen.width
		options.height = 128
		options.backgroundColor = "transparent"
		options.borderColor = "#F1F0F0"
		options.borderWidth = 1
		super options
		avatar = new Layer
			parent: @
			width: 80
			height: 80
			x: Align.left(12)
			y: Align.center
			borderRadius: 100
			image: bot.botAvatar
		botDetails = new Layer
			parent: @
			height: 80
			y: Align.center
			x: Align.left(avatar.maxX + 16)
			backgroundColor: "#FFFFFF"
		botName = new TextLayer
			parent: botDetails
			text: bot.botName
			y: Align.top
			fontSize: 21
			fontWeight: "light"
			color: "#000000"
		botFans = new TextLayer
			parent: botDetails
			y: Align.center
			fontSize: 14
			color: "#000000"
			text: bot.botFans
		botCategory = new TextLayer
			parent: botDetails
			text: bot.botCategory
			y: Align.bottom(-5)
			fontSize: 14
			color: "#ABABAB"

exports.ChatHeader = ChatHeader



#List
#####

class ListItem extends Layer
	constructor: (options = {}, item) ->
		options.name = "listItem"
		options.width = 256
		options.clip = true
		options.backgroundColor = "trasparent"
		options.borderColor = "F1F0F0"
		options.borderWidth = 1
		super options
		@.states =
			header:
				height: 139
				borderRadius:
					topRight: 18
					topLeft: 18
			regular:
				height: 97
		itemDetails = new Layer
			x: Align.left(8)
			height: 0
			width: 200
			backgroundColor: "transparent"
			parent: @
		itemTitle = new TextLayer
			parent: itemDetails
			text: item.title
			fontSize: 12
			fontWeight: "medium"
			color: "#000000"
		itemSubtitle = new TextLayer
			parent: itemDetails
			text: item.subtitle
			fontSize: 11
			color: "#666666"
			y: itemTitle.maxY
		itemDetails.height += itemTitle.height + itemSubtitle.height
		if item.link isnt null
			itemLink = new TextLayer
				parent: itemDetails
				y: itemSubtitle.maxY
				fontSize: 10
				color: "#666666"
				text: item.link
			itemDetails.height += itemLink.height
		if item.button isnt null
			items = itemDetails.children
			lastItem = Object.keys(items).lenght - 1
			itemButton = new TextLayer
				parent: itemDetails
				y: @.children[0].children[Object.keys(@.children[0].children).length - 1].maxY + 4
				fontSize: 12
				color: "#037AFF"
				text: item.button
				borderColor: "#037AFF"
				borderWidth: 0.5
				borderRadius: 4
				padding:
					vertical: 2
					horizontal: 4
			itemDetails.height += itemButton.height
		image = new Layer
			parent: @
			width: 70
			height: 70
			x: Align.right(-11)
			y: Align.center
			image: item.image
		itemDetails.states =
			header:
				y: Align.bottom(-8)
			regular:
				y: Align.center
		itemTitle.states =
			header:
				color: "#FFFFFF"
			regular:
				color: "#000000"
		itemSubtitle.states =
			header:
				color: "#FFFFFF"
			regular:
				color: "#666666"
		itemLink.states =
			header:
				color: "#FFFFFF"
			regular:
				color: "#666666"
		itemButton.states =
			header:
				color: "#FFFFFF"
				borderColor: "#FFFFFF"
			regular:
				color: "#037AFF"
				borderColor: "#037AFF"
		image.states =
			header:
				x: 0
				y: 0
				z: -1
				width: 256
				height: 137
				brightness: 50
			regular:
				x: Align.right(-8)
				y: Align.center
				width: 70
				height: 70
				borderRadius: 4
				brightness: 100
		@.stateSwitch "#{item.state}"
		itemDetails.stateSwitch "#{item.state}"
		itemTitle.stateSwitch "#{item.state}"
		itemSubtitle.stateSwitch "#{item.state}"
		itemLink.stateSwitch "#{item.state}"
		itemButton.stateSwitch "#{item.state}"
		image.stateSwitch "#{item.state}"

		# @.onTap ->
		# 	print @.children[0].children[0].font
		itemDetails.y = Align.center


exports.ListItem = ListItem

class List extends Layer
	@button = undefined	

	constructor: (options = {}, message) ->
		options.width = 256
		options.height = 0
		options.backgroundColor = "transparent"
		super options
		for item, index in message.items
			listItem = new ListItem({parent: @}, item)
			@.height += listItem.height
			if index isnt 0 then listItem.y= @.children[index-1].maxY
		@button = new Buttons({parent: @, y: listItem.maxY}, message.button)
		@.height += @button.height

	mockTap: (customEvent) ->
		targetButton = @button.children[customEvent.tapindex]
		if (targetButton != undefined)
			targetButton.mockTap(customEvent)

exports.List = List



#Location
#########

class Location extends Layer
	constructor: (options = {}, location) ->
		options.backgroundColor = "transparent"
		super options
		map = new Layer
			parent: @
			borderRadius:
				topLeft: 18
				topRight: 18
			width: 256
			height: Math.round ( 255 / 1.9 )
			borderColor: "#EBEBEB"
			borderWidth: 1
		map.image = "https://maps.googleapis.com/maps/api/staticmap?center=#{location.name}&zoom=#{location.zoom}&scale=#{location.scale}&size=#{map.width}x#{map.height}&maptype=roadmap&format=png&visual_refresh=true"

		label = new Layer
			parent: @
			width: 256
			height: 53
			y: map.maxY
			backgroundColor: "#ffffff"
			borderRadius:
				bottomLeft: 18
				bottomRight: 18
			borderColor: "#EBEBEB"
			borderWidth: 1
		title = new TextLayer
			text: "#{location.name}"
			color: "#000000"
			x: 12
			y: 8
			parent: label
			fontSize: 14
			fontWeight: "medium"
		subtitle = new TextLayer
			text: "#{location.subtitle}"
			y: title.maxY
			x: 12
			parent: label
			fontSize: 13
			color: "#000000"
		@.width = map.width
		@.height = map.height + label.height
		# @.onTap ->
		# 	print @


exports.Location = Location



# Receipt
#########

class ReceiptItem extends Layer
	constructor: (options = {}, item) ->
		options.height = 70
		options.width = 242
		options.backgroundColor = "transparent"
		super options
		productImage = new Layer
			parent: @
			width: 70
			height: 70
			image: item.image
			borderColor: "#EBEBEB"
			borderWidth: 1
			borderRadius: 2
		productData = new Layer
			width: 164
			parent: @
			x: productImage.maxX + 8
			y: Align.center
			backgroundColor: "transparent"
		productTitle = new TextLayer
			textAlign: Align.left
			parent: productData
			text: item.title
			fontSize: 14
			fontWeight: "bold"
			color: "#000000"
		productSubtitle = new TextLayer
			parent: productData
			color: "#666666"
			text: item.description
			x: productTitle.x
			y: productTitle.maxY
			fontSize: 13
			height: 14
			width: 164
			truncate: true
		productQty = new TextLayer
			parent: productData
			text: "Qty. #{item.quantity}"
			y: productSubtitle.maxY
			x: productTitle.x
			color: "#666666"
			fontSize: 13
			height: 14
			width: 164
			truncate: true
		productData.height = productTitle.height + productSubtitle.height + productQty.height
		productData.y = Align.center

class Receipt extends Layer
	constructor: (options = {}, receipt) ->
		options.width = 256
		options.borderWidth = 1
		options.borderColor = "#EBEBEB"
		options.backgroundColor = "transparent"
		options.borderRadius = 18
		options.totalCost = 0
		super options

		receipt.title ?= "Order confirmation"

		title = new TextLayer
			parent: @
			text: receipt.title
			fontSize: 14
			color: "#666666"
			width: @.width
			padding:
				left: 12
				top: 12
				bottom: 12
			borderColor: "#EBEBEB"
			borderWidth: 1
			borderRadius:
				topLeft: 18
				topRight: 18
		products = new Layer
			height: 0
			backgroundColor: "transparent"
			parent: @
			y: title.maxY + 8
			width: 230
			x: Align.center
		for item, index in receipt.products
			options.totalCost += item.itemPrice * item.quantity
			item = new ReceiptItem({parent: products, y: index * 78}, item)
			products.height += item.height + 8
		paymentDetails = new Layer
			parent: @
			width: 230
			y: products.maxY + 8
			x: products.x
			backgroundColor: "transparent"
		paymentDetailsLabel = new TextLayer
			text: "Paid with"
			parent: paymentDetails
			fontSize: 13
			color: "#666666"		
		paymentMethod = new TextLayer
			parent: paymentDetails
			fontSize: 13
			color: "#000000"
			text: receipt.paymentMethod
			y: paymentDetailsLabel.maxY
		paymentDetails.height = paymentMethod.height + paymentDetailsLabel.height
		shippingDetails = new Layer
			parent: @
			width: 230
			x: products.x
			y: paymentDetails.maxY + 8
			backgroundColor: "transparent"
		shippingDetailsLabel = new TextLayer
			text: "Ship to"
			parent: shippingDetails
			fontSize: 13
			color: "#666666"
		shippingAddress = new TextLayer
			text: receipt.shipTo
			parent: shippingDetails
			fontSize: 13
			color: "#000000"
			y: shippingDetailsLabel.maxY
		shippingDetails.height = shippingDetailsLabel.height + shippingAddress.height
		total = new Layer
			parent: @
			width: @.width
			y: shippingDetails.maxY + 12
			borderColor: "#EBEBEB"
			borderWidth: 1
			backgroundColor: "transparent"
			height: title.height
			borderRadius:
				bottomLeft: 18
				bottomRight: 18
		totalLabel = new TextLayer
			x: 8
			y: Align.center
			parent: total
			fontSize: 14
			color: "#666666"
			text: "Total"
		@.height = @.children.length * 8 - 4
		for layer in @.children
			@.height += layer.height
		totalCost = new TextLayer
			parent: total
			x: Align.right(-12)
			fontSize: 14
			color: "#000000"
			fontWeight: "bold"
			y: Align.center
			text: "#{receipt.currency} #{options.totalCost}"




exports.ReceiptItem  = ReceiptItem
exports.Receipt = Receipt
