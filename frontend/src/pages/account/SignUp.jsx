import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const SignUp = () => {
  const navigate = useNavigate()
  const [isPending, setIsPending] = useOutletContext()
  const [error, setError] = useState(false)
  const [errorMSg, setErrorMsg] = useState('')
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

  useEffect(() => {
    let timeId

    if (error) {
      timeId = setTimeout(() => {
        setError(false)
      }, 5000)
    }

    return () => {
      clearTimeout(timeId)
    }
  }, [error])

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

    const { password, confirmedPassword } = formData

    if (password !== confirmedPassword) {
      setError(true)
      setErrorMsg('Passwords do not match')
      return
    } else if (password.length < 8) {
      setError(true)
      setErrorMsg('Password too short')
      return
    }

    setIsPending(true)

    setTimeout(() => {
      let signupSuccessful = true

      const request = async () => {
        const {
          firstName,
          lastName,
          gender,
          dob,
          phone,
          email,
          confirmedPassword,
        } = formData

        try {
          const res = await newRequest.post('/users', {
            name: `${firstName} ${lastName}`,
            gender: gender,
            DOB: dob,
            phone: phone,
            email: email,
            password: confirmedPassword,
          })

          // when error with statusCode 500 occurs, currentUser is set to a message, hence the need if removeItem if it exist
          localStorage.removeItem('currentUser')
          localStorage.setItem('currentUser', JSON.stringify(res.data))
        } catch (error) {
          setIsPending(false)
          signupSuccessful = false
          setError(true)

          const statusCode = error.response.status
          if (statusCode === 400) {
            setErrorMsg(error.response.data.message)
          } else if (statusCode === 500) {
            setErrorMsg(error.response.statusText)
          } else setErrorMsg('something went wrong')

          return
        } finally {
          if (signupSuccessful) {
            navigate('/')
            setTimeout(() => {
              setIsPending(false)
            }, 2000)
          }
        }
      }
      return request()
    }, 3000)
  }
  return (
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
      <form onSubmit={handleSubmit}>
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
            required
          />
          <input
            type='number'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            required
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
            required
          />
          <input
            type='password'
            name='confirmedPassword'
            placeholder='Confirm Password'
            value={formData.confirmedPassword}
            onChange={handleChange}
            required
          />
          {error && <span className='error-msg'>{errorMSg}</span>}
          <button>Continue</button>
          <p>
            By continuing, you agree to LynxMart's{' '}
            <Link>Conditions of Use</Link> and <Link>Privacy Notice</Link>.
          </p>
        </fieldset>
      </form>
      <div className='other__link'>
        <p>
          For further support, you may visit the <Link>Help Center</Link> or
          contact our customer service team.
        </p>
      </div>
    </section>
  )
}

export default SignUp
