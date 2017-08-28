
exports.allTypesFlow = '[
	{
		"type": "ChatHeader", 
		"delay": "0.5", 
		"botInfo":
		{
			"botName": "Vodafone Chatbot", 
			"botFans": "62,438 people like this", 
			"botCategory": "Telecom", 
			"botAvatar": "images/Amanda.png"
		}
	},
	{
		"type": "TypingIndicator",
		"delay": "1"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "chatbot"
	},
	{
		"type": "TextBubble", 
		"delay": "4", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "TextBubble", 
		"delay": "6", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "TextBubble", 
		"delay": "8", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "TextBubble", 
		"delay": "10", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "chatbot"
	},
	{
		"type": "TextBubble", 
		"delay": "12", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "chatbot"
	},
	{
		"type": "QuickReplies", 
		"delay": "14", 
		"replies":[
			{"icon": "images/locationIcon.png", "reply": "No thanks"},
			{"reply": "No thanks"}, 
			{"reply": "No thanks"}, 
			{"icon": "images/locationIcon.png", "reply": "No thanks"}
		]
	},
	{
		"type": "TextButtons", 
		"delay": "16", 
		"buttonsContent":
		{
			"message": 
			{
				"text": "Where do you want to meet?", 
				"sender": "button"
			},
			"buttons": ["Iasi", "Cluj", "Timisoara"]
		}
	},	
	{
		"type": "TextBubble", 
		"delay": "18", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "Carousel", 
		"delay": "20", 
		"carouselMessage": [
			{
				"title": "Would you like to get a coffee at 7?",
				"subtitle": "Subtitle\\nSubtitle\\nSubtitle",
				"image": "images/product.png",
				"buttons": ["zero", "one", "two"]
			},
			{
				"title": "Would you like to get a coffee at 7?",
				"subtitle": "Subtitle\\nSubtitle\\nSubtitle",
				"image": "images/product.png",
				"buttons": ["zero", "one", "two"]
			},
			{
				"title": "Would you like to get a coffee at 7?",
				"subtitle": "Subtitle\\nSubtitle\\nSubtitle",
				"image": "images/product.png",
				"buttons": ["zero", "one", "two"]
			},
			{
				"title": "Would you like to get a coffee at 7?",
				"subtitle": "Subtitle\\nSubtitle\\nSubtitle",
				"image": "images/product.png",
				"buttons": ["zero", "one", "two"]
			},
			{
				"title": "Would you like to get a coffee at 7?",
				"subtitle": "Subtitle\\nSubtitle\\nSubtitle",
				"image": "images/product.png",
				"buttons": ["zero", "one", "two"]
			}
		]
	},
	{
		"type": "MockEvent",
		"delay": "22",
		"event":
		{
			"type":"scroll",
			"index": "3"
		}
	},
	{
		"type": "MockEvent",
		"delay": "24",
		"event":
		{
			"type": "tap",
			"index": "1"
		}
	},
	{
		"type": "List",
		"delay": "44",
		"listMessage" :
		{
			"hasHeader": "true",
			"hasButtons": "true",
			"button": ["View more"],
			"items":[
			{
				"state": "header",
				"title": "Classic T-shirt collection",
				"subtitle": "See all our colors",
				"link": "www.imprezzio.com",
				"image": "images/product.png",
				"button": "View"
			},
			{
				"state": "regular",
				"title": "Classic White t-shirt",
				"subtitle": "100% cotton, 200% comfortable",
				"image": "images/product.png",
				"link": "www.imprezzio.com",
				"button": "Shop Now"
			},
			{
				"state": "regular",
				"title": "Classic Blue t-shirt",
				"subtitle": "100% cotton, 200% comfortable",
				"image": "images/product.png",
				"link": "www.imprezzio.com",
				"button": "Shop Now"
			},
			{
				"state": "regular",
				"title": "Classic Black t-shirt",
				"subtitle": "100% cotton, 200% comfortable",
				"image": "images/product.png",
				"link": "www.imprezzio.com",
				"button": "Shop Now"
			}
			]
		}
	},
	{
		"type" : "Location",
		"delay" : "48",
		"location":
		{
			"name": "Bucuresti, Romania",
			"subtitle": "Tap to view on map",
			"zoom":"12",
			"scale":"1"
		}
	},
	{
		"type": "TextBubble", 
		"delay": "50", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "Receipt",
		"delay": "52",
		"receiptData": 
		{
			"products": [
			{
				"title": "Classic White T-Shirt",
				"description": "100% Cotton, 200% Comfortable",
				"image": "images/product.png",
				"quantity": "2",
				"itemPrice": "13.97"
			},
			{
				"title": "Classic White T-Shirt",
				"description": "100% Cotton, 200% Comfortable",
				"image": "images/product.png",
				"quantity": "1",
				"itemPrice": "15.43"
			},
			{
				"title": "Classic White T-Shirt",
				"description": "100% Cotton, 200% Comfortable",
				"image": "images/product.png",
				"quantity": "3",
				"itemPrice": "9.67"
			}
			],
			"paymentMethod": "Visa 2345",
			"shipTo": "1 Hacker Way \\nMenlo Park, CA 94025",
			"currency": "$"
		}
	}
	]'



exports.botInfo =
	botName: "Vodafone Chatbot"
	botFans: "62,438 people like this"
	botCategory: "Telecom"
	botAvatar: "images/Amanda.png" #"https://unsplash.it/375/667/?random"

# chatHeader = new ChatHeader({y: 100, parent: null}, bot)

# indicator = new TypingIndicator

exports.messageText1 = {text: "What about drinks tomorrow at 7? Are you available for this time?", sender: "user"}
exports.messageText2 = {text: "What about drinks tomorrow at 7?",sender: "chatbot" }

# user1 = new TextBubble({y: 0}, messageText1)
# chatbot1 = new TextBubble({y:user1.maxY + 10}, messageText2)

exports.replies = [{icon: "images/locationIcon.png", reply: "No thanks"},{icon: undefined, reply: "No thanks"}, {icon: undefined, reply: "No thanks"}, {icon: "images/locationIcon.png", reply: "No thanks"}]

# test = new QuickReplies({}, replies)

# sampleReply = {
# 	icon: "images/locationIcon.png"
# 	reply: "No thanks"
# }
#
# quicky = new QuickReply({icon: sampleReply.icon}, sampleReply.reply)

exports.buttonsContent =
	message: {text: "What about drinks tomorrow at 7? Are you available for this time?", sender: "button"}
	buttons: ["Iasi", "Cluj", "Timisoara"]


# textButtons = new TextButtons({y: 250}, buttonsContent)

# buttons = new Buttons({y: 200},["Alex","Ana", "Bucuresti"])

cardMessage =
	title: "Would you like to get a coffee at 7?"
	subtitle: "Subtitle\nSubtitle\nSubtitle"
	image: "images/Amanda.png" #"https://source.unsplash.com/random"
	buttons: ["Cluj", "Cluj", "Cluj"]

exports.carouselMessage = [cardMessage, cardMessage, cardMessage, cardMessage, cardMessage]

# card = new Card({padding:8, y:10}, cardMessage)

# carousel = new Carousel({}, carouselMessage)

exports.listMessage =
	hasHeader: true
	hasButtons: true
	button: ["View more"]
	items:[
		{
			state: "header"
			title: "Classic T-shirt collection"
			subtitle: "See all our colors"
			link: "www.imprezzio.com"
			image: "images/Amanda.png" #"http://lorempixel.com/400/200/sports/"
			button: "View"
		},
		{
			state: "regular"
			title: "Classic White t-shirt"
			subtitle: "100% cotton, 200% comfortable"
			image: "images/Amanda.png" #"http://lorempixel.com/400/200/sports/"
			link: "www.imprezzio.com"
			button: "Shop Now"
		},
		{
			state: "regular"
			title: "Classic Blue t-shirt"
			subtitle: "100% cotton, 200% comfortable"
			image: "images/Amanda.png" #"http://lorempixel.com/400/200/sports/"
			link: "www.imprezzio.com"
			button: "Shop Now"
		},
		{
			state: "regular"
			title: "Classic Black t-shirt"
			subtitle: "100% cotton, 200% comfortable"
			image: "images/Amanda.png" #"http://lorempixel.com/400/200/sports/"
			link: "www.imprezzio.com"
			button: "Shop Now"
		}
	]


# list = new List({}, listMessage)
# print list.children[0].siblings


# item = new ListItem({}, listMessage.items[0])

# listItem  = new ListItem({}, listMessage.items.item1)
# listItem2 = new ListItem({y: listItem.maxY}, listMessage.items.item2)
# listItem3 = new ListItem({y: listItem2.maxY}, listMessage.items.item3)
# listItem4 = new ListItem({y: listItem3.maxY}, listMessage.items.item4)
# button = new Buttons({y: listItem4.maxY}, ["View more"])

exports.location =
	name: "Bucuresti, Romania"
	subtitle: "Tap to view on map"
	zoom:12
	scale:1
# test = new Location({}, location)


exports.receiptSampleData = {
	products: [
		{
			title: "Classic White T-Shirt",
			description: "100% Cotton, 200% Comfortable",
			image: "images/product.png"
			quantity: 2,
			itemPrice: 13.97
		},
		{
			title: "Classic White T-Shirt",
			description: "100% Cotton, 200% Comfortable",
			image: "images/product.png"
			quantity: 1,
			itemPrice: 15.43
		},
		{
			title: "Classic White T-Shirt",
			description: "100% Cotton, 200% Comfortable",
			image: "images/product.png"
			quantity: 3,
			itemPrice: 9.67
		}
	],
	paymentMethod: "Visa 2345",
	shipTo: "1 Hacker Way \nMenlo Park, CA 94025"
	currency: "$"
}

# sampleReceipt = new Receipt({}, receiptSampleData)
# item = new ReceiptItem({y: test.maxY}, receipt.products[0])