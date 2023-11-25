// ** Logo
import { appConfig } from '../../configs/appConfig'

const Spinner = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img
        className='fallback-logo'
        src={appConfig.app.appLogoImage}
        alt='logo'
        style={{ width: '86px', height: '86px' }}
      />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default Spinner
