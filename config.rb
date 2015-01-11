###
# Blog settings
###

Time.zone = "Tokyo"

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  # Permalink format
  blog.permalink = '{year}/{month}/{day}/{title}.html'
  # Matcher for blog source files
  blog.sources = 'posts/{year}-{month}-{day}-{title}.html'
  blog.summary_length = 250
  blog.default_extension = '.md'

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = 'page/{num}'
end

###
# Compass
###

# Change Compass configuration
compass_config do |config|
  config.output_style = :nest
  config.line_comments = false
end
require 'compass-normalize'
require 'breakpoint'
require 'font-awesome-sass'

###
# Sprockets
###

sprockets.append_path 'components'
activate :react, harmony: true
after_configuration do
  sprockets.append_path File.dirname(::React::Source.bundled_path_for('react.js'))
end

with_layout :layout do
  page "/entries.json", :layout => false
end

set :css_dir, 'style'
set :js_dir, 'js'
set :images_dir, 'images'
set :slim, { pretty: true, sort_attrs: false, format: :html }
Tilt::CoffeeScriptTemplate.default_bare = true

#deploy
activate :deploy do |deploy|
  deploy.method = :git
end

configure :build do
  # activate :minify_css
  # activate :minify_javascript
  # activate :asset_hash
  activate :relative_assets
  # set :http_prefix, "/Content/images/"
end
