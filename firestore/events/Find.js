import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  startAt,
  endAt,
  limit,
} from "firebase/firestore";
import { db } from "../config/config";

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
    console.log(categories);
    // Add categories filter
    if (categories && categories.length > 0) {
      console.log("EXECUTED");
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
    console.log(queryConstraints);
    // Execute query
    const q = query(queryRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    // Transform query results
    const events = [];
    querySnapshot.forEach(doc => {
      events.push({
        id: doc.id,
        ...doc.data(),
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
