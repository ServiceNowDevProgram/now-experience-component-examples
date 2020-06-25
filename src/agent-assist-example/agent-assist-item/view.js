import '@servicenow/now-heading';

const trimArticleBody = function (articleBody) {
	if (articleBody)
		return articleBody
			.replace(/<([^>]+)>/g, '')
			.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
			.substring(0, 150)
			.trim();

	return null;
};

export default state => {
	const {
		properties: {articleShortDescription, articleBody}
	} = state;

	return (
		<article>
			<header>
				<now-icon icon="document-outline" size="lg" />
				<span>Article</span>
				<now-heading
					label={articleShortDescription}
					variant="title-secondary"
				/>
			</header>
			<summary>{`${trimArticleBody(articleBody)}...`}</summary>
		</article>
	);
};
