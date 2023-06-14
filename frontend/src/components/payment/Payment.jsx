import React, { useRef, useState } from 'react'
import './Payment.scss'
import { Link } from 'react-router-dom'

const Payment = () => {
    const [showForm, setShowForm] = useState(false)
    const [inputFocused, setInputFocused] = useState([]);
    const [formData, setFormData] = useState({
        cardNumber: '',
        name: '',
        cvv: '',
        operator: '',
        phone: '',
    });

    const radioRefs = useRef([React.createRef(), React.createRef()]);

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleInputFocus = (index) => {
        setInputFocused((prevFocused) => {
            const updatedFocused = [...prevFocused];
            updatedFocused[index] = true;
            return updatedFocused;
        });
    };

    const handleInputBlur = (index) => {
        setInputFocused((prevFocused) => {
            const updatedFocused = [...prevFocused];
            updatedFocused[index] = false;
            return updatedFocused;
        });
    };

    const show = () => {
        setShowForm(prevState => !prevState);
        radioRefs.current[index].current.checked = true;
    };

    const renderMonthOptions = () => {
        const startMonth = 1;
        const endMonth = 12;
        const months = [];

        for (let month = startMonth; month <= endMonth; month++) {
            const monthValue = month.toString().padStart(2, '0');
            months.push(
                <option key={monthValue} value={monthValue}>
                    {monthValue}
                </option>
            );
        }

        return months;
    };

    const renderYearOptions = () => {
        const startYear = 2023;
        const endYear = 2053;
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }

        return years;
    };
    return (
        <div className='checkout__payment'>
            <h3 className='ch3'>Payment</h3>
            <span className='cs'>All transactions are secure and encrypted.</span>
            <h6>choose a payment method</h6>
            <div className='tab__options'>
                <div className='tab__container'>
                    <div>
                        <input type="radio" id='bankcard' name='payment__opt' className='hide' />
                        <label htmlFor="bankcard" className='tab__opt tab__p box__shadow df' onClick={show}>
                            <p>Credit Card</p>
                            <div className="card__img">
                                <img src="https://res.cloudinary.com/khobbylynx/image/upload/v1685979642/lynxmart/img/pay/Mastercard-entry-left_b0quwh.png" alt="mastercard" />
                                <img src="https://res.cloudinary.com/khobbylynx/image/upload/v1685979642/lynxmart/img/pay/Visa-entry-left_xdsi39.png" alt="visacard" />
                            </div>
                        </label>
                    </div>
                    <div className={`payment__info  ${!showForm && 'hide'}`}>
                        <form className='box__shadow'>
                            <div className={`input__container ${formData.cardNumber || inputFocused[0] ? 'has__value' : ''}`}>
                                <input type="number" className={`input__field ${inputFocused[0] ? 'focused' : ''}`}
                                    onFocus={() => handleInputFocus(0)}
                                    onBlur={() => handleInputBlur(0)}
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    name='cardNumber'
                                />
                                <label className={`input__label ${inputFocused[0] ? 'focused' : ''}`}>
                                    Card Number
                                </label>
                            </div>
                            <div className={`input__container ${formData.name || inputFocused[1] ? 'has__value' : ''}`}>
                                <input type="text" className={`input__field ${inputFocused[1] ? 'focused' : ''}`}
                                    onFocus={() => handleInputFocus(1)}
                                    onBlur={() => handleInputBlur(1)}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    name='name'
                                />
                                <label className={`input__label ${inputFocused[1] ? 'focused' : ''}`}>
                                    Name on card
                                </label>
                            </div>
                            <div className='date__group'>
                                <h6 className='ch6'>Expiry Date</h6>
                                <div className='date__container df'>
                                    <div className='expiry__date df'>
                                        <select>
                                            <option value="" selected="selected" disabled="">MM</option>
                                            {renderMonthOptions()}
                                        </select>

                                        <select id="yearSelect">
                                            <option value="" selected="selected" disabled="">YY</option>
                                            {renderYearOptions()}
                                        </select>
                                    </div>
                                    <div className={`input__container mt ${formData.cvv || inputFocused[2] ? 'has__value' : ''}`}>
                                        <input type="number" className={`input__field cvv ${inputFocused[2] ? 'focused' : ''}`}
                                            onFocus={() => handleInputFocus(2)}
                                            onBlur={() => handleInputBlur(2)}
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            name='cvv'
                                        />
                                        <label className={`input__label ${inputFocused[2] ? 'focused' : ''}`}>
                                            CVV
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className='tab__container'>
                    <div>
                        <input type="radio" id='momo' name='payment__opt' className='hide' />
                        <label htmlFor="momo" className="tab__opt tab__p box__shadow df" onClick={show}>
                            <p>Mobile Money</p>
                            <img src="https://res.cloudinary.com/khobbylynx/image/upload/v1685980320/lynxmart/img/pay/ic_mobilemoney_k1zbp5.png" alt="mobile money" />
                        </label>
                    </div>
                    <div className={`payment__info  ${!showForm && 'hide'}`}>
                        <form className='box__shadow'>
                            <div className={`input__container ${formData.operator || inputFocused[3] ? 'has__value' : ''}`}>
                                <select type="se" className={`input__field ${inputFocused[3] ? 'focused' : ''}`}
                                    onFocus={() => handleInputFocus(3)}
                                    onBlur={() => handleInputBlur(3)}
                                    value={formData.operator}
                                    onChange={handleInputChange}
                                    name='operator'
                                    id='operator'
                                >
                                    {['', 'MTN', 'AirtelTigo'].map(operator => (
                                        <option key={operator} value={operator}>{operator}</option>
                                    ))}
                                </select>
                                    <label htmlFor='operator' className={`input__label ${inputFocused[3] ? 'focused' : ''}`}>
                                        Select your operator
                                    </label>

                            </div>
                            <div className="operator__number df">
                                <div className='prefix__input df'>+233</div>
                                <div className={`operator__container ${formData.phone || inputFocused[4] ? 'has__value' : ''}`}>
                                    <input type="number" className={`opf input__field ${inputFocused[4] ? 'focused' : ''}`}
                                        onFocus={() => handleInputFocus(4)}
                                        onBlur={() => handleInputBlur(4)}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        name='phone'
                                        id='phone'
                                    />
                                    <label htmlFor='phone' className={`opl ${inputFocused[4] ? 'focused' : ''}`}>
                                        Insert mobile number without 0
                                    </label>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <Link to='' className='link'><button className='checkout__btn'>Pay $220</button></Link>
        </div>
    )
}

export default Payment;