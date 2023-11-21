import React from "react";
import "./addpost.scss";
import { useAddPost } from "../../customhooks/postshook/useAddPost";
const AddPost = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    handleImageChange,
    setTags,
    errors,
    isloading,
  } = useAddPost();
  React.useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="main-form-container">
        <div className="form-container">
          <div className="image-container">
            <h1>SO Space</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              cum, alias totam numquam ipsa exercitationem dignissimos, error
              nam, consequatur.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-main-container">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  placeholder="Post Title"
                  {...register("title", { required: "Title is required" })}
                  autoComplete="title"
                />
                <p className="error">{errors.title?.message}</p>
              </div>

              <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea
                  placeholder="Title Body"
                  {...register("body", { required: "Body is required" })}
                  rows={2}
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

              <button type="submit" disabled={isloading}>
                {isloading ? "Loading" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
