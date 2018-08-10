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
#  price               :float
#

class Artwork < ApplicationRecord
  belongs_to :artist
  belongs_to :artwork_category, inverse_of: :artworks
  belongs_to :user
  has_many :artwork_images, inverse_of: :artwork
  has_many :artwork_logs, inverse_of: :artwork
  has_many :user_artwork_favorites, inverse_of: :artwork
  has_many :artwork_tags, inverse_of: :artwork
  has_many :tags, through: :artwork_tags
  has_many :bids
  belongs_to :featured_image, class_name: 'ArtworkImage', optional: true

  before_save :update_cents
  before_save :update_featured_image

  validates_length_of :bio, minimum: 15, maximum: 300, allow_blank: false
  accepts_nested_attributes_for :artwork_images, allow_destroy: true

  # validates_length_of :overview, minimum: 15, maximum: 300, allow_blank: false

  extend FriendlyId
  friendly_id :custom_slug, use: [:slugged, :finders]

  def owner
    user
  end

  def update_featured_image
    if featured_image.blank?
      featured_image_id = artwork_images[0].id
    end
  end

  def update_cents
    self.price_in_cents = price * 100
  end

  def custom_slug
    "#{title}-#{artist.full_name.parameterize}"
  end

  def image
    self.artwork_images.last.url
  end

  def images
    artwork_images.pluck(:url)
  end

  def image_count
    self.artwork_images.count
  end

  def max_images
    3
  end

  def has_room
    image_count < max_images
  end

  def as_json(options = {})
    if options[:index]
      # images = artwork_images.to_a.unshift(image)
      {
        id: id,
        title: title,
        images: images,
        description: description,
        artist_name: artist.full_name,
        category: artwork_category.title,
        tags: tags.pluck(:title).join(', '),
        artist: artist,
        price: price,
        slug: slug,
        created_at: created_at.strftime('%B %d, %Y'),
      }
    else
      super
    end
  end

end
