ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"

class IpzChatBot extends Layer
    @flow = undefined
    @user = undefined
    @statusBar = undefined

    constructor:(options = {}, user) ->
        options.name ?= "ChatBot"
        options.width ?= Screen.width
        options.height ?= Screen.height
        options.backgroundColor ?= Screen.backgroundColor

        super options

        @user = user

        @statusBar = new ios.StatusBar
            carrier: user.Carrier

        @flow = new FlowComponent
            superLayer:@

        @flow.header = @statusBar

    showNext: (viewName) ->
        view = switch viewName
            when "Main" then new IpzMessenger({name:"main", y:@statusBar.height}, @user)
            # when "Chat" then new IpzMessengerChat(contentView)
                
        @flow.showNext(view)
        

module.exports = IpzChatBot