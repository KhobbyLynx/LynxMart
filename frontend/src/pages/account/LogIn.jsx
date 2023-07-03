import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const LogIn = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, setIsPending] = useOutletContext()
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

  useEffect(() => {
    let timeId

    if (errorMsg) {
      timeId = setTimeout(() => {
        setErrorMsg('')
      }, 3000)
    }

    return () => {
      clearTimeout(timeId)
    }
  }, [errorMsg])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.password.length < 8) {
      setErrorMsg('Incorrect password')
      return
    }

    setIsPending(true)

    setTimeout(() => {
      let loginSuccessful = true
      const userFromCart = JSON.parse(localStorage.getItem('fromCart'))

      const request = async () => {
        try {
          const res = await newRequest.post('/users/login', {
            email: formData.email,
            password: formData.password,
          })
          localStorage.setItem('currentUser', JSON.stringify(res.data))
        } catch (error) {
          setIsPending(false)
          loginSuccessful = false

          if (error.response.data.includes('Invalid user credentials')) {
            setErrorMsg('Invalid user credentials')
          } else {
            setErrorMsg('Incorrect username or password')
          }

          return
        } finally {
          if (loginSuccessful) {
            if (userFromCart) {
              navigate('/cart/checkout')
              localStorage.removeItem('fromCart')
            } else {
              navigate('/')
            }
            setTimeout(() => {
              setIsPending(false)
            }, 3000)
          }
        }
      }
      return request()
    }, 2000)
  }

  return (
    <div>
      <section>
        <p>Type your Email and Password to log in</p>
        <form onSubmit={handleSubmit}>
          <fieldset className='account__login'>
            <legend>Sign In</legend>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errorMsg && <span className='error-msg'>{errorMsg}</span>}
            <button>Continue</button>
            <Link to='/account/forgotpassword' className='link'>
              <h6>Forgot Password ?</h6>
            </Link>
            <p>
              By continuing, you agree to LynxMart's{' '}
              <Link>Conditions of Use</Link> and <Link>Privacy Notice</Link>.
            </p>
          </fieldset>
        </form>
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
            For further support, you may visit the <Link>Help Center</Link> or
            contact our customer service team.
          </p>
        </div>
      </section>
    </div>
  )
}

export default LogIn
