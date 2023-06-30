import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const LogIn = () => {
 const navigate = useNavigate()
 const [formData, setFormData] = useState({
  email: '',
  password: '',
 })

 const handleChange = (event) => {
  const { name, value } = event.target
  setFormData((prevFormData) => {
   return {
    ...prevFormData,
    [name]: value,
   }
  })
 }
 const handleSubmit = async (event) => {
  event.preventDefault()

  try {
   const res = await newRequest.post('/users/login', {
    email: formData.email,
    password: formData.password,
   })

   localStorage.setItem('currentUser', JSON.stringify(res.data))
   navigate('/')
  } catch (error) {
   console.log(error)
  }
 }
 return (
  <section>
   <p>Type your Email and Password to log in</p>
   <fieldset className='account__login'>
    <legend>Sign In</legend>
    <input
     type='email'
     placeholder='Email'
     name='email'
     value={formData.email}
     onChange={handleChange}
    />
    <input
     type='password'
     placeholder='Password'
     name='password'
     value={formData.password}
     onChange={handleChange}
    />
    <button onClick={handleSubmit}>Continue</button>
    <Link to='/account/forgotpassword' className='link'>
     <h6>Forgot Password ?</h6>
    </Link>
    <p>
     By continuing, you agree to LynxMart's <Link>Conditions of Use</Link> and{' '}
     <Link>Privacy Notice</Link>.
    </p>
   </fieldset>
   <div className='other__link'>
    <div className='link__header'>
     <hr />
     <span>New to LynxMart?</span>
     <hr />
    </div>
    <Link to='/account' className='link'>
     <button>Create your LynxMart account</button>
    </Link>
    <p>
     For further support, you may visit the <Link>Help Center</Link> or contact
     our customer service team.
    </p>
   </div>
  </section>
 )
}

export default LogIn
