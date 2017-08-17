ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"
IpzMessengerChat = require "ipz-messenger-chat"

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

    gotoMain: () ->
        @flow.showNext(@mainView)

    setUser:(user) ->
        @mainView.setUser(user)
        ios.utils.update(@statusBar.carrier, [text:user.Carrier])
        @statusBar.carrier = user.Carrier

    gotoChat:(user) ->
        @chatView.setUser(user)
        @flow.showNext(@chatView)

    goBack:() ->        
        @flow.showPrevious()

    appendMessage:(message) ->
        @chatView.appendMessage(message)

module.exports = IpzChatBot
