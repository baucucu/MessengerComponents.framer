ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"
# StatusBarLayer = require "StatusBarLayer"

class IpzChatBot extends Layer
    @flow = undefined
    @view = undefined
    @statusBar = undefined

    constructor:(options = {}) ->
        options.name ?= "ChatBot"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        @statusBar = new ios.StatusBar #new StatusBarLayer

        @flow = new FlowComponent
            superLayer:@

        @flow.header = @statusBar

    showNext: (viewName) ->
        @view = switch viewName
            when "Main" then new IpzMessenger({superLayer:@, name:"main", y:@statusBar.maxY})
            # when "Chat" then new IpzMessengerChat(contentView)

        @flow.showNext(@view)

    setUser:(user) ->
        @view.setUser(user)
        @statusBar.carrier = user.Carrier


module.exports = IpzChatBot
