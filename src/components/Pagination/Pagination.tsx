import React, { FC, useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import classes from "./Pagination.module.scss";

interface PaginationPros {
  total_pages: number;
  currentPage: number;
  setCurrentPage: Function;
}

const Pagination: FC<PaginationPros> = ({
  total_pages,
  currentPage,
  setCurrentPage,
}) => {
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [pagination] = useState((): number[] => {
    const pages = [];
    for (let i = 1; i <= total_pages; i++) {
      pages.push(i);
    }
    return pages;
  });

  const styles = {
    close: {
        color: 'white',
    } as const,
  }   

  const handleNextBtn = (): void => {
    setCurrentPage((prev: number) => prev + 1);
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit((prev) => prev + 5);
      setMinPageLimit((prev) => prev + 5);
    }
  };

  const handlePrevBtn = (): void => {
    setCurrentPage((prev: number) => prev - 1);
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit((prev) => prev + 5);
      setMinPageLimit((prev) => prev + 5);
    }
  };

  const handleChangePage = (number: number): void => {
    setCurrentPage(number);
  };

  return (
    <div className={classes.pagination}>
      <button
        disabled={currentPage === 1 ? true : false}
        onClick={handlePrevBtn}
        className={`${classes.page} ${classes.btn_page}`}
      >
        <span className={classes.page_link}>
          <MdOutlineNavigateBefore style={styles.close} />
        </span>
      </button>
      {pagination.map((number) => {
        if (number <= maxPageLimit && number > minPageLimit) {
          return (
            <div
              key={number}
              onClick={() => handleChangePage(number)}
              className={
                Number(number) === currentPage
                  ? `${classes.page} ${classes.page_active}`
                  : `${classes.page}`
              }
            >
              <span className={classes.page_link}>{number}</span>
            </div>
          );
        } else {
          return null;
        }
      })}
      <button
        onClick={handleNextBtn}
        className={`${classes.page} ${classes.btn_page}`}
        disabled={currentPage === pagination.length - 1 ? true : false}
      >
        <span className={classes.page_link}>
          <MdOutlineNavigateNext style={styles.close} />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
