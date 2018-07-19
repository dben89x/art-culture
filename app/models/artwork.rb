# == Schema Information
#
# Table name: artworks
#
#  id                  :bigint(8)        not null, primary key
#  artist_id           :bigint(8)
#  artwork_category_id :bigint(8)
#  buyer_id            :bigint(8)
#  title               :string
#  published           :boolean
#  description         :string
#  overview            :string
#  bio                 :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  slug                :string
#

class Artwork < ApplicationRecord
  belongs_to :artist
  has_many :artwork_images
  has_many :user_artwork_favorites

  extend FriendlyId
  friendly_id :custom_slug, use: [:slugged, :finders]

  def owner

  end

  def custom_slug
    "#{title}-#{artist.full_name.parameterize}"
  end

  def as_json(options = {})
    if options[:index]
      # images = artwork_images.to_a.unshift(image)
      images = artwork_images.pluck(:url)
      {
        id: id,
        title: title,
        images: images,
        description: description,
        artist_name: artist.full_name,
        artist: artist,
        slug: slug,
        created_at: created_at.strftime('%B %d, %Y'),
      }
    else
      super
    end
  end

end
