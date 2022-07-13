import 'dotenv/config'
import linebot from 'linebot'
import fetchRestaurant from './commands/fetchFarm.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('查詢')) {
      fetchRestaurant(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
