# == Schema Information
#
# Table name: artwork_categories
#
#  id    :bigint(8)        not null, primary key
#  title :string
#

class ArtworkCategory < ApplicationRecord
  has_many :artworks, inverse_of: :artwork_category
end
