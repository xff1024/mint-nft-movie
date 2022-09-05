import { useState } from "react";
import { Button, Image, Spin } from "antd";
import { getMoveLists } from "../../services/apis";
import { BASIC_IMAGE_URL } from "../../services/constant";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useContract from "../../hooks/useContract";
import useMintNft from "../../hooks/useMintNft";
import useActiveWeb3 from "../../hooks/useActiveWeb3";
import "./index.scss";

function MovieItem(props = {}) {
  const navigate = useNavigate();
  const { mintNft, mintLoading } = useMintNft();
  const { account } = useActiveWeb3();
  return (
    <div className="movie-item">
      <Image
        src={`${BASIC_IMAGE_URL}${props.poster_path}`}
        width={300}
        height={450}
        preview={false}
        onClick={() => {
          navigate(`/details/${props.id}`);
        }}
        rootClassName="movie-img-hover"
      />
      <div className="movie-item-title">{props.title}</div>
      <div>
        <Spin spinning={props.movieIdsLoading}>
          {props?.movieIds?.find((item) => item === Number(props.id)) ? (
            "Minted"
          ) : (
            <Button
              type="primary"
              loading={mintLoading}
              disabled={!account}
              onClick={() => {
                mintNft(
                  `${BASIC_IMAGE_URL}${props.poster_path}`,
                  "",
                  props.title,
                  props.id
                );
              }}
            >
              mint
            </Button>
          )}
        </Spin>
      </div>
    </div>
  );
}

export default function MovieList() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieIds, loading: movieIdsLoading } = useContract();

  useEffect(() => {
    const _getMoveLists = async () => {
      setLoading(true);
      const res = await getMoveLists({
        language: "en-US",
        region: "US",
        page: 1,
      });
      setLoading(false);
      if (Array.isArray(res?.results)) {
        setLists(res.results);
      }
    };
    _getMoveLists();
  }, []);
  return (
    <Spin spinning={loading}>
      <div className="movie-page">
        <div className="movie-page-title">Movies Now Playing</div>
        <div className="movie-lists">
          {lists.map((item) => (
            <MovieItem
              {...item}
              key={item.id}
              movieIds={movieIds}
              movieIdsLoading={movieIdsLoading}
            />
          ))}
        </div>
      </div>
    </Spin>
  );
}
