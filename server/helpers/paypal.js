const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AZ67aW3r-PdDBJqBbSd881UoLKtWrpzdtddxbtHQ9-mSl-R_p4ENM2K68XVawt9FwS17Z6WeDxnX3a20",
  client_secret: "EG8XPNGL5eGnjl5MF00b0uXnQ9lxL9n4pqF8B4SLwmwf4vBDu909WKRFBKMAW7S_aeD6wdkNUBs9y-Xd",
});

module.exports = paypal;
