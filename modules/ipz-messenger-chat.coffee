ios = require "ios-kit"
ipz = require "ipz-messenger-kit"
utils = require 'ipz-utils'

class IpzMessengerChat extends Layer
        
    constructor:(options = {}) ->
        options.name ?= "Messenger.Chat"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        navBar = new ios.NavBar
            superLayer: @
            name: 'navBar'
            left:"< Home"
            title: "Name"                             
            right: "Manage"            
            backgroundColor: "rgba(250,248,251,0.8)"
        @navBar = navBar
        
        @replyTime  = new TextLayer
            superLayer: @navBar        
            y: Align.top(-35)
            name: 'reply'
            text: 'Typically replies instantly'
            lineHeight: 14
            fontSize: 12
            fontFamily: "San Francisco, sans-serif" 
            letterSpacing: 0.0                       
            width: @.width
            height: @.height
            textAlign:'center'
            backgroundColor: 'transparent'            
        

        textField = new TextLayer
            name: "inputField"
            text: "Type a message"
            superLayer: @           
            lineHeight: 2
            fontSize: 14
            fontFamily: "San Francisco, sans-serif"         
            backgroundColor: "#F6F7FB"            
            width: @.width
            height: 55
            x: 0
            y: Align.bottom(0) 
            style: "background" : "url(images/chat-view-input2.png) 0px 0px/100% auto no-repeat"
            padding:
                top: 15
                left: 150 + Framer.Device.context.devicePixelRatio * 20

        @textField = textField

        msgScrollHeight = @.height
        msgScroll = new ScrollComponent
            name:"ConversationScroll"
            superLayer: @
            scrollHorizontal: false
            directionLock: true
            y: @navBar.maxY
            width: @.width
            backgroundColor: Screen.backgroundColor
            maxY: textField.y
            height: msgScrollHeight - @navBar.height - textField.height
        
        msgScroll.content.backgroundColor = Screen.backgroundColor
        @messageScroll = msgScroll
        @messageCount = 0

        webView = new ipz.IpzWebView
            superLayer: @
            left:""
            height: msgScrollHeight
            y:0
            visible: false
        @webView = webView

        keyboard = new ipz.IpzMessengerKeyboard
            superLayer:@
        @keyboard = keyboard

        keyboard.on "change:y", ->
            textField.maxY = keyboard.y
            msgScroll.height = msgScrollHeight - navBar.height - (Screen.height - textField.y)
            msgScroll.scrollToLayer(msgScroll.content.children[msgScroll.content.children.length - 1])
            webView.height = msgScrollHeight - (Screen.height - keyboard.y)

        keyboard.on "TypeLetter", (customJs, message, index) ->
            if (webView.visible == true)
                letters = message.substr 0, index
                webView.mockSendCustomJs(customJs.replace "{0}", letters)

        textField.on Events.TouchEnd, ->
            keyboard.show()

        @navBar.left.on Events.Tap, ->
            keyboard.hide()
            Screen.emit "GoBack"        
        
        msgScroll.on Events.TouchEnd, ->
            keyboard.hide(false)

    appendMessage= (chatView, message, messageType) ->
        chatView.appendMessage(message, messageType)

    appendMessage:(message, messageType) ->
        # if last item was a typing indicator, destroy it
        if @typingIndicator != undefined
            @msgContainer.destroy()
            @typingIndicator = undefined

        # if last message was not a TextBubble or TypingIndicator, don't stack messages
        if (messageType != "TextBubble" && messageType != "TypingIndicator" && messageType != "QuickReplies")
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
            @webView.setTitle(message.title)
            @webView.setContent(message.content, Framer.Device.context.devicePixelRatio)
            @webView.visible = true
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
                        carousel = new ipz.IpzCarousel(options, message.carouselMessage)
                        avatar = @avatar

                        carousel.onScroll ->
                            if (avatar != undefined)
                                avatar.visible = (carousel.content.x + options.offset >= 0)

                        @lastInteractiveMessage = carousel

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
        @navBar.title.y = Align.top(6)        
        @navBar.left.y = Align.center(4)
        @navBar.left.x = Align.left(26) 
        @navBar.right.y = Align.center(4)
        @navBar.right.x = Align.right(-11) 
        @navBar.title.lineHeight = 25
        @navBar.title.fontSize = 10  
        @navBar.title.color = "#111111"            
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
            when "type"
                @keyboard.show()
                @keyboard.mockTyping(@textField, customEvent)
            when "close-webview"
                @webView.mockClose()
            when "send-custom-js-to-webview"
                @webView.mockSendCustomJs(customEvent.customJs)


module.exports = IpzMessengerChat