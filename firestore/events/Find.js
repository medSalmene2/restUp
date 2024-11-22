import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/config";

// Utility function to format Firestore timestamp
const formatFirestoreDate = timestamp => {
  if (!timestamp) return null;

  const date = timestamp.toDate();
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};
const fetchEvents = async (
  categories,
  startDate,
  endDate,
  minGuests,
  maxGuests,
  location,
  queryLimit
) => {
  try {
    let queryRef = collection(db, "events");
    const queryConstraints = [];

    // Add date range filter
    if (startDate) {
      queryConstraints.push(
        where("date", ">=", Timestamp.fromDate(new Date(startDate)))
      );
    }
    if (endDate) {
      queryConstraints.push(
        where("date", "<=", Timestamp.fromDate(new Date(endDate)))
      );
    }

    // Add categories filter
    if (categories && categories.length > 0) {
      queryConstraints.push(
        where("categories", "array-contains-any", categories)
      );
    }

    // Add guests filter
    if (minGuests) {
      queryConstraints.push(where("guests", ">=", Number(minGuests)));
    }
    if (maxGuests) {
      queryConstraints.push(where("guests", "<=", Number(maxGuests)));
    }

    // Add location-based filter
    if (
      location &&
      location.latitude &&
      location.longitude &&
      location.radiusKm
    ) {
      // Convert radius to lat/lng bounds (approximate)
      const latDegrees = location.radiusKm / 111; // 1 degree ≈ 111km
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

    // Transform query results with formatted dates
    const events = [];
    querySnapshot.forEach(doc => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        date: formatFirestoreDate(data.date), // Format the date
      });
    });

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export default fetchEvents;
module.exports = { fetchEvents };
