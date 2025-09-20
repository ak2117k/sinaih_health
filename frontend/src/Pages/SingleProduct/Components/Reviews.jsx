import { FaStar } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";
import { LuThumbsDown } from "react-icons/lu";
import axiosInstance from "../../../axios";

const Reviews = ({ singleProduct }) => {
  const handleReviewLike = async (reviewId) => {
    try {
      const response = await axiosInstance.put("/product/reviewLike", {
        reviewId: reviewId,
        productId: singleProduct._id,
      });

      if (response.status === 200) {
        console.log("Liked successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewDislike = async (reviewId) => {
    try {
      const response = await axiosInstance.put("/product/reviewDislike", {
        reviewId: reviewId,
        productId: singleProduct._id,
      });

      if (response.status === 200) {
        console.log("Disliked successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-4 gap-6">
      {singleProduct.reviews.map((r, index) => (
        <div className="p-2 shadow-2xl w-80 rounded-lg" key={index}>
          <div className="">
            <div className="flex gap-1">
              {[...new Array(5)].map((_, index) => (
                <div className="">
                  <FaStar
                    className=""
                    style={{
                      color: index + 1 <= r.ratings ? "rgb(253,199,0)" : "gray",
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="">{r.createdAt}</p>
          </div>
          <p className="">{r.comments}</p>
          <p className="">{r.name}</p>
          <div className="flex gap-2 mt-6">
            <div className="">Was this review helpful</div>
            <div className="flex gap-1" onClick={() => handleReviewLike(r._id)}>
              <FiThumbsUp className="mt-1 cursor-pointer" /> {r.like || 0}
            </div>
            <div
              className="flex gap-1"
              onClick={() => handleReviewDislike(r._id)}
            >
              <LuThumbsDown className="mt-1 cursor-pointer" />
              {r.dislike || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
