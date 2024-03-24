const useNewsCard = ({ article }) => {
  const handelDate = (publishedAt) => {
    const date = new Date(publishedAt);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return date.toLocaleString("en-US", options);
  };

  const newsApiTransformedArticle = {
    title: article?.title,
    image: article?.urlToImage,
    description: article?.description,
    publishedAt: article?.publishedAt && handelDate(article?.publishedAt),
    author: article?.author,
    source: article?.source?.name,
    link: article?.url
  };

  const nyTimesTransformedArticle = {
    title: article?.title,
    image:
      article?.media?.length > 0 && article?.media[0]["media-metadata"][2]?.url,
    description: article?.abstract,
    publishedAt: article?.published_date && handelDate(article?.published_date),
    author: article?.byline,
    source: article?.source,
    link: article?.url
  };

  const theGuardianTransformedArticle = {
    title: article?.webTitle,
    image:
      article?.elements?.length > 0 && article?.elements[1]?.assets[0]?.file,
    description: "",
    publishedAt:
      article?.webPublicationDate && handelDate(article?.webPublicationDate),
    author: "-",
    source: "The Guardian",
    link: article?.webUrl
  };

  const transformedArticle = {
    title:
      newsApiTransformedArticle.title ||
      nyTimesTransformedArticle.title ||
      theGuardianTransformedArticle.title ||
      "-",
    image:
      newsApiTransformedArticle.image ||
      nyTimesTransformedArticle.image ||
      theGuardianTransformedArticle.image ||
      "https://via.placeholder.com/300",
    description:
      newsApiTransformedArticle.description ||
      nyTimesTransformedArticle.description ||
      theGuardianTransformedArticle.description ||
      "",
    publishedAt:
      newsApiTransformedArticle.publishedAt ||
      nyTimesTransformedArticle.publishedAt ||
      theGuardianTransformedArticle.publishedAt ||
      "-",
    author:
      newsApiTransformedArticle.author ||
      nyTimesTransformedArticle.author ||
      theGuardianTransformedArticle.author ||
      "-",
    source:
      newsApiTransformedArticle.source ||
      nyTimesTransformedArticle.source ||
      theGuardianTransformedArticle.source ||
      "-",
    link:
      newsApiTransformedArticle.link ||
      nyTimesTransformedArticle.link ||
      theGuardianTransformedArticle.link ||
      false
  };

  return {
    transformedArticle
  };
};
export default useNewsCard;
