import {ARTICLE} from '../constants';

const trimArticleBody = function (articleBody) {
	return articleBody ? <div>{articleBody.substring(0, 102)}</div> : null;
};

export default state => {
	const {
		properties: {articleShortDescription, articleBody}
	} = state;

	return (
		<div className="search-item">
			<div className="search-item-header">
				<now-icon icon="document-outline" size="md"></now-icon>
				<span className="search-item-header-text">{ARTICLE}</span>
			</div>
			<div className="search-item-title">{articleShortDescription}</div>
			<div className="search-item-content">{trimArticleBody(articleBody)}</div>
		</div>
	);
};
