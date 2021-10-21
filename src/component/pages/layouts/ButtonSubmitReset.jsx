import React from 'react';
import { Spinner } from 'react-bootstrap';

const ButtonSubmitReset = (props) => {
    const {btnloader} = props;
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
                    <button type="reset" className="btn btn-secondary">Reset</button>
                    {/* <button type="button" onClick={() =>    >Reset</button> */}

                </div>
            </div>
        </>
    )

}
export default ButtonSubmitReset;