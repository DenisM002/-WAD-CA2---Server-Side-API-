function OrderDetails(id = null, name, mobile, email, burger, kebab, chip, drink, info) {
    this._id = id,
    this.orderDetails_name = name,
    this.orderDetails_mobile = mobile,
    this.orderDetails_email = email,
    this.orderDetails_burger = burger,
    this.orderDetails_kebab = kebab,
    this.orderDetails_chip = chip,
    this.orderDetails_drink = drink,
    this.orderDetails_info = info
};

module.exports = OrderDetails;