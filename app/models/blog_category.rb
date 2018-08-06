# == Schema Information
#
# Table name: blog_categories
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BlogCategory < ApplicationRecord
  has_many :blog_posts, inverse_of: :blog_category
end
