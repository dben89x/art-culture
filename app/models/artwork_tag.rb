class ArtworkTag < ApplicationRecord
  belongs_to :tag, inverse_of: :artwork_tags
  belongs_to :artwork, inverse_of: :artwork_tags
end
