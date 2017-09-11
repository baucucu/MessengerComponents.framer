
tab = require 'ipz-messenger-tab-bar'
kit = require 'messenger-kit'
chatUI = require 'chatUI'
webView = require 'ipz-webview'

exports.IpzMessengerHome = require "ipz-messenger-home"
exports.IpzMessengerSearchBox = require "ipz-messenger-searchBox"
exports.IpzMessengerKeyboard = require "ipz-messenger-keyboard"

exports.IpzMessengerTab = tab.tab
exports.IpzMessengerTabBar = tab.bar

exports.IpzAvatar = kit.Avatar
exports.IpzMessageList = kit.MessageList
exports.IpzMessageListItem = kit.MessageListItem
exports.IpzActiveFriendsScrollList = kit.ActiveFriendsScrollList
exports.IpzActiveFriends = kit.ActiveFriends
exports.IpzMyDay = kit.MyDays

exports.IpzTextBubble = chatUI.TextBubble
exports.IpzQuickReply = chatUI.QuickReply
exports.IpzQuickReplies = chatUI.QuickReplies
exports.IpzChatButton = chatUI.Buttons
exports.IpzChatTextButtons = chatUI.TextButtons
exports.IpzChatCard = chatUI.Card
exports.IpzCarousel = chatUI.Carousel
exports.IpzTypingIndicator = chatUI.TypingIndicator
exports.IpzChatHeader = chatUI.ChatHeader
exports.IpzChatListItem = chatUI.ListItem
exports.IpzChatList = chatUI.List
exports.IpzLocation = chatUI.Location
exports.IpzReceiptItem = chatUI.ReceiptItem
exports.IpzReceipt = chatUI.Receipt
exports.IpzWebView = webView.WebView

# TODO create a separate global module for all Styles
exports.style = kit.style