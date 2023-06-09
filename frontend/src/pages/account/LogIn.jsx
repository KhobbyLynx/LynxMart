import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <section>
      <p>Type your Email and Password to log in</p>
      <fieldset className='account__login'>
          <legend>Sign In</legend>
          <input type="text" placeholder='Email'/>
          <input type="text" placeholder='Password'/>
          <button>Continue</button>
          <Link to='/account/forgotpassword' className='link'><h6>Forgot Password ?</h6></Link>
          <p>By continuing, you agree to LynxMart's <Link>Conditions of Use</Link> and <Link>Privacy Notice</Link>.</p>
      </fieldset>
      <div className='other__link'>
        <div className='link__header'>
          <hr />
          <span>New to LynxMart?</span>
          <hr />
        </div>
      <Link to='/account/signup' className='link'><button>Create your LynxMart account</button></Link>
      <p>For further support, you may visit the <Link>Help Center</Link> or contact our customer service team.</p>
      </div>
    </section>
  )
}

export default LogIn