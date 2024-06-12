import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';

import './CustomWateringForm.css';
import { AuthContext } from '../../utils/auth-context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { getFastAPI } from '../../api/generated/endpoints';
import { WateringConfig } from '../../api/generated/models';

const CustomWateringForm = () => {
    const { auth } = useContext(AuthContext);

    const [duration, setDuration] = useState(15);
    const [speed, setSpeed] = useState(1);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        var body: WateringConfig = {
            duration: duration,
            speed: speed,
        };
        const id = toast.loading('Watering...');
        const fastApiClient = getFastAPI();
        fastApiClient
            .startWatering(body, auth.access_token)()
            .then((response) => {
                toast.update(id, {
                    render: 'Watered!',
                    type: 'success',
                    isLoading: false,
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            })
            .catch((error) => {
                console.log(error);
                const errorBody = error.json();
                toast.update(id, {
                    render: errorBody.detail,
                    type: 'error',
                    isLoading: false,
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            });
    };

    const durationChangeHandler = (event: ChangeEvent) => {
        setDuration(parseInt((event.target as HTMLInputElement).value));
    };

    const speedChangeHandler = (event: ChangeEvent) => {
        setSpeed(parseInt((event.target as HTMLInputElement).value));
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='controls'>
                    <div className='control'>
                        <label>How long to water for?</label>
                        <input
                            type='number'
                            min='0'
                            max='60'
                            value={duration}
                            onChange={durationChangeHandler}
                        />
                    </div>
                    <div className='control'>
                        <label>Pump Speed</label>
                        <input
                            type='float'
                            min='0'
                            max='1'
                            value={speed}
                            onChange={speedChangeHandler}
                        />
                    </div>
                </div>
                <div className='customWatering'>
                    <button type='submit'>Start!</button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default CustomWateringForm;
