class BlogCategory < ApplicationRecord
  has_many :blog_posts, inverse_of: :blog_category
end
