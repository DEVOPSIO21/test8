import apiClient from '../axios'

export async function warhouseReceivingPO() {
  return apiClient
    .post('/v1/public/viewnssql', {
        tbl:'warehouse-po'
    })
    .then(response => {
        if (response) {
            return response.data
        }
        return false
    })
    .catch(err => console.log(err))
}