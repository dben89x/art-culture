# == Schema Information
#
# Table name: blog_posts
#
#  id               :bigint(8)        not null, primary key
#  blog_category_id :bigint(8)
#  image            :string
#  title            :string
#  description      :string
#  overview         :string
#  content          :text
#  slug             :string
#  published        :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class BlogPost < ApplicationRecord
  has_many :blog_post_tags
  has_many :blog_tags, through: :blog_post_tags

  belongs_to :blog_category, inverse_of: :blog_posts

  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  def related_posts
  end

  def as_json(options = {})
    if options[:index]
      {
        id: id,
        slug: slug,
        image: image,
        title: title,
        overview: overview,
        content: content,
        description: description,
        created_at: created_at.strftime('%B %d, %Y'),
        category: blog_category.title,
      }
    else
      super
    end
  end

end
