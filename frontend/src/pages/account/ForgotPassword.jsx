import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
   return (
      <section>
         <p>Type your Email associated with your LynxMart account</p>
         <form>
            <fieldset className='account__login'>
               <legend>Password Assistance</legend>
               <input type='text' placeholder='Email' required />
               <button>Continue</button>
            </fieldset>
         </form>
         <p>
            For further support, you may visit the <Link>Help Center</Link>
         </p>
      </section>
   )
}

export default ForgotPassword
