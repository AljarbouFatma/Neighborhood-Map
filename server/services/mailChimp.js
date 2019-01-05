const Mailchimp = require('mailchimp-api-v3')

const token = "1eaad4f9d5a2aa320819ac6daf51b4f9-us17"
const listId = "dbfa93c3a4"

const mailchimp = new Mailchimp(token)

const addToMailList = (email_address,callback) => {
  mailchimp.request({
    method: 'post',
    path:`/lists/${listId}/members`,
    body: {
      email_address,
      status:"subscribed"
    }
  },results=>callback(results))
}


module.exports = {
  addToMailList
}
