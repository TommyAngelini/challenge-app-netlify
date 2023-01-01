import { redirect } from '@remix-run/node';
// import NewActivity, { links as newNoteLinks } from '~/components/NewActivity';
import { getStoredNotes, storeNotes } from '~/data/notes';
// import NoteList, { links as NoteListLinks } from '~/components/NoteList';
import {useLoaderData } from '@remix-run/react';

export default function AddActivityPage() {
    const notes = useLoaderData();

    return (
        <main>
            <NewActivity />
        </main>
    );
}

export async function loader() {
    const activities = await getStoredNotes();
    return activities;
}

export async function action({ request }) {
    const formData = await request.formData();
    const activityData = Object.fromEntries(formData);

    // if (noteData.title.trim().length < 5) {
    //     return {message: 'Invaid title: must be at least 5 characters long'};
    // }

    const challengePoints = calculateChallengePoints(activityData);

    const existingActivities = await getStoredNotes();
    activityData.id = new Date().toISOString();
    activityData.challengePoints = challengePoints; 
    const updatedActivities = existingActivities.concat(activityData);
    await storeNotes(updatedActivities);
    return redirect('/activity');
}

const calculateChallengePoints = (activityData) => {
    var multiplier = 1.0; 
    var elevationMultiplier = 0.01;
    var isOutdoor = activityData.sportType === "outdoor";

    if(activityData.sport === "bike") {
        multiplier = 0.33; 
        elevationMultiplier = 0.005;
    }
    else if(activityData.sport === "swim"){
        multiplier = 5.0;
    }

    if(isOutdoor && activityData.sport != "swim") multiplier *= 1.2; 

    var challengePoints = activityData.distance * multiplier + activityData.elevation * elevationMultiplier;

    return challengePoints; 

}


export function links() {
    return [...newNoteLinks(), ...NoteListLinks()];
}

export function meta() {
    return {
        title: 'Add Activity',
        description: 'Add activity to the challenge'
    };
}