import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/config";

const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach(doc => {
      console.log(`${doc.id} =>`, doc.data());
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

module.exports = { fetchUsers };
