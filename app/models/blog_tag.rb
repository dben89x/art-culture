# == Schema Information
#
# Table name: blog_tags
#
#  id         :bigint(8)        not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BlogTag < ApplicationRecord
  has_many :blog_post_tags
  has_many :blog_posts, through: :blog_post_tags
end
