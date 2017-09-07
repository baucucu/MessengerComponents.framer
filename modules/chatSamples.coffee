
exports.WebViewTest = '[
	{
		"type": "ChatHeader", 
		"delay": "1", 
		"botInfo":
		{
			"botName": "Vodafone Chatbot", 
			"botFans": "62,438 people like this", 
			"botCategory": "Telecom", 
			"botAvatar": "images/vf-logo-large.png"
		}
	},
	{
		"type": "TextBubble", 
		"delay": "1", 
		"text": "Get started", 
		"sender": "user"
	},
	{
		"type": "WebView", 
		"delay": "0.5"
	}
]'

exports.Vodafone1 = '[
	{
		"type": "ChatHeader", 
		"delay": "1", 
		"botInfo":
		{
			"botName": "Vodafone Chatbot", 
			"botFans": "62,438 people like this", 
			"botCategory": "Telecom", 
			"botAvatar": "images/vf-logo-large.png"
		}
	},
	{
		"type": "TextBubble", 
		"delay": "1", 
		"text": "Get started", 
		"sender": "user"
	},
	{
		"type": "TypingIndicator",
		"delay": "1"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "Salut, Andrei!", 
		"sender": "chatbot"
	},	
	{
		"type": "TypingIndicator",
		"delay": "2"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "Cu ce te pot ajuta astazi?", 
		"sender": "chatbot"
	},
	{
		"type": "QuickReplies", 
		"delay": "2", 
		"replies":[
			{"reply": "🚀 Comenzi rapide"}, 
			{"reply": "📱 Contul meu"}, 
			{"reply": "📯 Urgente"}, 
			{"reply": "⚙️ Setari"},
			{"reply": "📔 Ajutor"}
		]
	},
	{
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"scroll-and-tap",
			"scrollindex": "2",
			"tapindex": "10",
			"tapDelay": "1"
		}
	},
	{
		"type": "MockEvent",
		"delay": "4",
		"event":
		{
			"type":"scroll-and-tap",
			"scrollindex": "0",
			"tapindex": "1",
			"tapDelay": "3"
		}
	},	
	{
		"type": "TypingIndicator",
		"delay": "6"
	},
	{
		"type": "TextBubble", 
		"delay": "1", 
		"text": "Contul meu:", 
		"sender": "chatbot"
	},	
	{
		"type": "Carousel", 
		"delay": "0.5", 
		"carouselMessage": [
			{
				"title": "Facturi & Plati",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?url=https%3A%2F%2Fimagizer.imageshack.us%2F400x225f%2F922%2FMQrYNS.png&_nc_hash=AQCMl3-0kjo1Ts9c",
				"buttons": ["Facturi & Plati"]
			},
			{
				"title": "Abonamentul meu",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQDTyVum3qMhFtYy&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F923%2FEhhf93.jpg&_nc_hash=AQBZaOYOb7y1wfos",
				"buttons": ["Abonamentul meu"]
			},
			{
				"title": "Adauga optiuni noi",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQBZy1Qsfy3QOgsX&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F922%2FufrXzU.jpg&_nc_hash=AQBWU3yKSNtpFe4f",
				"buttons": ["Adauga optiuni noi"]
			},
			{
				"title": "Roaming",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQAWOnQ1NLO4kyn7&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F924%2FKHxAYE.jpg&_nc_hash=AQDVD8U1PvjxJam3",
				"buttons": ["Roaming"]
			},
			{
				"title": "International",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQAWOnQ1NLO4kyn7&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F924%2FKHxAYE.jpg&_nc_hash=AQDVD8U1PvjxJam3",
				"buttons": ["International"]
			},
			{
				"title": "Reincarcare",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQDwEpYa6xeLqGhw&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F922%2FAX3Fnb.jpg&_nc_hash=AQD3hivKUyBf6VRN",
				"buttons": ["Reincarcare"]
			},
			{
				"title": "Casuta vocala",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQAhLc4gHP68TL4X&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F924%2Fu7Ty0L.jpg&_nc_hash=AQBrJLAp50wgIIhO",
				"buttons": ["Casuta vocala"]
			},
			{
				"title": "⬅️ Inapoi",
				"image": "https://external-frx5-1.xx.fbcdn.net/safe_image.php?d=AQDLCAGbUI3L-JJO&url=http%3A%2F%2Fimagizer.imageshack.us%2F400x300f%2F922%2FOV7lbl.jpg&_nc_hash=AQDTH8r2qGQZ_rDA",
				"buttons": ["⬅️ Inapoi"]
			}
		]
	},
	{
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"scroll-and-tap",
			"startindex": "0",
			"scrollindex": "7",
			"scrolltime": "7",
			"tapindex": "10",
			"tapDelay": "1"
		}
	},
	{
		"type": "MockEvent",
		"delay": "8",
		"event":
		{
			"type":"scroll-and-tap",
			"startindex": "7",
			"scrollindex": "0",			
			"scrolltime": "3",
			"tapindex": "0",
			"tapDelay": "4"
		}
	},	
	{
		"type": "TypingIndicator",
		"delay": "4"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "Contul meu/ Facturi & Plati:", 
		"sender": "chatbot"
	},
	{
		"type": "QuickReplies", 
		"delay": "0.5", 
		"replies":[
			{"reply": "Factura curenta"}, 
			{"reply": "Confirmare plata"}, 
			{"reply": "Amanare plata"}, 
			{"reply": "Reemitere factura"},
			{"reply": "Factura detaliata"},
			{"reply": "Conturi IBAN"},
			{"reply": "⬅️ Inapoi"}
		]
	},
	{
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"scroll-and-tap",
			"scrollindex": "0",
			"tapindex": "0",
			"tapDelay": "3"
		}
	},	
	{
		"type": "TypingIndicator",
		"delay": "4"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "Sfarsit simulare", 
		"sender": "chatbot"
	},
	{
		"type": "WebView", 
		"delay": "2"
	}
]'

exports.carouselFlow = '[
	{
		"type": "Carousel", 
		"delay": "2", 
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
		"type": "TextBubble", 
		"delay": "2", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	}
]'

exports.allTypesFlow = '[
	{
		"type": "ChatHeader", 
		"delay": "1", 
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
		"delay": "2"
	},
	{
		"type": "TextBubble", 
		"delay": "2", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "chatbot"
	},
	{
		"type": "QuickReplies", 
		"delay": "2", 
		"replies":[
			{"reply": "No thanks"}, 
			{"reply": "Awesome"}, 
			{"reply": "Where?"}, 
			{"icon": "images/locationIcon.png", "reply": "Sounds good"}
		]
	},
	{
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"scroll-and-tap",
			"scrollindex": "1",
			"tapindex": "1",
			"tapDelay": "3"
		}
	},
	{
		"type": "TextButtons", 
		"delay": "6", 
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
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"tap",
			"tapindex": "1",
			"tapDelay": "3"
		}
	},	
	{
		"type": "TextBubble", 
		"delay": "6", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "Carousel", 
		"delay": "2", 
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
		"delay": "2",
		"event":
		{
			"type":"scroll-and-tap",
			"scrollindex": "3",
			"tapindex": "1",
			"tapDelay": "3"
		}
	},
	{
		"type": "List",
		"delay": "6",
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
		"type": "MockEvent",
		"delay": "2",
		"event":
		{
			"type":"tap",
			"tapindex": "0",
			"tapDelay": "3"
		}
	},
	{
		"type" : "Location",
		"delay" : "6",
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
		"delay": "2", 
		"text": "What about drinks tomorrow at 7?", 
		"sender": "user"
	},
	{
		"type": "Receipt",
		"delay": "2",
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