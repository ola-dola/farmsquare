import { useEffect, useState } from "react";
import "./feed.scss";
import axios from "axios";
import useCustomToast from "../hooks/useCustomToast";

export default function Feeds() {
  const [feeds, setFeeds] = useState([]);
  const customToast = useCustomToast();
  const fetchFeeds = async () => {
    const token = localStorage.getItem("accessToken");

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/myfeed`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setFeeds(res.data.posts);
    } catch (error) {
      customToast("error", error.message);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="feeds__wrapper">
      <aside className="sidebar">
        <ul>
          <li>My Feeds</li>
          <li>My Profile</li>
          <li>Logout</li>
        </ul>
      </aside>

      <section className="main">
        {!feeds.length ? (
          <div className="no__content">No content</div>
        ) : (
          feeds.map((feed) => (
            <div className="feed" key={feed.id}>
              <p>{feed.content}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
