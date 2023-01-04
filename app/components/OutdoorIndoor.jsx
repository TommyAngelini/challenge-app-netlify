export default function OutdoorIndoor(props) {

    return (
        <div className='sport-selection-container'>
            <button className="type-button" alt="Outdoor button" onClick={() => props.typeChanger("Outdoor")}>
                <h2>{props.sport == "swim" ? "Open Water Swim" : "Outdoor"}</h2>
            </button>
            <button className="type-button" alt="Indoor button" onClick={() => props.typeChanger("Indoor")}>
                <h2>{props.sport == "swim" ? "Pool Swim" : "Indoor"}</h2>
            </button>
        </div>
    );
}