import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventCreationInfo1 from "../components/EventCreationInfo1";
import EventCreationInfo2 from "../components/EventCreationInfo2";
import Map from "./Map";
import { publishEvent } from "../firestore/events/Publish";
import { useAuth } from "../firestore/auth/AuthContext";

const EventCreationStack = createStackNavigator();

const EventCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState("Choisissez un lieu pour l'événement");
  const [locationPoint, setLocationPoint] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const { user } = useAuth();

  const eventProps = {
    title,
    setTitle,
    description,
    setDescription,
    notes,
    setNotes,
    selectedCategories,
    setSelectedCategories,
    guestCount,
    setGuestCount,
    selectedDate,
    setSelectedDate,
    location,
    setLocation,
    isAllDay,
    setIsAllDay,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    locationPoint,
    setLocationPoint,
  };

  return (
    <EventCreationStack.Navigator>
      <EventCreationStack.Screen name='EventInfo'>
        {props => <EventCreationInfo1 {...props} {...eventProps} />}
      </EventCreationStack.Screen>

      <EventCreationStack.Screen name='EventDetails'>
        {props => (
          <EventCreationInfo2
            {...props}
            {...eventProps}
            handleSumbit={() =>
              publishEvent(
                title,
                selectedCategories,
                description,
                notes,
                isAllDay,
                fromTime,
                toTime,
                guestCount,
                location,
                locationPoint,
                selectedDate,
                user.id
              )
            }
          />
        )}
      </EventCreationStack.Screen>
      <EventCreationStack.Screen name='EventLocation'>
        {props => <Map {...props} {...eventProps} />}
      </EventCreationStack.Screen>
    </EventCreationStack.Navigator>
  );
};

export default EventCreation;
