
nav = require 'ipz-messenger-nav-bar'
tab = require 'ipz-messenger-tab-bar'
kit = require 'messenger-kit'
chatUI = require 'chatUI'

exports.IpzMessengerHome = require "ipz-messenger-home"
exports.IpzMessengerCalls = require "ipz-messenger-calls"
exports.IpzMessengerSearchBox = require "ipz-messenger-searchBox"

exports.IpzMessengerNavBar = nav.create
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

# TODO create a separate global module for all Styles
exports.style = kit.style