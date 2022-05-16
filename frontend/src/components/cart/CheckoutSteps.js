import React from 'react'
import { Link } from 'react-router-dom'

//we have three checkout steps
const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">

          {/* //if we are on the shipping page then do this steps */}

            {shipping ? <Link to='shippping' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Shipping</div>
                <div className="triangle-active"></div>

        {/* //if we are not on the shipping page so else do these steps and do Nothing */}

            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

                {/* //if we are on the confirm page then do this steps */}

            {confirmOrder ? <Link to='/order/confirm' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>

                    {/* //if we are not on the confirm page so else do these steps and do Nothing */}

            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>}

            {payment ? <Link to='/payment' className="float-right">
                <div className="triangle2-active"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
            </Link> : <Link to="#!" disabled>
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>}
  
        </div>
    )
}

export default CheckoutSteps