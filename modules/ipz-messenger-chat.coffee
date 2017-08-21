ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

class IpzMessengerChat extends Layer
    
    @navBar = undefined
    @messageScroll = undefined
    @lastMessage = undefined
    # @field = undefined

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

        if (@lastMessage == undefined)
            @lastMessage = new ios.Text
                superLayer: @messageScroll.content
                text: user.messageText
                lineHeight: 1.5
                y: 10
                x: Align.left
        else
            ios.utils.update(@lastMessage, [text:user.messageText])

    appendMessage:(message) ->
        msg = new ios.Text
            superLayer: @messageScroll.content
            text: message
            lineHeight: 1.5
            y: @lastMessage.maxY + 20
            x: Align.left

        @lastMessage = msg

module.exports = IpzMessengerChat