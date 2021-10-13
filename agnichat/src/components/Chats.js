import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../firebase";

export default function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    await auth.signOut();
    history.push("/");
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history.push("/");
        return;
      }

      // Get-or-Create should be in a Firebase Function
      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": "784bdb9e-8724-4f63-8ab6-3c10d59f74a7",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => setLoading(false))

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": "ebec5eaa-7904-44e3-830e-60d967604a99",
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  }, [user, history]);

  if (!user || loading) return <div />;

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">AgniChat</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="90ad88c1-8c7f-43ec-a54a-0aa51d01bbd2"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}
