export default function OutdoorIndoor({ typeChanger }) {

    return (
        <div className='sport-selection-container'>
            <button className="type-button" alt="Outdoor button" onClick={() => typeChanger("Outdoor")}>
                <h2>Outdoor</h2>
            </button>
            <button className="type-button" alt="Indoor button" onClick={() => typeChanger("Indoor")}>
                <h2>Indoor</h2>
            </button>
        </div>
    );
}