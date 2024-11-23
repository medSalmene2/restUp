import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
  collectionGroup,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/config";
import { fetchUserInfo } from "../../firestore/User";

const fetchEvents = async (
  userId,
  categories = [],
  startDate = null,
  endDate = null,
  minGuests = null,
  maxGuests = null,
  location = null,
  queryLimit = null,
  includeStartDateFilter = true
) => {
  try {
    let queryRef = collection(db, "events");
    const queryConstraints = [];

    // Handle start date with default to today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day

    if (includeStartDateFilter) {
      // Use provided startDate if it exists and is after today,
      // otherwise use today as the default start date
      const effectiveStartDate = startDate
        ? new Date(startDate) >= today
          ? new Date(startDate)
          : today
        : today;

      queryConstraints.push(
        where("date", ">=", Timestamp.fromDate(effectiveStartDate))
      );
    }

    // Add end date filter if provided
    if (endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Set to end of day
      queryConstraints.push(
        where("date", "<=", Timestamp.fromDate(endDateTime))
      );
    }

    // Add categories filter
    if (categories && categories.length > 0) {
      queryConstraints.push(
        where("categories", "array-contains-any", categories)
      );
    }

    // Add guests filter
    if (minGuests !== null) {
      queryConstraints.push(where("guests", ">=", Number(minGuests)));
    }
    if (maxGuests !== null) {
      queryConstraints.push(where("guests", "<=", Number(maxGuests)));
    }

    // Add location-based filter
    if (location?.latitude && location?.longitude && location?.radiusKm) {
      const latDegrees = location.radiusKm / 111;
      const lngDegrees =
        location.radiusKm /
        (111 * Math.cos((location.latitude * Math.PI) / 180));

      queryConstraints.push(
        where(
          "locationPoint",
          ">=",
          new GeoPoint(
            location.latitude - latDegrees,
            location.longitude - lngDegrees
          )
        ),
        where(
          "locationPoint",
          "<=",
          new GeoPoint(
            location.latitude + latDegrees,
            location.longitude + lngDegrees
          )
        )
      );
    }

    // Add ordering by date
    queryConstraints.push(orderBy("date", "asc"));

    // Add limit if specified
    if (queryLimit) {
      queryConstraints.push(limit(queryLimit));
    }

    // Execute query
    const q = query(queryRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);
    // console.log(userId)
    // Transform query results
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: formatFirestoreDate(doc.data().date),
      isOrganizer: userId === doc.data().organizerId,
    }));

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Utility function to format Firestore timestamp
const formatFirestoreDate = timestamp => {
  if (!timestamp) return null;

  const date = timestamp.toDate();
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export function formatFirestoreTimestampToTime(timestamp) {
  if (!timestamp) {
    return null;
  }
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const fetchUserBookedEvents = async userId => {
  try {
    // Get events where user is a participant
    const participantsQuery = query(
      collectionGroup(db, "participants"),
      where("userId", "==", userId)
    );

    // Get events where user is the organizer
    const organizerQuery = query(
      collection(db, "events"),
      where("organizerId", "==", userId)
    );

    const [participantsSnapshot, organizerSnapshot] = await Promise.all([
      getDocs(participantsQuery),
      getDocs(organizerQuery),
    ]);

    // Process participant events
    const participantEventPromises = participantsSnapshot.docs.map(
      async participantDoc => {
        const eventId = participantDoc.ref.parent.parent.id;
        const eventDoc = await getDoc(doc(db, "events", eventId));

        if (eventDoc.exists()) {
          return {
            id: eventDoc.id,
            ...eventDoc.data(),
            nbrOfPersons: participantDoc.data().nbrOfPersons,
            isParticipant: true,
            isOrganizer: false,
          };
        }
        return null;
      }
    );

    // Process organizer events
    const organizerEvents = organizerSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      isParticipant: false,
      isOrganizer: true,
    }));

    // Combine and process all events
    const participantEvents = await Promise.all(participantEventPromises);
    const allEvents = [...participantEvents, ...organizerEvents].filter(
      event => event !== null
    );

    // Get current date at start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Past events: Include both participated and organized events
    const pastEvents = allEvents
      .filter(event => {
        const eventDate = event.date.toDate();
        return eventDate < today;
      })
      .sort((a, b) => b.date.toDate() - a.date.toDate()) // Most recent first
      .map(event => ({
        ...event,
        date: formatFirestoreDate(event.date),
        fromTime: formatFirestoreTimestampToTime(event.fromTime),
        toTime: formatFirestoreTimestampToTime(event.toTime),
      }));

    // Upcoming events: Only include events where user is a participant (not organizer)
    const upcomingEvents = allEvents
      .filter(event => {
        const eventDate = event.date.toDate();
        return eventDate >= today && event.isParticipant;
      })
      .sort((a, b) => a.date.toDate() - b.date.toDate())
      .map(event => ({
        ...event,
        date: formatFirestoreDate(event.date),
        fromTime: formatFirestoreTimestampToTime(event.fromTime),
        toTime: formatFirestoreTimestampToTime(event.toTime),
      })); // Earliest first

    const upcomingOrganizedEvents = allEvents
      .filter(event => {
        const eventDate = event.date.toDate();
        return eventDate >= today && event.isOrganizer;
      })
      .sort((a, b) => a.date.toDate() - b.date.toDate())
      .map(event => ({
        ...event,
        date: formatFirestoreDate(event.date),
        fromTime: formatFirestoreTimestampToTime(event.fromTime),
        toTime: formatFirestoreTimestampToTime(event.toTime),
      })); // Earliest first

    console.log("Past Events:", pastEvents.length);
    console.log("Upcoming Events:", upcomingEvents.length);
    console.log("Upcoming Organized Events:", upcomingOrganizedEvents.length);

    return {
      pastEvents,
      upcomingEvents,
      upcomingOrganizedEvents,
    };
  } catch (error) {
    console.error("Error fetching booked events:", error);
    throw error;
  }
};

async function fetchParticipantsInfo(eventId) {
  const participantsInfo = [];

  try {
    // Reference to the participants subcollection
    const participantsRef = collection(db, `events/${eventId}/participants`);
    const participantsSnapshot = await getDocs(participantsRef);

    // Loop through each participant document
    for (const participantDoc of participantsSnapshot.docs) {
      const participantId = participantDoc.id; // Assuming the doc ID is the user ID
      // console.log(participantId);
      const userInfo = await fetchUserInfo(participantId);
      participantsInfo.push({ userInfo, ...participantDoc.data() });
    }
    console.log(participantsInfo);

    return participantsInfo;
  } catch (error) {
    console.error("Error fetching participants:", error);
    throw new Error("Failed to fetch participants information.");
  }
}

module.exports = { fetchEvents, fetchUserBookedEvents, fetchParticipantsInfo };
