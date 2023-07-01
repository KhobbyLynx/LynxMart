import newRequest from './newRequest'

export async function getProducts() {
   const res = await newRequest.get('/products')
   if (!res.ok) {
      throw {
         message: 'Failed to fetch products',
         statusText: res.statusText,
         status: res.status,
      }
   }
   return res.data
}
