# == Schema Information
#
# Table name: blog_post_tags
#
#  id           :bigint(8)        not null, primary key
#  blog_post_id :bigint(8)
#  blog_tag_id  :bigint(8)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class BlogPostTag < ApplicationRecord
  belongs_to :blog_post
  belongs_to :blog_tag
end
