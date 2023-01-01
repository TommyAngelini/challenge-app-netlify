import { Form, useActionData, useTransition as useNavigation } from '@remix-run/react';
import { useState } from 'react';
import ConfirmLogo from "../../public/svg/confirm-button.svg";

export default function DetailsPage({detailsUpdater}) {

    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const [elevation, setElevation] = useState(0);

    return (

        <div className='details-container'>
            <Form method="post" id="note-form" className="m1">
                <div className='form-section'>
                    <div className="row">
                        <h3 className="details-title">Distancia</h3>
                    </div>
                    <div className="row">
                        <input className="input-field" onChange={(event) => setDistance(event.target.value) } type="number" min="0" step="0.01" id="distance" name="distance" required />
                        <div className='input-measurement'><label htmlFor="distance">km</label></div>
                    </div>

                </div>

                <div className='form-section'>
                    <div className="row">
                        <h3 className="details-title">Tiempo</h3>
                    </div>
                    <div className="row">
                        <input className="input-field" onChange={(event) => setTime(event.target.value) } type="number" min="0" step="0.01" id="time" name="time" required />
                        <div className='input-measurement'><label htmlFor="time">min</label></div>
                    </div>

                </div>

                <div className='form-section'>
                    <div className="row">
                        <h3 className="details-title">Elevación</h3>
                    </div>
                    <div className="row">
                        <input className="input-field" onChange={(event) => setElevation(event.target.value) } type="number" min="0" step="0.01" id="elevation" name="elevation" required />
                        <div className='input-measurement'><label htmlFor="elevation">m</label></div>
                    </div>

                </div>

                <div className="form-actions">
                    <img src={ConfirmLogo} alt="Confirm Logo" onClick={() => detailsUpdater(distance, time, elevation)} />
                </div>
            </Form>
        </div>

    );
}
