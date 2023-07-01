import React from 'react'
import { useState, CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import newRequest from '../../utils/newRequest'

const SignUp = () => {
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      phone: '',
      email: '',
      password: '',
      confirmedPassword: '',
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
   const handleSubmit = (event) => {
      event.preventDefault()
      setLoading(true)
      setTimeout(() => {
         const request = async () => {
            try {
               const res = await newRequest.post('/users', {
                  name: `${formData.firstName} ${formData.lastName}`,
                  gender: formData.gender,
                  DOB: formData.dob,
                  phone: formData.phone,
                  email: formData.email,
                  password: formData.confirmedPassword,
               })
               localStorage.setItem('currentUser', JSON.stringify(res.data))
            } catch (error) {
               console.log(error.response.data)
            } finally {
               navigate('/')
               setTimeout(() => {
                  setLoading(false)
               }, 1000)
            }
         }
         return request()
      }, 2000)
   }
   return (
      <>
         {loading ? (
            <div className='request-loader'>
               <RingLoader color='#D65E05' loading size={100} />
            </div>
         ) : (
            <section className='sign__up'>
               <p>Type your Email and Password to create an account</p>
               <div className='other__link'>
                  <div className='link__header'>
                     <hr />
                     <span>Already have an account?</span>
                     <hr />
                  </div>
                  <Link to='/account/login'>
                     <button>Log In</button>
                  </Link>
               </div>
               <fieldset className='account__login'>
                  <legend>Create account</legend>
                  <input
                     type='text'
                     name='firstName'
                     placeholder='First Name'
                     value={formData.firstName}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type='text'
                     name='lastName'
                     placeholder='Last Name'
                     value={formData.lastName}
                     onChange={handleChange}
                     required
                  />
                  <select
                     type='text'
                     name='gender'
                     value={formData.gender}
                     onChange={handleChange}
                     required
                  >
                     <option disabled value=''>
                        Gender
                     </option>
                     <option value='male'>Male</option>
                     <option value='female'>Female</option>
                  </select>
                  <label htmlFor='dob'>Date Of Birth</label>
                  <input
                     id='dob'
                     type='date'
                     name='dob'
                     placeholder='Email'
                     value={formData.dob}
                     onChange={handleChange}
                  />
                  <input
                     type='number'
                     name='phone'
                     placeholder='Phone Number'
                     value={formData.phone}
                     onChange={handleChange}
                  />
                  <input
                     type='text'
                     name='email'
                     placeholder='Email'
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
                  <input
                     type='password'
                     name='password'
                     placeholder='Password'
                     value={formData.password}
                     onChange={handleChange}
                  />
                  <input
                     type='password'
                     name='confirmedPassword'
                     placeholder='Confirm Password'
                     value={formData.confirmedPassword}
                     onChange={handleChange}
                  />
                  <button onClick={handleSubmit}>Continue</button>
                  <p>
                     By continuing, you agree to LynxMart's{' '}
                     <Link>Conditions of Use</Link> and{' '}
                     <Link>Privacy Notice</Link>.
                  </p>
               </fieldset>
               <div className='other__link'>
                  <p>
                     For further support, you may visit the{' '}
                     <Link>Help Center</Link> or contact our customer service
                     team.
                  </p>
               </div>
            </section>
         )}
      </>
   )
}

export default SignUp
