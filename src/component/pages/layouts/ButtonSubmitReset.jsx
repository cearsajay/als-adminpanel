import React from 'react';
import { Spinner } from 'react-bootstrap';

const ButtonSubmitReset = (props) => {
    const {btnloader, onsubmitFun} = props;
    return (
        <>
            <div className="form-group">
                <div className="form-action-btn">
                    <button type="submit" className="btn btn-primary" disabled={btnloader ? true : false}>
                        {btnloader ? <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className='mr-2' />
                        </>
                            : ''
                        }
                        {btnloader ? 'loading...' : 'Submit'}</button>
                    <button type="button" className="btn btn-secondary" onClick={onsubmitFun}>Reset</button>
                </div>
            </div>
        </>
    )

}
export default ButtonSubmitReset;