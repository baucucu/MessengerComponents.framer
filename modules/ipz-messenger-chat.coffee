ios = require "ios-kit"
ipz = require "ipz-messenger-kit"
utils = require 'ipz-utils'

class IpzMessengerChat extends Layer
    
    @user = undefined
    @avatar = undefined

    @navBar = undefined
    @messageScroll = undefined
    
    @msgContainer = undefined
    @messageCount = undefined
    @lastMessage = undefined
    @lastSender = undefined
    @msgBubble = undefined
    @typingIndicator = undefined

    @lastInteractiveMessage = undefined
    
    constructor:(options = {}) ->
        options.name ?= "Messenger.Chat"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        @navBar = new ios.NavBar
            superLayer: @
            name: 'navBar'
            left:"< Back"
            title: "Name"
            right: "Details"
            backgroundColor: "rgba(250,248,251,0.8)"

        @navBar.left.on Events.Tap, ->
            Screen.emit "GoBack"
        
        keyboard = new ios.Keyboard
            superLayer: @
            hidden:true
            returnText:"Send"

        textField = new ios.Field
            name: "inputField"
            superLayer: @
            keyboard: keyboard
            placeholder: "Type a message"
            borderRadius: 15
            lineHeight: 2            
            constraints:
                width: @.width
                height: 33
                bottom: 0

        msgScrollHeight = @.height
        msgScroll = new ScrollComponent
            name:"ConversationScroll"
            superLayer: @
            scrollHorizontal: false
            directionLock: true
            y: @navBar.maxY
            width: @.width # - 20
            height: msgScrollHeight - @navBar.height - textField.height
            maxY: textField.y
            backgroundColor: Screen.backgroundColor

        msgScroll.content.backgroundColor = Screen.backgroundColor
        @messageScroll = msgScroll
        @messageCount = 0
        
        # Keyboard and Text Input events
        textField.on Events.TouchEnd, ->
	        textField.keyboard.keys.return.on Events.Tap, ->
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""
                
            textField.keyboard.on "change:y", ->
                textField.constraints.bottom = undefined
                textField.maxY = textField.keyboard.y
                msgScroll.height = msgScrollHeight - (Screen.height - textField.y)
                msgScroll.scrollToLayer(msgScroll.content.children[msgScroll.content.children.length - 1])
                    
        Events.wrap(window).addEventListener "keydown", (event) ->
            if event.keyCode is 13
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""

    appendMessage= (chatView, message, messageType) ->
        chatView.appendMessage(message, messageType)

    appendMessage:(message, messageType) ->
        # if last item was a typing indicator, destroy it
        if @typingIndicator != undefined
            @msgContainer.destroy()
            @typingIndicator = undefined

        # if last message was not a TextBubble or TypingIndicator, don't stack messages
        if (messageType != "TextBubble" && messageType != "TypingIndicator")
            @msgBubble = undefined

        # compute distance between messages differently if they need to be stacked
        msgY = 10
        if (@lastMessage != undefined)
            # stack consecutive TextBubbles from the same sender
            if (@msgBubble != undefined && @lastSender != undefined && @lastSender == message.sender)
                msgY = @lastMessage.maxY + 3
            else
                msgY = @lastMessage.maxY + 10

        if (messageType == "ChatHeader")
            # the message container is the actual chat header
            @msgContainer = new ipz.IpzChatHeader({name:"msg#{@messageCount}", superLayer: @messageScroll.content, y: msgY}, message.botInfo)
            @avatar = undefined
            @msgBubble = undefined
            @lastSender = undefined

        else if (messageType == "WebView")
            webView = new ipz.IpzWebView({title:"TEST", left:""})
        else
            # the message container is a layer that holds the avatar and the actual chat component
            @msgContainer = new Layer
                name: "msgContainer.#{@messageCount}"
                superLayer: @messageScroll.content
                width: @messageScroll.width
                y: msgY
                backgroundColor: "transparent"
            
            options = {name:"#{messageType}.#{@messageCount}", superLayer: @msgContainer}
            
            # user messages, QuickReplies and WebViews don't display an avatar
            if (message.sender != "user" && messageType != "QuickReplies" && messageType != "WebView")
                # if previous chat component did not have an avatar, create one
                if (@avatar == undefined)
                    @avatar = new ipz.IpzAvatar
                        name: "Avatar.#{@messageCount}"
                        superLayer: @msgContainer 
                        x: Align.left(8)
                        scale:0.9
                    @avatar.setUser(@user)

                # put the avatar in the new message container
                @avatar.superLayer = @msgContainer
                options.x = @avatar.maxX + 8
            else
                @avatar = undefined

            typingDelay = message.typingDelay
            if (message.typingDelay != undefined && typingDelay > 0)
                @typingIndicator = new ipz.IpzTypingIndicator(options)
                message.typingDelay = 0
                chatView = @
                setTimeout(appendMessage, Number(typingDelay)*1000, chatView, message, messageType)
                messageType = "TypingIndicator"
            else
                switch messageType
                    when "TypingIndicator"
                        @typingIndicator = new ipz.IpzTypingIndicator(options)

                    when "TextBubble"
                        stackSide = "left"
                        if (message.sender == "user")                        
                            stackSide = "right"

                        # merge last message
                        if (@msgBubble != undefined && @lastSender != undefined && message.sender == @lastSender)
                            @msgBubble.mergeBottom(stackSide)

                        # append new message
                        @msgBubble = new ipz.IpzTextBubble(options, message)

                        # merge new message
                        if (@lastSender != undefined && message.sender == @lastSender)
                            @msgBubble.mergeTop(stackSide)

                    when "QuickReplies"
                        @lastInteractiveMessage = new ipz.IpzQuickReplies(options, message.replies)

                    when "TextButtons"
                        @lastInteractiveMessage = new ipz.IpzChatTextButtons(options, message.buttonsContent)

                    when "Carousel"
                        options.offset = options.x
                        options.x = 0
                        @lastInteractiveMessage = new ipz.IpzCarousel(options, message.carouselMessage)

                    when "List"
                        @lastInteractiveMessage = new ipz.IpzChatList(options, message.listMessage)

                    when "Location"
                        loc = new ipz.IpzLocation(options, message.location)

                    when "Receipt"
                        rec = new ipz.IpzReceipt(options, message.receiptData)
                    
            

            @msgContainer.height = @msgContainer.children[@msgContainer.children.length-1].height

            if (@avatar != undefined)                
                @avatar.y = Align.bottom

        if (messageType != "TypingIndicator" && messageType != "QuickReplies" && messageType != "WebView")
            @lastMessage = @msgContainer
            @lastSender = message.sender        
            @messageCount = @messageCount + 1

        if (messageType != "WebView" && @msgContainer.maxY > @messageScroll.maxY)
            endLayer = new Layer
                superLayer:@messageScroll.content
                height: 1
                width: 1
                backgroundColor: "transparent"
                y: @msgContainer.maxY

            @messageScroll.scrollToLayer(endLayer, 0, 1, true, time: 1)

    setUser:(user, showLastMsg) ->  
        @user = user      
        ios.utils.update(@navBar.title, [text:user.firstname + ' ' + user.lastname])

        # clear all previous messages
        utils.destroyChildren(@messageScroll.content, false)
        @messageScroll.updateContent()
        @lastMessage = undefined

        if showLastMsg == true
            msgContent = {text:user.messageText, sender:"chatbot"}
            @.appendMessage(msgContent, "TextBubble")

    mockEvent:(customEvent) ->
        target = @lastInteractiveMessage
        
        switch customEvent.type
            when "scroll-and-tap"
                target.mockScrollAndTap(customEvent)
            when "tap"
                target.mockTap(customEvent)

module.exports = IpzMessengerChat