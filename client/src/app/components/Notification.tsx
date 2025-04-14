"use client";
import socket from "@/lib/socket";
import React, { useEffect, useState } from "react";

export interface INotification {
  _id?: string;
  user: string;
  content: string;
  isRead?: boolean;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
const Notification = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        "http://localhost:4000/api/v1/notifications",
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setNotifications(data?.data);
    };
    fetchNotifications();

    socket.on("notification", (notification) => {
      console.log(notification);
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      Notification
      <ul>
        {notifications?.map((notification) => (
          <li key={notification?._id}>{notification?.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
