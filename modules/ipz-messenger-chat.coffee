ios = require "ios-kit"
ipz = require "ipz-messenger-kit"

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
        
        @messageScroll = new ScrollComponent
            name:"ConversationScroll"
            superLayer: @
            scrollHorizontal: false
            directionLock: true
            y: @navBar.maxY
            width: @.width
            height: @.height - @navBar.height

        @navBar.left.on Events.Tap, ->
            Screen.emit "GoBack"

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

module.exports = IpzMessengerChat