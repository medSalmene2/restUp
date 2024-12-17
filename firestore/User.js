import { doc, getDoc, updateDoc , GeoPoint} from "firebase/firestore";
import { db } from "./config/config";

const fetchUserInfo = async uid => {
  try {
    if (!uid) {
      throw new Error("User ID is required");
    }

    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log("No user found with ID:", uid);
      return null;
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
      // Converting Timestamp to string if it exists
      lastLogin: userDoc.data().lastLogin?.toDate().toISOString(),
    };

    // Remove any sensitive fields if they exist
    delete userData.password;
    delete userData.secretKey;
    delete userData.sessionTokens;

    return userData;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to fetch user information");
  }
};
async function updateUserLocation(uid, location, locationName) {
  try {
    const userRef = doc(db, "users", uid); // Reference to the user's document

    // Update the Firestore document
    await updateDoc(userRef, {
      location: new GeoPoint(location.latitude, location.longitude),
      locationName: locationName,
    });

    console.log(`Successfully updated location for user with UID: ${uid}`);
  } catch (error) {
    console.error("Error updating user location: ", error);
  }
}

module.exports = { fetchUserInfo , updateUserLocation };
