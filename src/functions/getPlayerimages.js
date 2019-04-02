// https://nhl.bamcontent.com/images/actionshots/8471214.jpg
import { useState, useEffect } from "react";
import axios from "axios";

export const getPlayerImages = playerId => {
  const [playerImage, setPlayerImage] = useState([]);

  useEffect(() => {
    (async id => {
      if (id !== 0) {
        let response;
        try {
          response = await axios.get(
            `https://nhl.bamcontent.com/images/actionshots/${id}.jpg`,
            {
              responseType: "arraybuffer"
            }
          );
        } catch {
          try {
            response = await axios.get(
              "https://is5-ssl.mzstatic.com/image/thumb/Purple62/v4/e3/45/ed/e345edf0-a8b0-6919-746e-cf8d67e3e323/source/1280x1280bb.jpg",
              {
                responseType: "arraybuffer"
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
        setPlayerImage(
          new Buffer.from(response.data, "binary").toString("base64")
        );
      }
    })(playerId);
  }, [playerId]);

  return playerImage;
};
