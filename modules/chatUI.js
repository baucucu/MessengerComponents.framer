var Buttons, Card, Carousel, ChatHeader, List, ListItem, Location, QuickReplies, QuickReply, Receipt, ReceiptItem, TextBubble, TextButtons, TypingIndicator, receiptSampleData, replies,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextBubble = (function(superClass) {
  extend(TextBubble, superClass);

  function TextBubble(options, message) {
    if (options == null) {
      options = {};
    }
    options.text = message.text;
    options.sender = message.sender;
    options.borderRadius = 18;
    options.fontSize = 17;
    options.padding = {
      vertical: 8,
      horizontal: 12
    };
    TextBubble.__super__.constructor.call(this, options);
    this.states = {
      chatbot: {
        backgroundColor: "#F1F0F0",
        x: Align.left,
        color: "#000000"
      },
      user: {
        backgroundColor: "#0084FF",
        x: Align.right,
        color: "#FFFFFF"
      },
      button: {
        backgroundColor: "#F1F0F0",
        x: Align.left,
        width: 256,
        color: "#000000",
        borderRadius: {
          bottomLeft: 0,
          bottomRight: 0
        }
      }
    };
    this.maxWidth();
    this.stateSwitch(options.sender);
  }

  TextBubble.prototype.maxWidth = function() {
    if (this.width > 256) {
      return this.width = 256;
    }
  };

  return TextBubble;

})(TextLayer);

exports.TextBubble = TextBubble;

QuickReply = (function(superClass) {
  extend(QuickReply, superClass);

  function QuickReply(options, reply) {
    var icon;
    if (options == null) {
      options = {};
    }
    if (options.icon === void 0) {
      options.iconWidth = 0;
    } else {
      options.iconWidth = 24;
    }
    options.text = reply;
    options.fontSize = 17;
    options.color = "#0084FF";
    options.padding = {
      vertical: 8,
      left: 12 + options.iconWidth,
      right: 12
    };
    options.borderColor = "#0084FF";
    options.borderWidth = 1;
    options.borderRadius = 18;
    QuickReply.__super__.constructor.call(this, options);
    this.onTap(function() {
      return print(options.text);
    });
    if (options.icon !== void 0) {
      icon = new Layer({
        parent: this,
        x: 6,
        y: 6,
        width: 24,
        height: 24,
        image: options.icon
      });
    }
  }

  return QuickReply;

})(TextLayer);

QuickReplies = (function(superClass) {
  extend(QuickReplies, superClass);

  function QuickReplies(options, replies) {
    if (options == null) {
      options = {};
    }
    options.scrollVertical = false;
    options.directionLock = true;
    options.width = Screen.width;
    QuickReplies.__super__.constructor.call(this, options);
    this.appendReplies(replies);
    this.scrollable();
  }

  QuickReplies.prototype.scrollable = function() {
    if (this.content.width < Screen.width + 1) {
      this.scrollHorizontal = false;
      return this.x = Align.center;
    }
  };

  QuickReplies.prototype.appendReplies = function(replies) {
    var container, index, j, len, quickReply, reply;
    container = new Layer({
      backgroundColor: "transparent",
      width: 0
    });
    for (index = j = 0, len = replies.length; j < len; index = ++j) {
      reply = replies[index];
      quickReply = new QuickReply({
        icon: reply.icon,
        parent: container
      }, reply.reply);
      container.width += quickReply.width + 12;
      if (container.width < 375) {
        container.x = Align.center;
      } else {
        container.x = Align.left();
      }
      if (index !== 0) {
        quickReply.x = container.children[index - 1].maxX + 12;
      }
    }
    container.height = quickReply.height;
    container.parent = this.content;
    return this.contentInset = {
      right: 0,
      left: 0
    };
  };

  return QuickReplies;

})(ScrollComponent);

replies = [
  {
    icon: "images/locationIcon.png",
    reply: "No thanks"
  }, {
    icon: void 0,
    reply: "No thanks"
  }, {
    icon: void 0,
    reply: "No thanks"
  }, {
    icon: "images/locationIcon.png",
    reply: "No thanks"
  }
];

Buttons = (function(superClass) {
  extend(Buttons, superClass);

  function Buttons(options, buttons) {
    var button, index, j, len;
    if (options == null) {
      options = {};
    }
    options.backgroundColor = "#FFFFFF";
    options.width = 256;
    options.height = 0;
    Buttons.__super__.constructor.call(this, options);
    for (index = j = 0, len = buttons.length; j < len; index = ++j) {
      button = buttons[index];
      button = new TextLayer({
        parent: this,
        text: buttons[index],
        x: Align.left(),
        y: index * 45,
        height: 45,
        backgroundColor: "#FFFFFF",
        fontSize: 17,
        color: "#0084FF",
        borderWidth: 0.5,
        borderColor: "#F1F0F0"
      });
      this.height += button.height;
      button.padding = {
        horizontal: (256 - button.width) / 2,
        vertical: 10
      };
      button.onTap(function() {
        return print(this.text);
      });
    }
    button.borderRadius = {
      bottomLeft: 18,
      bottomRight: 18
    };
  }

  return Buttons;

})(Layer);

exports.Buttons = Buttons;

TextButtons = (function(superClass) {
  extend(TextButtons, superClass);

  function TextButtons(options, message) {
    var buttons, textBubble;
    if (options == null) {
      options = {};
    }
    options.backgroundColor = "transparent";
    options.width = options.height = 0;
    TextButtons.__super__.constructor.call(this, options);
    textBubble = new TextBubble({
      parent: this
    }, message.message);
    buttons = new Buttons({
      parent: this,
      y: textBubble.maxY
    }, message.buttons);
  }

  return TextButtons;

})(Layer);

exports.TextButtons = TextButtons;

Card = (function(superClass) {
  extend(Card, superClass);

  function Card(options, message) {
    var buttons, image, j, layer, len, ref, subtitle, title, titles;
    if (options == null) {
      options = {};
    }
    options.x = Align.left(options.padding);
    options.width = 256;
    options.borderRadius = 18;
    options.borderColor = "#F1F0FF0";
    options.clip = true;
    Card.__super__.constructor.call(this, options);
    this.states = {
      left: {
        borderRadius: {
          topRight: 4
        }
      },
      middle: {
        borderRadius: {
          topRight: 4,
          topLeft: 4
        }
      },
      right: {
        borderRadius: {
          topLeft: 4
        }
      }
    };
    image = new Layer({
      parent: this,
      image: message.image,
      width: 256,
      height: 256 / 1.9
    });
    image.onTap(function() {
      return print("image");
    });
    titles = new Layer({
      parent: this,
      y: image.maxY,
      width: 256,
      backgroundColor: "#FFFFFF",
      borderColor: "#F1F0F0",
      borderWidth: 0.5
    });
    titles.onTap(function() {
      return print("titles");
    });
    title = new TextLayer({
      parent: titles,
      text: message.title,
      fontSize: 14,
      fontWeight: "medium",
      x: Align.left(12),
      y: Align.top,
      width: 256,
      color: "#000000",
      padding: {
        top: 8
      }
    });
    subtitle = new TextLayer({
      parent: titles,
      text: "Subtitle\nSubtitle\nSubtitle",
      x: Align.left(12),
      y: title.maxY,
      width: 256,
      fontSize: 13,
      color: "#666666",
      padding: {
        bottom: 8
      }
    });
    titles.height = subtitle.maxY;
    buttons = new Buttons({
      parent: this,
      y: titles.maxY
    }, message.buttons);
    this.height = 0;
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      this.height += layer.height;
    }
  }

  return Card;

})(Layer);

exports.Card = Card;

Carousel = (function(superClass) {
  extend(Carousel, superClass);

  function Carousel(options, message) {
    var card, index, j, len;
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.scrollVertical = false;
    options.directionLock = true;
    Carousel.__super__.constructor.call(this, options);
    for (index = j = 0, len = message.length; j < len; index = ++j) {
      card = message[index];
      card = new Card({
        parent: this.content
      }, message[index]);
      card.x = index * (card.width + 4);
    }
    this.height = card.height;
    this.content.width = message.lenght * card.width;
    this.contentInset = {
      right: 0,
      left: 0
    };
    this.fitCards();
  }

  Carousel.prototype.fitCards = function(options) {
    var card, cards, index, j, len, results;
    if (options == null) {
      options = {};
    }
    cards = this.content.children;
    results = [];
    for (index = j = 0, len = cards.length; j < len; index = ++j) {
      card = cards[index];
      if (index === 0) {
        results.push(card.animate("left"));
      } else if (index === Object.keys(cards).length - 1) {
        results.push(card.animate("right"));
      } else {
        results.push(card.animate("middle"));
      }
    }
    return results;
  };

  return Carousel;

})(ScrollComponent);

exports.Carousel = Carousel;

TypingIndicator = (function(superClass) {
  extend(TypingIndicator, superClass);

  function TypingIndicator(options) {
    var dot, i, j;
    if (options == null) {
      options = {};
    }
    options.height = 36;
    options.width = 50;
    options.borderRadius = 18;
    options.backgroundColor = "#F1F0F0";
    TypingIndicator.__super__.constructor.call(this, options);
    for (i = j = 0; j <= 2; i = ++j) {
      dot = new Layer({
        parent: this,
        backgroundColor: "#939393",
        width: 7,
        height: 7,
        borderRadius: 100,
        y: Align.center,
        x: 10 + i * 12
      });
      dot.states = {
        up: {
          y: Align.center(-8)
        },
        down: {
          y: Align.center
        }
      };
    }
    this.moveDots(this.children);
  }

  TypingIndicator.prototype.moveDots = function(dots) {
    return Utils.interval(0.5, function() {
      Utils.delay(0, function() {
        return dots[0].stateCycle();
      });
      Utils.delay(0.2, function() {
        return dots[1].stateCycle();
      });
      return Utils.delay(0.4, function() {
        return dots[2].stateCycle();
      });
    });
  };

  return TypingIndicator;

})(Layer);

exports.TypingIndicator = TypingIndicator;

ChatHeader = (function(superClass) {
  extend(ChatHeader, superClass);

  function ChatHeader(options, bot) {
    var avatar, botCategory, botDetails, botFans, botName;
    if (options == null) {
      options = {};
    }
    options.width = Screen.width;
    options.height = 128;
    options.backgroundColor = "transparent";
    options.borderColor = "#F1F0F0";
    options.borderWidth = 1;
    ChatHeader.__super__.constructor.call(this, options);
    avatar = new Layer({
      parent: this,
      width: 80,
      height: 80,
      x: Align.left(12),
      y: Align.center,
      borderRadius: 100,
      image: bot.botAvatar
    });
    botDetails = new Layer({
      parent: this,
      height: 80,
      y: Align.center,
      x: Align.left(avatar.maxX + 16),
      backgroundColor: "#FFFFFF"
    });
    botName = new TextLayer({
      parent: botDetails,
      text: bot.botName,
      y: Align.top,
      fontSize: 21,
      fontWeight: "light",
      color: "#000000"
    });
    botFans = new TextLayer({
      parent: botDetails,
      y: Align.center,
      fontSize: 14,
      color: "#000000",
      text: bot.botFans
    });
    botCategory = new TextLayer({
      parent: botDetails,
      text: bot.botCategory,
      y: Align.bottom(-5),
      fontSize: 14,
      color: "#ABABAB"
    });
  }

  return ChatHeader;

})(Layer);

exports.ChatHeader = ChatHeader;

ListItem = (function(superClass) {
  extend(ListItem, superClass);

  function ListItem(options, item) {
    var image, itemButton, itemDetails, itemLink, itemSubtitle, itemTitle, items, lastItem;
    if (options == null) {
      options = {};
    }
    options.name = "listItem";
    options.width = 256;
    options.clip = true;
    options.backgroundColor = "trasparent";
    options.borderColor = "F1F0F0";
    options.borderWidth = 1;
    ListItem.__super__.constructor.call(this, options);
    this.states = {
      header: {
        height: 139,
        borderRadius: {
          topRight: 18,
          topLeft: 18
        }
      },
      regular: {
        height: 97
      }
    };
    itemDetails = new Layer({
      x: Align.left(8),
      height: 0,
      width: 200,
      backgroundColor: "transparent",
      parent: this
    });
    itemTitle = new TextLayer({
      parent: itemDetails,
      text: item.title,
      fontSize: 12,
      fontWeight: "medium",
      color: "#000000"
    });
    itemSubtitle = new TextLayer({
      parent: itemDetails,
      text: item.subtitle,
      fontSize: 11,
      color: "#666666",
      y: itemTitle.maxY
    });
    itemDetails.height += itemTitle.height + itemSubtitle.height;
    if (item.link !== null) {
      itemLink = new TextLayer({
        parent: itemDetails,
        y: itemSubtitle.maxY,
        fontSize: 10,
        color: "#666666",
        text: item.link
      });
      itemDetails.height += itemLink.height;
    }
    if (item.button !== null) {
      items = itemDetails.children;
      lastItem = Object.keys(items).lenght - 1;
      itemButton = new TextLayer({
        parent: itemDetails,
        y: this.children[0].children[Object.keys(this.children[0].children).length - 1].maxY + 4,
        fontSize: 12,
        color: "#037AFF",
        text: item.button,
        borderColor: "#037AFF",
        borderWidth: 0.5,
        borderRadius: 4,
        padding: {
          vertical: 2,
          horizontal: 4
        }
      });
      itemDetails.height += itemButton.height;
    }
    image = new Layer({
      parent: this,
      width: 70,
      height: 70,
      x: Align.right(-11),
      y: Align.center,
      image: item.image
    });
    itemDetails.states = {
      header: {
        y: Align.bottom(-8)
      },
      regular: {
        y: Align.center
      }
    };
    itemTitle.states = {
      header: {
        color: "#FFFFFF"
      },
      regular: {
        color: "#000000"
      }
    };
    itemSubtitle.states = {
      header: {
        color: "#FFFFFF"
      },
      regular: {
        color: "#666666"
      }
    };
    itemLink.states = {
      header: {
        color: "#FFFFFF"
      },
      regular: {
        color: "#666666"
      }
    };
    itemButton.states = {
      header: {
        color: "#FFFFFF",
        borderColor: "#FFFFFF"
      },
      regular: {
        color: "#037AFF",
        borderColor: "#037AFF"
      }
    };
    image.states = {
      header: {
        x: 0,
        y: 0,
        z: -1,
        width: 256,
        height: 137,
        brightness: 50
      },
      regular: {
        x: Align.right(-8),
        y: Align.center,
        width: 70,
        height: 70,
        borderRadius: 4,
        brightness: 100
      }
    };
    this.stateSwitch("" + item.state);
    itemDetails.stateSwitch("" + item.state);
    itemTitle.stateSwitch("" + item.state);
    itemSubtitle.stateSwitch("" + item.state);
    itemLink.stateSwitch("" + item.state);
    itemButton.stateSwitch("" + item.state);
    image.stateSwitch("" + item.state);
    this.onTap(function() {
      return print(this.children[0].children[0].font);
    });
    itemDetails.y = Align.center;
  }

  return ListItem;

})(Layer);

exports.ListItem = ListItem;

List = (function(superClass) {
  extend(List, superClass);

  function List(options, message) {
    var button, index, item, j, len, listItem, ref;
    if (options == null) {
      options = {};
    }
    options.width = 256;
    options.height = 0;
    options.backgroundColor = "transparent";
    List.__super__.constructor.call(this, options);
    ref = message.items;
    for (index = j = 0, len = ref.length; j < len; index = ++j) {
      item = ref[index];
      listItem = new ListItem({
        parent: this
      }, item);
      this.height += listItem.height;
      if (index !== 0) {
        listItem.y = this.children[index - 1].maxY;
      }
    }
    button = new Buttons({
      parent: this,
      y: listItem.maxY
    }, message.button);
    this.height += button.height;
  }

  return List;

})(Layer);

exports.List = List;

Location = (function(superClass) {
  extend(Location, superClass);

  function Location(options, location) {
    var label, map, subtitle, title;
    if (options == null) {
      options = {};
    }
    options.backgroundColor = "transparent";
    Location.__super__.constructor.call(this, options);
    map = new Layer({
      parent: this,
      borderRadius: {
        topLeft: 18,
        topRight: 18
      },
      width: 256,
      height: Math.round(255 / 1.9),
      borderColor: "#EBEBEB",
      borderWidth: 1
    });
    map.image = "https://maps.googleapis.com/maps/api/staticmap?center=" + location.name + "&zoom=" + location.zoom + "&scale=" + location.scale + "&size=" + map.width + "x" + map.height + "&maptype=roadmap&format=png&visual_refresh=true";
    label = new Layer({
      parent: this,
      width: 256,
      height: 53,
      y: map.maxY,
      backgroundColor: "#ffffff",
      borderRadius: {
        bottomLeft: 18,
        bottomRight: 18
      },
      borderColor: "#EBEBEB",
      borderWidth: 1
    });
    title = new TextLayer({
      text: "" + location.name,
      color: "#000000",
      x: 12,
      y: 8,
      parent: label,
      fontSize: 14,
      fontWeight: "medium"
    });
    subtitle = new TextLayer({
      text: "" + location.subtitle,
      y: title.maxY,
      x: 12,
      parent: label,
      fontSize: 13,
      color: "#000000"
    });
    this.width = map.width;
    this.height = map.height + label.height;
    this.onTap(function() {
      return print(this);
    });
  }

  return Location;

})(Layer);

exports.Location = Location;

ReceiptItem = (function(superClass) {
  extend(ReceiptItem, superClass);

  function ReceiptItem(options, item) {
    var productData, productImage, productQty, productSubtitle, productTitle;
    if (options == null) {
      options = {};
    }
    options.height = 70;
    options.width = 242;
    options.backgroundColor = "transparent";
    ReceiptItem.__super__.constructor.call(this, options);
    productImage = new Layer({
      parent: this,
      width: 70,
      height: 70,
      image: item.image,
      borderColor: "#EBEBEB",
      borderWidth: 1,
      borderRadius: 2
    });
    productData = new Layer({
      width: 164,
      parent: this,
      x: productImage.maxX + 8,
      y: Align.center,
      backgroundColor: "transparent"
    });
    productTitle = new TextLayer({
      textAlign: Align.left,
      parent: productData,
      text: item.title,
      fontSize: 14,
      fontWeight: "bold",
      color: "#000000"
    });
    productSubtitle = new TextLayer({
      parent: productData,
      color: "#666666",
      text: item.description,
      x: productTitle.x,
      y: productTitle.maxY,
      fontSize: 13,
      height: 14,
      width: 164,
      truncate: true
    });
    productQty = new TextLayer({
      parent: productData,
      text: "Qty. " + item.quantity,
      y: productSubtitle.maxY,
      x: productTitle.x,
      color: "#666666",
      fontSize: 13,
      height: 14,
      width: 164,
      truncate: true
    });
    productData.height = productTitle.height + productSubtitle.height + productQty.height;
    productData.y = Align.center;
  }

  return ReceiptItem;

})(Layer);

Receipt = (function(superClass) {
  extend(Receipt, superClass);

  function Receipt(options, receipt) {
    var index, item, j, k, layer, len, len1, paymentDetails, paymentDetailsLabel, paymentMethod, products, ref, ref1, shippingAddress, shippingDetails, shippingDetailsLabel, title, total, totalCost, totalLabel;
    if (options == null) {
      options = {};
    }
    options.width = 256;
    options.borderWidth = 1;
    options.borderColor = "#EBEBEB";
    options.backgroundColor = "transparent";
    options.borderRadius = 18;
    options.totalCost = 0;
    Receipt.__super__.constructor.call(this, options);
    title = new TextLayer({
      parent: this,
      text: "Order confirmation",
      fontSize: 14,
      color: "#666666",
      width: this.width,
      padding: {
        left: 12,
        top: 12,
        bottom: 12
      },
      borderColor: "#EBEBEB",
      borderWidth: 1,
      borderRadius: {
        topLeft: 18,
        topRight: 18
      }
    });
    products = new Layer({
      height: 0,
      backgroundColor: "transparent",
      parent: this,
      y: title.maxY + 8,
      width: 230,
      x: Align.center
    });
    ref = receipt.products;
    for (index = j = 0, len = ref.length; j < len; index = ++j) {
      item = ref[index];
      options.totalCost += item.itemPrice * item.quantity;
      item = new ReceiptItem({
        parent: products,
        y: index * 78
      }, item);
      products.height += item.height + 8;
    }
    paymentDetails = new Layer({
      parent: this,
      width: 230,
      y: products.maxY + 8,
      x: products.x,
      backgroundColor: "transparent"
    });
    paymentDetailsLabel = new TextLayer({
      text: "Paid with",
      parent: paymentDetails,
      fontSize: 13,
      color: "#666666"
    });
    paymentMethod = new TextLayer({
      parent: paymentDetails,
      fontSize: 13,
      color: "#000000",
      text: receipt.paymentMethod,
      y: paymentDetailsLabel.maxY
    });
    paymentDetails.height = paymentMethod.height + paymentDetailsLabel.height;
    shippingDetails = new Layer({
      parent: this,
      width: 230,
      x: products.x,
      y: paymentDetails.maxY + 8,
      backgroundColor: "transparent"
    });
    shippingDetailsLabel = new TextLayer({
      text: "Ship to",
      parent: shippingDetails,
      fontSize: 13,
      color: "#666666"
    });
    shippingAddress = new TextLayer({
      text: receipt.shipTo,
      parent: shippingDetails,
      fontSize: 13,
      color: "#000000",
      y: shippingDetailsLabel.maxY
    });
    shippingDetails.height = shippingDetailsLabel.height + shippingAddress.height;
    total = new Layer({
      parent: this,
      width: this.width,
      y: shippingDetails.maxY + 12,
      borderColor: "#EBEBEB",
      borderWidth: 1,
      backgroundColor: "transparent",
      height: title.height,
      borderRadius: {
        bottomLeft: 18,
        bottomRight: 18
      }
    });
    totalLabel = new TextLayer({
      x: 8,
      y: Align.center,
      parent: total,
      fontSize: 14,
      color: "#666666",
      text: "Total"
    });
    this.height = this.children.length * 8 - 4;
    ref1 = this.children;
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      layer = ref1[k];
      this.height += layer.height;
    }
    totalCost = new TextLayer({
      parent: total,
      x: Align.right(-12),
      fontSize: 14,
      color: "#000000",
      fontWeight: "bold",
      y: Align.center,
      text: receipt.currency + " " + options.totalCost
    });
  }

  return Receipt;

})(Layer);

receiptSampleData = {
  products: [
    {
      title: "Classic White T-Shirt",
      description: "100% Cotton, 200% Comfortable",
      image: "images/product.png",
      quantity: 2,
      itemPrice: 13.97
    }, {
      title: "Classic White T-Shirt",
      description: "100% Cotton, 200% Comfortable",
      image: "images/product.png",
      quantity: 1,
      itemPrice: 15.43
    }, {
      title: "Classic White T-Shirt",
      description: "100% Cotton, 200% Comfortable",
      image: "images/product.png",
      quantity: 3,
      itemPrice: 9.67
    }
  ],
  paymentMethod: "Visa 2345",
  shipTo: "1 Hacker Way \nMenlo Park, CA 94025",
  currency: "$"
};

exports.ReceiptItem = ReceiptItem;

exports.Receipt = Receipt;
