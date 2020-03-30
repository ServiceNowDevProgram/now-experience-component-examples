import { ARTICLE } from '../constants';

const trimArticleBody = function(articleBody){
    
    if(articleBody == "" || articleBody == null){
        return "";
    }else{
        var div=document.createElement("div");
        div.innerHTML= articleBody;
        return div.innerText.substring(0,102);
    }    
}

export default (coeffects) => {
    const { properties : {articleShortDescription , articleBody} } = coeffects;
    
    return (
        <div className="search-item">
            <div className="search-item-header">
                <now-icon icon="document-outline" size="md"></now-icon>
                <span className="search-item-header-text" >{ARTICLE}</span>
            </div>
            <div className="search-item-title">{articleShortDescription}</div>
            <div className="search-item-content">{trimArticleBody(articleBody)}</div>
        </div>
    )
}