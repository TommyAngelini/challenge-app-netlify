import "./activity-creation.css";

const ResultCard = (props) => {

    const sportNames = { "run": "Corrida", "bike": "Bici", "swim": "Natación" };
    const bonusPoints = (props.distance * (props.typeMultiplier - 1)) * props.distanceSum / props.distance;

    return (
        <>

            <div className="result-card m1 p1">
                <div className="card-row">
                    <div className="card-title">Actividad:</div>
                    <div className="card-value">{sportNames[props.activity]}</div>
                    <div className="card-detail"></div>
                </div>
                <div className="card-row">
                    <div className="card-title">Tipo:</div>
                    <div className="card-value">{props.type}</div>
                    <div className="card-detail">(+{bonusPoints.toFixed(2)})</div>
                </div>
                <div className="card-row">
                    <div className="card-title">Distancia:</div>
                    <div className="card-value">{props.activity == "swim" ? props.distance * 1000 : props.distance} {props.activity == "swim" ? "m" : "km"}</div>
                    <div className="card-detail">(+{props.distanceSum.toFixed(2)})</div>
                </div>
                {
                    props.activity != "swim" && props.type == "Outdoor" &&
                    <div className="card-row">
                        <div className="card-title">Elevación:</div>
                        <div className="card-value">{props.elevation=='' ? 0 : props.elevation}m</div>
                        <div className="card-detail">(+{props.elevationSum.toFixed(2)})</div>
                    </div>
                }

                <div className="card-row">
                    <div className="card-title">Tiempo:</div>
                    <div className="card-value">{props.time} min</div>
                    <div className="card-detail"></div>
                </div>
            </div>
            <div className="border">
                <div className="result-card colored-border">
                    <h1 className="challenge-points-number">+{props.challengePoints.toFixed(2)} &nbsp;</h1>
                    <h2 className="challenge-points-text">Challenge Points</h2>
                </div>
            </div>

            <div className="flex">
                <div className="back-button" onClick={() => window.location.reload(false)}>Reiniciar</div>
            </div>

        </>
    );
}

export default ResultCard;

