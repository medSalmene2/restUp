import { collection, addDoc, Timestamp, GeoPoint } from "firebase/firestore";
import {db} from "../config/config"
const publishEvent = async (
  title,
  categories,
  description,
  notes,
  isAllDay,
  fromTime,
  toTime,
  guests,
  location,
  locationPoint,
  date , organizerId
) => {
  try {
    // Validate inputs
    if (!title || !description || !date) {
      throw new Error("Title, description and date are required fields");
    }

    // Validate categories is an array of strings
    if (!Array.isArray(categories)) {
      throw new Error("Categories must be an array");
    }

    // Create event document
    const eventData = {
      title: title,
      categories: categories,
      description: description,
      notes: notes || null,
      fromTime: fromTime ? Timestamp.fromDate(fromTime) : null,
      toTime: toTime ? Timestamp.fromDate(toTime) : null,
      guests: Number(guests) || 1,
      locationPoint: locationPoint
        ? new GeoPoint(locationPoint.latitude, locationPoint.longitude)
        : null,
      location: location,
      date: Timestamp.fromDate(new Date(date)),
      createdAt: Timestamp.now(),
      allDay: isAllDay,
      organizerId
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, "events"), eventData);

    console.log("Event published successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error publishing event:", error);
    throw error;
  }
};

module.exports = { publishEvent };
