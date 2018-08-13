# == Schema Information
#
# Table name: artwork_categories
#
#  id    :bigint(8)        not null, primary key
#  title :string
#  image :string
#  slug  :string
#

class ArtworkCategory < ApplicationRecord
  has_many :artworks, inverse_of: :artwork_category

  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  # attr_accessor :image, :image_cache
  # mount_uploader :image, ArtworkCategoryImageUploader
end
