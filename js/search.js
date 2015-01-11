RegExp.escape = function( value ) {
     return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

var Search = React.createClass({displayName: "Search",
  render:function() {
    return(React.createElement("input", null));
  }
});

var ArticleList = React.createClass({displayName: "ArticleList",
  render:function() {
    articles = this.props.data.map( function(article, index) 
        {return React.createElement(Article, {data: article, key: index});}
    )
    return (
        React.createElement("div", {className: "archive-list"}, 
            articles
        )
     )
  }
});

var Article = React.createClass({displayName: "Article",
  render:function() {
    return(
        React.createElement("div", {className: "article-result"}, 
            React.createElement("div", {className: "article-infomation"}, 
              React.createElement("span", {className: "archive-posted-date-wrapper"}, React.createElement("i", {className: "fa fa-clock-o"}), React.createElement("span", {className: "posted-date"}, this.props.data.date)), 
              React.createElement("a", {href: this.props.data.url}, this.props.data.title)
            ), 
            React.createElement("div", {className: "article-content"}, 
              this.props.data.hit_point
            )
        )
    );
  }
});

var SearchBox = React.createClass({displayName: "SearchBox",
  load:function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data)  {return this.setState({data: data});}.bind(this),
      error: function(xhr, status, err)  {return console.error(this.props.url, status, err.toString());}.bind(this)
    });
  },
  getInitialState:function() {
    return {
      data: [],
      result: []
    };
  },
  componentDidMount:function() {
    this.load();
  },
  search:function() {
    var word = this.refs.search_word.getDOMNode().value;
    if(word === "") {
      this.setState({result: []});
      return;
    }
    var result = _.chain(this.state.data)
        .map(function(v)  {
          var size = 80;
          match_attr = v.content.match(new RegExp(("(.?)(.{0," + size + "})(" + RegExp.escape(word) + ")(.{0," + size + "})(.?)"), "i"));
          if(match_attr && word) {
            v.hit_point = React.createElement("span", null, 
                            match_attr[1] ? "..." : "", match_attr[2], 
                            React.createElement("span", {className: "highlight"}, match_attr[3]), 
                            match_attr[4], match_attr[5] ? "..." : ""
                          );
          } else {
            delete v.hit_point;
          }
          return (~v.title.indexOf(word) || match_attr) ? v : null;
        })
        .filter(function(v)  {return v != null;})
        .value();
    this.setState({result: result});
  },
  render:function() {
    var v = "te";
    return (
        React.createElement("div", {className: "search-box"}, 
          React.createElement("h1", null, "Search"), 
          React.createElement("input", {onChange: this.search, ref: "search_word", placeholder: "Search word"}), 
          React.createElement(ArticleList, {data: this.state.result})
        )
        );
  }
});

React.render(
  React.createElement(SearchBox, {url: "/entries.json"}),
  document.getElementById('search')
);
