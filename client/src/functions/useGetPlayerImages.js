import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPlayerImages = playerId => {
  const [playerImage, setPlayerImage] = useState([]);

  useEffect(() => {
    (async id => {
      if (id !== 0) {
        let response;
        try {
          response = await axios.get(
            `http://localhost:5000/api/players/image/${id}`,
            {
              responseType: "arraybuffer"
            }
          );
          setPlayerImage(
            new Buffer.from(response.data, "binary").toString("base64")
          );
        } catch {
          try {
            response = await axios.get(
              "https://is5-ssl.mzstatic.com/image/thumb/Purple62/v4/e3/45/ed/e345edf0-a8b0-6919-746e-cf8d67e3e323/source/1280x1280bb.jpg",
              {
                responseType: "arraybuffer"
              }
            );
            setPlayerImage(
              new Buffer.from(response.data, "binary").toString("base64")
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    })(playerId);
  }, [playerId]);

  return playerImage;
};
