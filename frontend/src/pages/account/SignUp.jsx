import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <section>
    <p>Type your Email and Password to create an account</p>
    <fieldset className='account__login'>
        <legend>Create account</legend>
        <input type="text" placeholder='Email'/>
        <input type="text" placeholder='Password'/>
        <input type="text" placeholder='Confirm Password'/>
        <button>Continue</button>
        <p>By continuing, you agree to LynxMart's <Link>Conditions of Use</Link> and <Link>Privacy Notice</Link>.</p>
    </fieldset>
    <div className='other__link'>
      <div className='link__header'>
        <hr />
        <span>Already have an account?</span>
        <hr />
      </div>
    <Link to='/account/login'><button>Log In</button></Link>
    <p>For further support, you may visit the <Link>Help Center</Link> or contact our customer service team.</p>
    </div>
  </section>
  )
}

export default SignUp