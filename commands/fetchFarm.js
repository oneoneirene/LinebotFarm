import axios from 'axios'

export default async (event) => {
  try {
    const { data } = await axios.get('https://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelStay.aspx')
    const idx = data.findIndex(item => item.Name === event.message.text.slice(3))
    if (idx > -1) {
      event.reply([
        {
          type: 'image',
          originalContentUrl: data[idx].Photo,
          previewImageUrl: data[idx].Photo
        },
        {
          type: 'text',
          text: data[idx].HostWords
        },
        {
          type: 'location',
          title: data[idx].Name,
          address: data[idx].Address,
          latitude: data[idx].Latitude,
          longitude: data[idx].Longitude
        },
        {
          type: 'text',
          text: data[idx].Url
        }
      ])
    } else {
      event.reply('查無資料唷！')
    }
  } catch (error) {
    event.reply('發生錯誤')
  }
}
