# == Schema Information
#
# Table name: artwork_images
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  url        :string
#  published  :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ArtworkImage < ApplicationRecord
  belongs_to :artwork

  validate :is_within_limit

  def is_within_limit
    unless self.artwork.has_room
      errors.add(:base, "Artwork has too many images")
    end
  end
end
