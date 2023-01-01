import SportSelectionStyles from './activity-creation.css';
import RunLogo from '../../public/svg/run-button.svg';
import BikeLogo from '../../public/svg/bike-button.svg';
import SwimLogo from '../../public/svg/swim-button.svg';


export default function SportSelection({sportChanger}) {

    return (

        <div className='sport-selection-container'>
            <img src={RunLogo} className="sport-button" alt="Run Logo" onClick={() => sportChanger("run")} />
            <img src={BikeLogo} className="sport-button" alt="Bike Logo" onClick={() => sportChanger("bike")} />
            <img src={SwimLogo} className="sport-button" alt="Swim Logo" onClick={() => sportChanger("swim")} />
        </div>

    );
}

export function links() {
    return [{ rel: 'stylesheet', href: SportSelectionStyles }];
}

