import styles from "./Pagination.module.css";

function Pagination({ page, setPage, setIsloading }) {
  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
    setIsloading(true);
  };

  const prevHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
    setIsloading(true);
  };

  return (
    <div className={styles.container}>
      <button
        className={page === 1 ? styles.disabled : null}
        onClick={prevHandler}
      >
        Preview
      </button>
      <p className={page === 1 ? styles.selected : null}>1</p>
      <p className={page === 2 ? styles.selected : null}>2</p>
      <span>...</span>
      {page > 2 && page < 9 && (
        <>
          <p className={styles.selected}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 9 ? styles.selected : null}>9</p>
      <p className={page === 10 ? styles.selected : null}>10</p>
      <button
        className={page === 10 ? styles.disabled : null}
        onClick={nextHandler}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
