ios = require "ios-kit"
ipz = require "ipz-messenger-kit"
utils = require 'ipz-utils'

class IpzMessengerChat extends Layer
    
    @user = undefined
    @avatar = undefined

    @navBar = undefined
    @messageScroll = undefined
    
    @msgContainer = undefined
    @messageCount = 0
    @lastMessage = undefined
    @lastSender = undefined
    @msgBubble = undefined
    @typingIndicator = undefined
    
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
            borderRadius: 10
            constraints:
                width: @.width
                height: 30
                bottom: 0

        @messageScroll = new ScrollComponent
            name:"ConversationScroll"
            superLayer: @
            scrollHorizontal: false
            directionLock: true
            y: @navBar.maxY
            width: @.width - 20
            height: @.height - @navBar.height - textField.height
            maxY: textField.y
        

        textField.on Events.TouchEnd, ->
	        textField.keyboard.keys.return.on Events.Tap, ->
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""
                
            textField.keyboard.on "change:y", ->
                if textField.keyboard.maxY > Screen.height
                    textField.constraints.bottom = undefined
                    textField.maxY = textField.keyboard.y
                    # @messageScroll.maxY = textField.y
                if textField.keyboard.y == Screen.height
                    textField.keyboard.area.visible = true
                    
        Events.wrap(window).addEventListener "keydown", (event) ->
            if event.keyCode is 13
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""

    appendMessage:(message, messageType) ->
        # if last item was a typing indicator, destroy it
        if @typingIndicator != undefined
            @msgContainer.destroy()
            @typingIndicator = undefined

        if (messageType != "TextBubble" && messageType != "TypingIndicator")
            @msgBubble = undefined

        if (messageType == "ChatHeader")
            @msgContainer = new ipz.IpzChatHeader({name:"msg#{@messageCount}", superLayer: @messageScroll.content, y: @lastMessage.maxY + 10}, message.botInfo)
            @avatar = undefined
            @msgBubble = undefined
            @lastSender = undefined
        else
            @msgContainer = new Layer
                name: "msgContainer.#{@messageCount}"
                superLayer: @messageScroll.content
                width: @messageScroll.width
                y: 10
                backgroundColor: "transparent"
                            
            if (@lastMessage != undefined)
                if (@msgBubble != undefined && @lastSender != undefined && @lastSender == message.sender)
                    @msgContainer.y = @lastMessage.maxY + 3
                else
                    @msgContainer.y = @lastMessage.maxY + 10
            
            options = {name:"#{messageType}.#{@messageCount}", superLayer: @msgContainer}
            
            if (message.sender != "user")
                if (@avatar == undefined)
                    @avatar = new ipz.IpzAvatar
                        name: "Avatar.#{@messageCount}"
                        superLayer: @msgContainer 
                        x: Align.left(8)
                        scale:0.9
                    @avatar.setUser(@user)
                options.x = @avatar.maxX + 8
            else
                @avatar = undefined

            switch messageType
                when "TypingIndicator"
                    @typingIndicator = new ipz.IpzTypingIndicator(options)

                when "TextBubble"
                    stackSide = "right"
                    if (message.sender != "user")
                        stackSide = "left"

                    # merge last message
                    if (@msgBubble != undefined && @lastSender != undefined && message.sender == @lastSender)
                        @msgBubble.mergeBottom(stackSide)

                    # append new message
                    @msgBubble = new ipz.IpzTextBubble(options, message)

                    # merge new message
                    if (@lastSender != undefined && message.sender == @lastSender)
                        @msgBubble.mergeTop(stackSide)

                when "QuickReplies"
                    quicks = new ipz.IpzQuickReplies(options, message.replies)

                when "TextButtons"
                    txtButtons = new ipz.IpzChatTextButtons(options, message.buttonsContent)

                when "Carousel"
                    carousel = new ipz.IpzCarousel(options, message.carouselMessage)

                when "List"
                    list = new ipz.IpzChatList(options, message.listMessage)

                when "Location"
                    loc = new ipz.IpzLocation(options, message.location)

                when "Receipt"
                    rec = new ipz.IpzReceipt(options, message.receiptData)
            

            @msgContainer.height = @msgContainer.children[@msgContainer.children.length-1].height

            if (@avatar != undefined)
                @avatar.superLayer = @msgContainer
                @avatar.y = Align.bottom

        if (messageType != "TypingIndicator")
            @lastMessage = @msgContainer
            @lastSender = message.sender        
            @messageCount = @messageCount + 1

        if (@msgContainer.maxY > @messageScroll.maxY)
            endLayer = new Layer
                superLayer:@messageScroll.content
                height: 1
                width: 1
                backgroundColor: "transparent"
                y: @msgContainer.maxY

            @messageScroll.scrollToLayer(endLayer)

    setUser:(user) ->  
        @user = user      
        ios.utils.update(@navBar.title, [text:user.firstname + ' ' + user.lastname])

        # clear all previous messages
        utils.destroyChildren(@messageScroll.content, false)
        @messageScroll.updateContent()
        @lastMessage = undefined

        msgContent = {text:user.messageText, sender:"chatbot"}
        @.appendMessage(msgContent, "TextBubble")

    mockEvent:(customEvent) ->
        target = @lastMessage.children[@lastMessage.children.length-1]

        switch customEvent.type
            when "scroll"                
                target.scrollToLayer(target.content.children[customEvent.index])
            # when "tap"

module.exports = IpzMessengerChat