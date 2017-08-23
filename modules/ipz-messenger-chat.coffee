ios = require "ios-kit"
ipz = require "ipz-messenger-kit"
utils = require 'ipz-utils'

class IpzMessengerChat extends Layer
    
    @navBar = undefined
    @messageScroll = undefined
    @lastMessage = undefined

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
        
        @messageScroll = new ScrollComponent
            name:"ConversationScroll"
            superLayer: @
            scrollHorizontal: false
            directionLock: true
            y: @navBar.maxY
            width: @.width
            height: @.height - @navBar.height
            
        keyboard = new ios.Keyboard
            superLayer: @
            hidden:true
            returnText:"Send"

        textField = new ios.Field
            name: "inputField"
            superLayer: @
            keyboard: keyboard
            placeholder: "Type a message"
            borderRadius: 2
            constraints:
                width: @.width
                height: 30
                bottom: 0

        textField.on Events.TouchEnd, ->
	        textField.keyboard.keys.return.on Events.Tap, ->
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""
                
            textField.keyboard.on "change:y", ->
                if textField.keyboard.maxY > Screen.height
                    textField.constraints.bottom = undefined
                    textField.maxY = textField.keyboard.y
                if textField.keyboard.y == Screen.height
                    textField.keyboard.area.visible = true
                    
        Events.wrap(window).addEventListener "keydown", (event) ->
            if event.keyCode is 13
                if textField.text.html.length>0
                    Screen.emit "SendMessage", textField.text.html
                    textField.text.html = ""


    setUser:(user) ->        
        ios.utils.update(@navBar.title, [text:user.firstname + ' ' + user.lastname])

        # clear all previous messages
        utils.destroyChildren(@messageScroll.content, false)
        @messageScroll.updateContent()
        @lastMessage = undefined

        if (@lastMessage == undefined)
            msgContent = {text:user.messageText, sender:"chatbot"}
            @lastMessage = new ipz.IpzTextBubble({superLayer: @messageScroll.content, y:10}, msgContent)
        else
            @lastMessage.text = user.messageText

    appendMessage:(message, messageType) ->
        options = {superLayer: @messageScroll.content, y: @lastMessage.maxY + 10}

        switch messageType
            when "ChatHeader"
                chatHeader = new ipz.IpzChatHeader(options, message)
                @lastMessage = chatHeader
            when "TypingIndicator"
                typingIndicator = new ipz.IpzTypingIndicator(options)
                @lastMessage = typingIndicator
            when "TextBubble"
                msgBubble = new ipz.IpzTextBubble(options, message)
                @lastMessage = msgBubble
            when "QuickReplies"
                quicks = new ipz.IpzQuickReplies(options, message)
                @lastMessage = quicks
            when "TextButtons"
                txtButtons = new ipz.IpzChatTextButtons(options, message)
                @lastMessage = txtButtons
            when "Carousel"
                carousel = new ipz.IpzCarousel(options, message)
                @lastMessage = carousel
            when "List"
                list = new ipz.IpzChatList(options, message)
                @lastMessage = list
            when "Location"
                loc = new ipz.IpzLocation(options, message)
                @lastMessage = loc
            when "Receipt"
                rec = new ipz.IpzReceipt(options, message)
                @lastMessage = rec
                
        @messageScroll.scrollToLayer(@lastMessage)

module.exports = IpzMessengerChat