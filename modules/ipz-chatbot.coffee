ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"
IpzMessengerChat = require "ipz-messenger-chat"
utils = require "ipz-utils"

class IpzChatBot extends Layer
    @flow = undefined
    @mainView = undefined
    @chatView = undefined
    @statusBar = undefined

    constructor:(options = {}) ->
        options.name ?= "ChatBot"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        @statusBar = new ios.StatusBar

        @mainView = new IpzMessenger({superLayer:@, y:@statusBar.maxY})
        @chatView = new IpzMessengerChat({superLayer:@, y:@statusBar.maxY})

        @flow = new FlowComponent
            superLayer:@

        @flow.header = @statusBar

        @.handleEvents(@)

    gotoMain: () ->
        @flow.showNext(@mainView)

    gotoChat: (user) ->
        @flow.showNext(@chatView)
        @chatView.setUser(user)
        @.emit "ChatOpened", user

    goBack: () ->        
        @flow.showPrevious()

    setUser: (user) ->
        @mainView.setUser(user)
        ios.utils.update(@statusBar.carrier, [text:user.Carrier])
        @statusBar.carrier = user.Carrier

    appendMessage: (message, messageType) ->
        @chatView.appendMessage(message, messageType)

    appendMessage = (bot, message) ->
        bot.appendMessage(message, message.type)

    runConversationFlow: (bot, conversationFlow) ->
        conversation = JSON.parse conversationFlow
        for message in conversation
            setTimeout(appendMessage, message.delay*1000, bot, message)

    handleEvents: (bot) ->
        Screen.on "GotoMain", ->
            bot.gotoMain()

        Screen.on "GotoChat", (user)->
            bot.gotoChat(user)

        Screen.on "SendMessage", (message) ->
            userMessage = { text: message, sender: "user" }
            bot.appendMessage(userMessage, "TextBubble")

        Screen.on "GoBack", ->
            bot.goBack()

module.exports = IpzChatBot
