import React, { FC } from "react";
import { getTrailer } from "../../api";
import { useQuery } from "react-query";

import { MdOutlineClose } from "react-icons/md";
import classes from "./ModalTrailer.module.scss";

interface TrailerProps {
  id: string;
  type: string;
  close: Function;
}

const ModalTrailer: FC<TrailerProps> = ({ id, type, close }) => {
  const { data, error } = useQuery("Trailer", () => getTrailer(type, id));
  const styles = {
    close: {
      color: "white",
    } as const,
  };

  if (error) {
    return <h1>Some thing went wrong</h1>;
  }

  return (
    <div className={classes.modal} onClick={() => close()}>
      <div className={classes.modal_content}>
        <div className={classes.modal_content_header}>
          <h4>Movie Trailer</h4>
          <div
            className={classes.modal_content_header_close}
            onClick={() => close()}
          >
            <MdOutlineClose style={styles.close} />
          </div>
        </div>
        <div className={classes.modal_content_body}>
          {data &&
            data.map((item) => {
              if (item.site === "YouTube") {
                return (
                  <div
                    key={item.key}
                    className={classes.modal_content_body_item}
                  >
                    <h5>{item.name}</h5>
                    <iframe
                      src={`https://www.youtube.com/embed/${item.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ModalTrailer;
