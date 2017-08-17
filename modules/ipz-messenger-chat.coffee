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

        field = new ios.Field
            name:"inputField"
            superLayer: @
            placeholder:"Type a message"
            constraints:
                width: @.width
                height: 30
                bottom: 0

        field.on Events.TouchEnd, ->
	        field.keyboard.keys.return.on Events.Tap, ->
                Screen.emit "SendMessage", field.text.html


    setUser:(user) ->
        
        ios.utils.update(@navBar.title, [text:user.firstname + ' ' + user.lastname])

        if (@lastMessage != undefined)
            @lastMessage.destroy()
            @lastMessage = undefined

        @lastMessage = new ios.Text
            superLayer: @messageScroll.content
            text: user.messageText
            lineHeight: 1.5
            y: 10
            x: Align.left

    appendMessage:(message) ->
        msg = new ios.Text
            superLayer: @messageScroll.content
            text: message
            lineHeight: 1.5
            y: @lastMessage.maxY + 20
            x: Align.left

        @lastMessage = msg

module.exports = IpzMessengerChat