import { useRef } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Filters = ({ filters, setFilter, sources, handleAvailableFilters }) => {
  const searchInput = useRef(null);

  const handelSubmit = () => {
    setFilter({ ...filters, keyword: searchInput.current.value });
  };
  const handleSources = (e) => {
    setFilter({ ...filters, source: e.target.value });
  };
  const handleSearchBy = (e) => {
    setFilter({ ...filters, searchBy: e.target.value });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFilter({ ...filters, keyword: searchInput.current.value });
    }
  };

  return (
    <header className="gap-4 d-flex flex-column">
      {sources[handleAvailableFilters()]?.availableFilters?.keywords && (
        <div className="row flex-md-row g-4">
          <div className="col-lg-9 col-md-8 col-12">
            <div className=" input-group">
              <span className="input-group-text" id="addon-wrapping">
                <img
                  src="/icons/search.svg"
                  alt="Search icon"
                  width="16"
                  height="16"
                />
              </span>
              <input
                ref={searchInput}
                type="search"
                className="form-control"
                placeholder={`Search by ${filters?.searchBy}...`}
                aria-label="Search"
                aria-describedby="search"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={handelSubmit}
                className="btn btn-outline-secondary"
                type="button"
                id="search"
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-md col-12">
            <select
              className="form-select"
              aria-label="search by"
              onChange={handleSearchBy}
            >
              {sources[
                handleAvailableFilters()
              ]?.availableFilters?.keywords?.map((keyword, index) => (
                <option key={index} value={keyword}>
                  Search by {keyword}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="row flex-md-row g-4">
        {(sources[handleAvailableFilters()]?.availableFilters?.startDate ||
          sources[handleAvailableFilters()]?.availableFilters?.endDate) && (
          <div className="col-lg-9 col-md-8 col-12 d-flex gap-4">
            <div className="flex-grow-1">
              <DatePicker
                selected={filters?.startDate}
                onChange={(date) =>
                  setFilter({
                    ...filters,
                    startDate: date
                  })
                }
                selectsStart
                startDate={filters?.startDate}
                endDate={filters?.endDate}
                placeholderText="Start Date"
              />
            </div>
            <div className="flex-grow-1">
              <DatePicker
                selected={filters?.endDate}
                onChange={(date) =>
                  setFilter({
                    ...filters,
                    endDate: date
                  })
                }
                selectsEnd
                startDate={filters?.startDate}
                endDate={filters?.endDate}
                minDate={filters?.startDate}
                placeholderText="End Date"
              />
            </div>
          </div>
        )}
        {sources[handleAvailableFilters()]?.availableFilters?.sources && (
          <div className="col-md col-12">
            <select
              className="form-select"
              aria-label="sources"
              onChange={handleSources}
              value={filters?.source}
            >
              {sources?.map((source, index) => (
                <option key={index} value={source?.name}>
                  {source?.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </header>
  );
};
export default Filters;
