ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"

class IpzChatBot
    @flow = undefined
    @user = undefined
    @statusBar = undefined

    constructor:(user) ->
        @user = user

        @statusBar = new ios.StatusBar
            carrier: user.Carrier

        @flow = new FlowComponent
        @flow.header = @statusBar

    showNext: (viewName) ->
        contentView = new ios.View
            name:"mainContent"
            backgroundColor:Screen.backgroundColor
            y:@statusBar.height

        view = switch viewName
            when "Main" then new IpzMessenger(contentView, @user)
            # when "Chat" then new IpzMessengerChat(contentView)
                
        @flow.showNext(contentView)
        

module.exports = IpzChatBot