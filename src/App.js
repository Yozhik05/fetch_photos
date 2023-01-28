import "./styles.css";
import { useState, React, useEffect } from "react";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingItem, setEditingItem] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((res) => res.json())
      // .catch((e) => console.error(e))
      .then((json) => setPhotos(json));
  }, []);

  return (
    <div className="App">
      <button
        style={{ position: "fixed", top: 0, left: 0 }}
        onClick={() => setEditingItem(0)}>
        Отмена
      </button>
      {photos.map((photo, index) => {
        return (
          <div className="Content" title={photo.title}>
            {editingItem === photo.id ? (
              <>
                <input
                  style={{ width: "100px" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </>
            ) : (
              <div className="label">{photo.title}</div>
            )}
            <img
              src={photo.url}
              alt="альтернативный текст"
              onClick={() => {
                if (photo.id === editingItem) {
                  //asdasadad
                  setPhotos((prev) => {
                    prev[index].title = title;
                    return prev;
                  });
                  setEditingItem(0);
                  console.log(title);
                } else {
                  setTitle(photo.title);
                  setEditingItem(photo.id);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
