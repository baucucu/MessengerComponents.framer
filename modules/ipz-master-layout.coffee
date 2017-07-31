ios = require "ios-kit"
IpzMessenger = require "ipz-messenger"

class MasterLayout
    
    @contentView = undefined
    
    constructor:() ->
        mainView = new ios.View
            name:"mainView"
            width:Screen.width
            backgroundColor:Screen.backgroundColor

        statusBar = new ios.StatusBar
            superLayer: mainView
            carrier: "VodafoneRO"

        
        @contentView = new ios.View
            # y:statusBar.height
            # width:Screen.width
            name:"mainContent"
            backgroundColor:Screen.backgroundColor
            constraints:
                top: statusBar.height
                leading:0
                trailing:Screen.width
        
        # keyboard = new ios.Keyboard
        #     hidden:true

    openApp:(appName) ->
        switch appName
            when "Messenger"
                app = new IpzMessenger(@contentView)
                return app

module.exports = MasterLayout
