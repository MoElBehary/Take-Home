import { useEffect, useState } from "react";

import { newsApi, nyTimesApi, guardianApi } from "../../services/APIs";

import { format } from "date-fns";

const useNewsHome = () => {
  const [totalItems, setTotalItems] = useState(100);

  const [newsApiData, setNewsApiData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilter] = useState({
    keyword: "",
    source: "All Sources",
    startDate: "",
    endDate: "",
    searchBy: "keyword",
    page: 1,
    pageSize: 15
  });

  const sources = [
    {
      name: "All Sources",
      availableFilters: {
        keywords: ["keyword", "categories"],
        startDate: true,
        endDate: true,
        sources: true,
        pagination: true
      }
    },
    {
      name: "The Guardian",
      availableFilters: {
        keywords: ["keyword", "categories"],
        startDate: true,
        endDate: true,
        sources: true,
        pagination: true
      }
    },
    {
      name: "News",
      availableFilters: {
        keywords: ["keyword"],
        startDate: true,
        endDate: true,
        sources: true,
        pagination: true
      }
    },
    {
      name: "Times",
      availableFilters: {
        keywords: null,
        startDate: false,
        endDate: false,
        sources: true,
        pagination: false
      }
    }
  ];

  const [error, setError] = useState(null);

  const handleAvailableFilters = () => {
    return sources.findIndex((item) => item.name === filters?.source);
  };

  const getNewsApi = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await newsApi.get(
        `/everything?pageSize=${filters?.pageSize}${
          filters?.searchBy === "keyword" && filters?.keyword
            ? "&q=" + filters?.keyword
            : "&q=everything"
        }&page=${filters?.page}${
          filters?.startDate
            ? "&from=" + format(filters?.startDate, "yyyy-MM-dd")
            : ""
        }${
          filters?.endDate
            ? "&to=" + format(filters?.endDate, "yyyy-MM-dd")
            : ""
        }`
      );
      setNewsApiData((prevArray) => [
        ...prevArray,
        ...response?.data?.articles
      ]);
      setTotalItems(100);
    } catch (error) {
      setError("Error fetching data: " + error?.message);
    }
    setIsLoading(false);
  };

  const getNyTimesApi = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await nyTimesApi.get(
        `/mostpopular/v2/viewed/1.json`
      );
      setNewsApiData((prevArray) => [...prevArray, ...response?.data?.results]);
    } catch (error) {
      setError("Error fetching data: " + error?.message);
    }
    setIsLoading(false);
  };

  const getGuardianApiApi = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await guardianApi.get(
        `/search?show-elements=image${
          filters?.searchBy === "keyword" && filters?.keyword
            ? "&q=" + filters?.keyword
            : ""
        }&show-references=author&page=${filters?.page}&page-size=${
          filters?.pageSize
        }${
          filters?.startDate
            ? "&from-date=" + format(filters?.startDate, "yyyy-MM-dd")
            : ""
        }${
          filters?.endDate
            ? "&to-date=" + format(filters?.endDate, "yyyy-MM-dd")
            : ""
        }${
          filters?.searchBy === "categories" && filters?.keyword
            ? "&section=" + filters?.keyword
            : ""
        }`
      );
      setNewsApiData((prevArray) => [
        ...prevArray,
        ...response?.data?.response?.results
      ]);
      setTotalItems(response?.data?.response?.total);
    } catch (error) {
      setError("Error fetching data: " + error?.message);
    }
    setIsLoading(false);
  };

  const getSource = (source) => {
    switch (source) {
      case sources[0].name:
        getGuardianApiApi();
        getNewsApi();
        getNyTimesApi();

        break;

      case sources[1].name:
        getGuardianApiApi();
        break;

      case sources[2].name:
        getNewsApi();
        break;

      case sources[3].name:
        getNyTimesApi();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getSource(filters.source);
    return () => {
      setNewsApiData([]);
    };
  }, [filters]);

  const totalPages = Math.ceil(totalItems / filters?.pageSize);

  const handlePageChange = ({ selected }) => {
    setFilter({ ...filters, page: selected + 1 });
  };


  return {
    newsApiData,
    isLoading,
    error,

    totalPages,
    handlePageChange,

    filters,
    setFilter,
    sources,
    handleAvailableFilters
  };
};

export default useNewsHome;
