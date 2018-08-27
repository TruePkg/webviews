import { List } from 'immutable'
import axios from 'axios'

import fetch from '../../utils/fetch'

export const fetchExample = () => {
  return fetch('/example')
    .then(res => res.json())
    .then(payload => new List(payload))
}

// const updatePriceList = async (files) => {
//   const file = files[0]
//   try {
//     const url = await axios.post(`${process.env.REACT_APP_API_HOSTNAME}`, {
//       fileName: file.name,
//       fileType: file.type
//     })
//     const { data } = url
//     axios.put(data.signedRequest, file, { headers: { 'Content-type': file.type } })
//     return 'success'
//   } catch (error) {
//     return 'wrong number'
//   }
// }

export const postToDB = async (files, token) => {
  // console.log('made it in hereeeeeeeeee', updatePriceList)
  const file = files[0]
  const fileName = file.name
  try {
    const url = await axios.post(`${process.env.REACT_APP_API_HOSTNAME}/users/signature`, {
      fileName: file.name,
      fileType: file.type
    })
    const { data } = url
    console.log(data.signedRequest, 'signedRequest')
    await axios.put(data.signedRequest, file, { headers: { 'Content-type': file.type } })
    const inventory = await axios.post(`${process.env.REACT_APP_API_HOSTNAME}/csv`, {
      csvUrl: `https://truepackageinventory.s3.amazonaws.com/${file.name}`,
      token
    })
    return inventory
  } catch (error) {
    return []
  }
}

export const getInventory = async token => {
  const inventory = await axios.get(`${process.env.REACT_APP_API_HOSTNAME}/users/inventory?token=${token}`)
  return inventory.data.items
}
