import "./activity-creation.css";
import { useState } from 'react';

const ExportCard = (props) => {

    const [messageInput, setMessageInput] = useState(false);
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);

    const generateNewMessage = (text) => {

        const activityNumberRegex = /#(\d+)/;

        /* NEED TO CHANGE */
        const cyclingRegex = /🚴🏽‍♂️: (\d*\.)?\d+/;
        const runningRegex = /🏃‍♂️: (\d*\.)?\d+/;
        const swimmingRegex = /🏊‍♂️: (\d*\.)?\d+/;
        const totalRegex = /Total: (\d*\.)?\d+/;
        /* END NEED TO CHANGE */

        const secondLineRegex = /#.*/;
        const lastLineRegex = /Total.*/;

        const sportRegex = { "run": runningRegex, "bike": cyclingRegex, "swim": swimmingRegex };
        const emojiRegex = { "run": "🏃‍♂️: ", "bike": "🚴🏽‍♂️: ", "swim": "🏊‍♂️: " };
        const typeCode = { "Outdoor": "o", "Indoor": "i" };

        const activityNumber = parseInt(text.match(activityNumberRegex)[0].match(/\d+/)[0]);

        /* NEED TO CHANGE */
        const prevActivityAmount = parseFloat(text.match(sportRegex[props.activity])[0].match(/(\d*\.)?\d+/)[0]);
        const prevTotalAmount = parseFloat(text.match(totalRegex)[0].match(/(\d*\.)?\d+/)[0]);
        /* END NEED TO CHANGE */

        console.log("prev activity amount: " + prevActivityAmount);
        console.log("prev total amount: " + prevTotalAmount);


        const newActivityNumber = activityNumber + 1;
        const newActivityAmount = prevActivityAmount + props.challengePoints;
        const newTotalAmount = prevTotalAmount + props.challengePoints;

        const newDescription = "#" + newActivityNumber + ", " + props.activity
            + " " + typeCode[props.type] + ", " + props.challengePoints.toFixed(2)
            + " CP, " + props.time + "'";

        const newActivityLine = emojiRegex[props.activity] + newActivityAmount.toFixed(2);

        const newTotalLine = "Total: " + newTotalAmount.toFixed(2) + " Challenge Points";

        var updatedMessage = text.replace(secondLineRegex, newDescription);
        updatedMessage = updatedMessage.replace(sportRegex[props.activity], newActivityLine);
        updatedMessage = updatedMessage.replace(lastLineRegex, newTotalLine);
        setMessage(updatedMessage);

    }

    const copy = () => {
        navigator.clipboard.writeText(message);
        setMessageInput(true);
        setCopied(true);
    }

    return (
        <div className='export-container'>
            <form method="post" id="note-form" className="m1">
                <div className='form-section'>
                    <div className="row">
                        <h3 className="details-title">Ultima Actividad</h3>
                    </div>
                    <div className="row">
                        <textarea rows="8" className="input-field" onChange={(event) => generateNewMessage(event.target.value)} required />
                    </div>
                </div>
                {!messageInput &&
                    <div className="flex">
                        <div className="back-button" onClick={() => copy()}>Copiar</div>
                    </div>
                }
                {messageInput &&
                    <>
                        <div className="form-section">
                            <div className="row">
                                <h3 className="details-title">Nueva Actividad</h3>
                            </div>
                            <div className="row">
                                <textarea rows="8" className="input-field" readOnly value={message} required />
                            </div>
                            {copied &&
                                <div className="row">
                                    <h2>Nueva actividad copiada!</h2>
                                </div>
                            }

                        </div>
                        <div className="flex">
                            <div className="back-button" onClick={() => window.location.reload(false)}>Reiniciar</div>
                        </div>
                    </>
                }
            </form>



        </div>
    );
}

export default ExportCard;