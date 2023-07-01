import React from 'react'
import { useRouteError } from 'react-router-dom'
import './Error.scss'

const Error = () => {
   const error = useRouteError()
   console.log(error)
   return (
      <section className='error-element'>
         <div>
            {error.message ? (
               <h6 className='error-element__msg'>
                  Erorr: <span>{error.message}</span>
               </h6>
            ) : (
               <h6 className='error-element__msg'>
                  Error: <span>Something went wrong</span>
               </h6>
            )}
            {error.statusText && (
               <h6 className='error-element__status'>
                  StatusText: <span>{error.statusText}</span>
               </h6>
            )}
            {error.status && (
               <h6 className='error-element__status'>
                  Status Code: <span>{error.status}</span>
               </h6>
            )}
         </div>
      </section>
   )
}

export default Error
