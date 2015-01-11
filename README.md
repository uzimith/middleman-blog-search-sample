# Middleman-blog search Sample

I found middleman-blog search sample [joelhans/middleman-search-example](https://github.com/joelhans/middleman-search-example). However, it's using jQuery. I don't want to use such a library, so I rewrited with [React](http://facebook.github.io/react/) and I added some functions.

[Demo](https://uzimith.github.io/middleman-blog-search-sample/)

## Introduction

### 1. Create entryes.json.erb

Create `entries.json.erb`.

```
<%
entries = []
blog.articles.each do |article|
  entry = {
    :title => article.title,
    :url => article.url,
    :date => article.date.strftime('%Y-%m-%d'),
    :content => strip_tags(article.body).gsub(/[\r\n]/,"")
  }
  entries << entry
end
%><%=entries.to_json %>
```

This is using helper function `strip_tags`. Add this function.

```
def strip_tags(text)
    doc = Nokogiri::HTML::DocumentFragment.parse text
    doc.inner_text
end
```

### 2. Install dependency

This sample use `react`, `lodash`, `oboe`, so install as below.

```
$ bower install lodash
$ bower install oboe
```

And in `Gemfile`, add this gem.

```
gem "middleman-react"
```

### 3. Set config.rb

Set config.rb as below.

```
after_configuration do
  sprockets.append_path "#{root}/bower-components/"
end

activate :react, harmony: true
after_configuration do
  sprockets.append_path File.dirname(::React::Source.bundled_path_for('react.js'))
end

with_layout :layout do
  page "/entries.json", :layout => false
end
```

## 4. Create search javascript

Add the following require script to `all.js`.

```
//= require "react"
//= require "lodash/dist/lodash.min.js"
//= require "oboe/dist/oboe-browser.min.js"
```

And create [search.js.jsx](https://github.com/uzimith/middleman-blog-search-sample/blob/master/source/js/search.js.jsx).

## 5. Add #search to template

Add the following script to where you want to add.

```
#search
= javascript_include_tag "search"
```

That's all!
