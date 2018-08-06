# == Schema Information
#
# Table name: artwork_tags
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  tag_id     :bigint(8)
#

class ArtworkTag < ApplicationRecord
  belongs_to :tag, inverse_of: :artwork_tags
  belongs_to :artwork, inverse_of: :artwork_tags
end
