import Tesseract from "tesseract.js";
import ImageWrapper from "./components/ImageWrapper";
import TextWrapper from "./components/TextWrapper";
import axios from "axios";
import "./styles/App.css";
import { useEffect, useState } from "react";

const API_KEY = "93f37e026ad0e249bf805043108d7e19";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(null);

  const uploadFile = async (e) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY}`,
        formData,
        config
      );
      setImageUrl(response.data.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const convertImageToText = async () => {
      setLoading(true);
      const result = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => console.log(m),
      });
      console.log(result);
      setText(result.data.text);
      setLoading(false);
    };

    if (imageUrl !== null) {
      convertImageToText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <div className="App">
      <img
        src="https://i.ibb.co/LpxDvR1/logo.png"
        alt="logo"
        className="logo"
      />
      <div className="container">
        {loading && <div className="loader"></div>}
        {text == null ? (
          <ImageWrapper loading={loading} uploadFile={uploadFile} />
        ) : (
          <TextWrapper text={text} />
        )}
      </div>
    </div>
  );
}

export default App;
