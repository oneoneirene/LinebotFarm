import axios from 'axios'

export default async (event) => {
  try {
    const { data } = await axios.get('https://gis.taiwan.net.tw/XMLReleaseALL_public/restaurant_C_f.json')
    const idx = data.findIndex(item => item.Name === event.message.text.slice(4))
    if (idx > -1) {
      event.reply([
        {
          type: 'image',
          originalContentUrl: data[idx].Picture1,
          previewImageUrl: data[idx].Picture1
        },
        {
          type: 'location',
          title: data[idx].Name,
          address: data[idx].Add,
          latitude: data[idx].Px,
          longitude: data[idx].Py
        }
      ])
    } else {
      event.reply('查無資料')
    }
  } catch (error) {
    event.reply('發生錯誤')
  }
}
