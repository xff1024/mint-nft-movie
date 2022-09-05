import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Spin } from "antd";
import { getMoiveDetailById } from "../../services/apis";
import { BASIC_IMAGE_URL } from "../../services/constant";
import "./index.scss";

export default function MovieDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const _getMovieDetails = async () => {
      setLoading(true);
      const res = await getMoiveDetailById({
        id,
      });
      setLoading(false);
      if (res) {
        setDetails(res);
      }
    };
    id && _getMovieDetails();
  }, [id]);

  return (
    <div className="movie-details">
      <Spin spinning={loading}>
        <Image
          src={
            details.poster_path
              ? `${BASIC_IMAGE_URL}${details.poster_path}`
              : ""
          }
          width={300}
          height={450}
          preview={false}
        />
        <div className="details-item">
          <span className="details-item-title">Movie ID:</span>
          {id}
        </div>
        <div className="details-item">
          <span className="details-item-title">Title: </span>
          {details.original_title}
        </div>
        <div className="details-item">
          <span className="details-item-title">Details: </span>
          {details.overview}
        </div>
      </Spin>
    </div>
  );
}
