RegExp.escape = function( value ) {
     return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

var Search = React.createClass({
  render() {
    return(<input></input>);
  }
});

var ArticleList = React.createClass({
  render() {
    articles = this.props.data.map( (article, index) =>
        <Article data={article} key={index} />
    )
    return (
        <div className="archive-list">
            {articles}
        </div>
     )
  }
});

var Article = React.createClass({
  render() {
    return(
        <div className="article-result">
            <div className="article-infomation">
              <span className="archive-posted-date-wrapper"><i className="fa fa-clock-o"></i><span className="posted-date">{this.props.data.date}</span></span>
              <a href={this.props.data.url}>{this.props.data.title}</a>
            </div>
            <div className="article-content">
              {this.props.data.hit_point}
            </div>
        </div>
    );
  }
});

var SearchBox = React.createClass({
  load() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: data => this.setState({data: data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  },
  getInitialState() {
    return {
      data: [],
      result: []
    };
  },
  componentDidMount() {
    this.load();
  },
  search() {
    var word = this.refs.search_word.getDOMNode().value;
    if(word === "") {
      this.setState({result: []});
      return;
    }
    var result = _.chain(this.state.data)
        .map(v => {
          var size = 80;
          match_attr = v.content.match(new RegExp(`(.?)(.{0,${size}})(${RegExp.escape(word)})(.{0,${size}})(.?)`, "i"));
          if(match_attr && word) {
            v.hit_point = <span>
                            {match_attr[1] ? "..." : ""}{match_attr[2]}
                            <span className="highlight">{match_attr[3]}</span>
                            {match_attr[4]}{match_attr[5] ? "..." : ""}
                          </span>;
          } else {
            delete v.hit_point;
          }
          return (~v.title.indexOf(word) || match_attr) ? v : null;
        })
        .filter(v => v != null)
        .value();
    this.setState({result: result});
  },
  render() {
    var v = "te";
    return (
        <div className="search-box">
          <h1>Search</h1>
          <input onChange={this.search} ref="search_word" placeholder="Search word" />
          <ArticleList data={this.state.result} />
        </div>
        );
  }
});

React.render(
  <SearchBox url="/entries.json" />,
  document.getElementById('search')
);
