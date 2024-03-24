import useNewsCard from "./NewsCard.hooks";

const NewsCard = ({ article }) => {
  const { transformedArticle } = useNewsCard({article});

  return (
    <div className="card">
      <img src={transformedArticle?.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{transformedArticle?.title}</h5>
        <p className="card-text">{transformedArticle?.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <b>published At:</b> {transformedArticle?.publishedAt}
        </li>

        <li className="list-group-item">
          <b>Author:</b> {transformedArticle?.author}
        </li>
        <li className="list-group-item">
          <b>Source:</b> {transformedArticle?.source}
        </li>
      </ul>
      {transformedArticle?.link && (
        <div className="card-body">
          <a
            href={transformedArticle?.link}
            className="card-link"
            target="_blank"
            rel="noreferrer"
          >
            Article link
          </a>
        </div>
      )}
    </div>
  );
};
export default NewsCard;
