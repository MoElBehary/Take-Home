import Filters from "../../components/Filters";
import NewsCard from "../../components/NewsCard";
import Spinner from "../../components/utilities/Spinner";
import Pagination from "../../components/utilities/Pagination";

import useNewsHome from "./NewsHome.hooks";

import styles from "./NewsHome.module.scss";

const NewsHome = () => {
  const {
    newsApiData,
    isLoading,
    error,

    totalPages,
    handlePageChange,

    filters,
    setFilter,
    sources,
    handleAvailableFilters
  } = useNewsHome();

  return (
    <main className="container">
      <header>
        <h1 className="text-center mt-5 pt-5">Take Home</h1>
      </header>

      <section className={`py-5 my-5 bg-white ${styles.header}`}>
        <Filters
          sources={sources}
          filters={filters}
          setFilter={setFilter}
          handleAvailableFilters={handleAvailableFilters}
        />
      </section>

      <section>
        {newsApiData.length > 0 && (
          <div className={styles.gridContainer}>
            {newsApiData?.map((article, index) => (
              <div className={styles.gridItem} key={index}>
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        )}

        {isLoading && <Spinner />}

        {error && <div className="d-flex justify-content-center">{error}</div>}

        {newsApiData.length > 0 &&
          sources[handleAvailableFilters()]?.availableFilters?.pagination && (
            <>
              <hr className="my-4" />
              <div className="d-flex justify-content-center">
                <Pagination
                  handlePageChange={handlePageChange}
                  totalPages={totalPages}
                />
              </div>
            </>
          )}
      </section>
    </main>
  );
};
export default NewsHome;
