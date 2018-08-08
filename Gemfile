source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.1.6'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'


group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "react_on_rails", "~> 11.0"

gem "friendly_id", "~> 5.2"

gem "activeadmin", "~> 1.3"

gem "cancancan", "~> 2.2"

gem "gibbon", "~> 3.2"

gem "carrierwave", "~> 0.10.0"
gem "carrierwave-crop", "~> 0.1.2"
gem 'fog', require: 'fog/aws'

gem "faker", "~> 1.8"

gem "figaro", "~> 1.1"

gem "annotate", "~> 2.7"

gem "erb2haml", "~> 0.1.5"

gem "haml", "~> 5.0"

gem "meta-tags", "~> 2.10"
ruby '2.4.0'

gem 'mini_racer', platforms: :ruby
gem "devise", "~> 4.4"

# Added at 2018-08-07 20:55:03 -0600 by doug:
gem "stripe", "~> 3.21"

# Added at 2018-08-08 12:43:49 -0600 by doug:
gem "arctic_admin", "~> 1.5"

# Added at 2018-08-08 15:19:33 -0600 by doug:
gem "inherited_resources", "~> 1.8"

# Added at 2018-08-08 15:19:54 -0600 by doug:
gem "has_scope", "~> 0.7.2"

# Added at 2018-08-08 15:20:06 -0600 by doug:
gem "responders", "~> 2.4"
