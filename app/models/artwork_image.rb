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
end
