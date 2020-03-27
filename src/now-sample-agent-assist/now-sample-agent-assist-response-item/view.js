

export default (coeffects) => {
    const { properties : {articleShortDescription , articleBody} } = coeffects;
    
    var div=document.createElement("div");
    div.innerHTML= articleBody;
    var excerpt=div.innerText.substring(0,100);

    return (
        <div className="search-item">
            <div className="search-item-header">
                <now-icon icon="document-outline" size="md"></now-icon>
                <span className="search-item-header-text" >Article</span>
            </div>
            <div className="search-item-title">{articleShortDescription}</div>
            <div className="search-item-content">{excerpt }</div>
        </div>
    )
}