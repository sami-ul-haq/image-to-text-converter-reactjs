import React from "react";

const ImageWrapper = ({ uploadFile, loading }) => {
  return (
    <div className="image-wrapper">
      {loading ? (
        <h2>Your Image Is Processing ....Plz Wait!</h2>
      ) : (
        <form>
          <input
            type="file"
            className="custom-file-input"
            onChange={(e) => uploadFile(e)}
            crossOrigin="anonymous"
          />
        </form>
      )}
    </div>
  );
};

export default ImageWrapper;
