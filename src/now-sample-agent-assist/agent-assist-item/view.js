import {ARTICLE} from '../constants';

const trimArticleBody = function (articleBody) {
	if (articleBody)
		return articleBody
			.replace(/<([^>]+)>/g, '')
			.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
			.substring(0, 102);

	return null;
};

export default state => {
	const {
		properties: {articleShortDescription, articleBody}
	} = state;

	return (
		<div className="now-agent-assist-search-list-item">
			<div className="now-agent-assist-search-list-item-header">
				<now-icon icon="document-outline" size="md"></now-icon>
				<span className="now-agent-assist-search-list-item-header-text">
					{ARTICLE}
				</span>
			</div>
			<div className="now-agent-assist-search-list-item-title">
				{articleShortDescription}
			</div>
			<div className="now-agent-assist-search-list-item-content">
				{trimArticleBody(articleBody)}
			</div>
		</div>
	);
};
