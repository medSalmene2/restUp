import { doc, getDoc } from "firebase/firestore";
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

module.exports = { fetchUserInfo };
