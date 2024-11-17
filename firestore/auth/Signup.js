import { auth, db } from "../config/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const signupHandler = async (
  firstName,
  lastName,
  phoneNumber,
  gender,
  birthDate,
  profileImage,
  password
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      `${phoneNumber}@domain.com`, // Using phone number as email
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName,
      lastName,
      phoneNumber,
      gender,
      birthDate,
      profileImage,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    throw err;
  }
};
module.exports = { signupHandler };
