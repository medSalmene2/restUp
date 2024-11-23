import {
  collection,
  where,
  doc,
  getDoc,
  updateDoc,
  query,
  increment,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/config";

const addEventParticipant = async (eventId, userId, username, nbrOfPersons) => {
  try {
    // First check if event exists and has space
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists()) {
      throw new Error("Event not found");
    }

    const eventData = eventDoc.data();
    const currentParticipants = eventData.currentParticipants || 0;
    console.log(userId);
    // Check if user is the organizer
    if (eventData.organizerId === userId) {
      console.log(eventData);
      throw new Error("Organizer cannot book their own event");
    }

    // Check if event is full
    if (currentParticipants >= eventData.guests) {
      throw new Error("Event is full");
    }

    const remainingSpots = eventData.guests - currentParticipants;
    if (currentParticipants + nbrOfPersons > eventData.guests) {
      console.error(`Only ${remainingSpots} spots remaining`);
      throw new Error("Event is full");
    }

    // Check for existing booking
    const participantsRef = collection(db, "events", eventId, "participants");
    const participantQuery = query(
      participantsRef,
      where("userId", "==", userId)
    );
    const existingBookingSnapshot = await getDocs(participantQuery);

    let totalPersons = nbrOfPersons;
    if (!existingBookingSnapshot.empty) {
      const existingBooking = existingBookingSnapshot.docs[0];
      totalPersons += existingBooking.data().nbrOfPersons;

      // Update existing booking
      await updateDoc(doc(participantsRef, existingBooking.id), {
        nbrOfPersons: totalPersons,
      });
    } else {
      // Create new participant document in subcollection
      const participantData = {
        userId,
        nbrOfPersons: totalPersons,
        username,
      };

      console.log(participantData);
      // Create a new doc reference with user ID as the document ID
      const participantDocRef = doc(participantsRef, userId);
      await setDoc(participantDocRef, participantData);
    }

    // Update the main event document with new participant count
    await updateDoc(eventRef, {
      currentParticipants: increment(nbrOfPersons),
    });

    return userId; // Return the document ID (which is the userId)
  } catch (error) {
    console.error("Error adding participant:", error);
    throw error;
  }
};
// Updated exports

export { addEventParticipant };
