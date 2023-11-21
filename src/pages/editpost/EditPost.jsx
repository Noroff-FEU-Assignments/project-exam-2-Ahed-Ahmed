import React from "react";
import { useParams } from "react-router-dom";
import "./editpost.scss";
import { useEditPost } from "../../customhooks/postshook/useEditPost";
import CircularProgress from "@mui/material/CircularProgress";
const EditPost = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    errors,
    postData,
    tags,
    isloading,
    setTags,
    handleImageChange,
    handleInputChange,
    issuccess,
  } = useEditPost(id);
  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);
  if (isloading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "8vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (issuccess) {
    return (
      <div className="editpost-main-container">
        <div className="form-container">
          <div className="image-container">
            <h1>SO Space</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              cum, alias totam numquam ipsa exercitationem dignissimos, error
              nam, consequatur.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-main-container">
              <div className="form-group">
                <label htmlFor="image">C.Image</label>
                <div className="current-image">
                  <img src={postData?.media} alt="" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  placeholder="Post Title"
                  {...register("title", { required: "Title is required" })}
                  autoComplete="title"
                  value={postData?.title}
                  onChange={handleInputChange}
                />
                <p className="error">{errors.title?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea
                  placeholder="Title Body"
                  {...register("body", { required: "Body is required" })}
                  rows={2}
                  value={postData?.body}
                  onChange={handleInputChange}
                />

                <p className="error">{errors.body?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags:</label>
                <input
                  type="text"
                  placeholder="Hash Tags"
                  autoComplete="tags"
                  onChange={(e) => {
                    setTags(e.target.value.split(" "));
                  }}
                  value={tags.join(" ")}
                  name="tags"
                />
                <p className="error">{errors.tags?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  {...register("media")}
                  onChange={handleImageChange}
                  className="noborderinput"
                />
              </div>

              {/* Submit button */}
              <button type="submit" disabled={isloading}>
                {isloading ? "Loading" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default EditPost;
