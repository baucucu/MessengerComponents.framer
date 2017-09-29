ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"
IpzMessengerChat = require "ipz-messenger-chat"
utils = require "ipz-utils"

class IpzChatBot extends Layer
    
    constructor:(options = {}) ->
        options.name ?= "ChatBot"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= "rgba(250,248,251,0.8)"

        super options

        options.showStatusBar ?= true

        viewY = @.y
        if options.showStatusBar is true
            # @statusBar = new ios.StatusBar
            @statusBar = new Layer
                name:"StatusBar"
                width : Screen.width
                height : 22
                style: "background" : "url(images/StatusBar_iOS.png) 10px 10px/98% auto no-repeat"
            viewY = @statusBar.maxY

        @mainView = new IpzMessenger({superLayer:@, y:viewY})
        @chatView = new IpzMessengerChat({superLayer:@, y:viewY})

        @flow = new FlowComponent
            superLayer:@

        if options.showStatusBar is true
            @flow.header = @statusBar

        @commands = []
        @.handleEvents(@)

    gotoMain: () ->
        @flow.showNext(@mainView)

    gotoChat: (user) ->    
        if (@flow.current != @chatView)        
            @flow.showNext(@chatView)
            @chatView.setUser(user, false)
            @.emit "ChatOpened", user

    goBack: () ->
        for c in @commands
            clearTimeout(c)
        @commands = []

        @flow.showPrevious()

    setUser: (user) ->
        @mainView.setUser(user)

        # if (@statusBar != undefined)
        #     ios.utils.update(@statusBar.carrier, [text:user.Carrier])
        #     @statusBar.carrier = user.Carrier


    appendMessage: (message, messageType) ->
        @chatView.appendMessage(message, messageType)

    mockEvent: (customEvent) ->
        @chatView.mockEvent(customEvent)
    
    pushCommand: (c) ->
        @commands.push(c)


    handleConversationItem = (bot, item) ->
        if item.type == "MockEvent"
            bot.mockEvent(item.event)
        else
            bot.appendMessage(item, item.type)

    
    runConversationFlow: (bot, conversationFlow) ->
        conversation = JSON.parse conversationFlow
        totalDelay = 0
        for item in conversation
            totalDelay = totalDelay + Number(item.delay)
            bot.pushCommand(setTimeout(handleConversationItem, totalDelay*1000, bot, item))



    handleEvents: (bot) ->
        Screen.on "GotoMain", ->
            bot.gotoMain()

        Screen.on "GotoChat", (user)->
            if (user.flow != undefined)
                bot.gotoChat(user)

        Screen.on "SendMessage", (message) ->
            userMessage = { text: message, sender: "user" }
            bot.appendMessage(userMessage, "TextBubble")

        Screen.on "GoBack", ->
            bot.goBack()

module.exports = IpzChatBot
