import newRequest from './newRequest'

export async function getProducts(id) {
   const url = id ? `/products/${id}` : '/products/'
   const res = await newRequest.get(url)
   if (res.status !== 200) {
      throw {
         message: 'Failed to fetch products',
         statusText: res.statusText,
         status: res.status,
      }
   }
   return res.data
}
