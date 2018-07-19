# == Schema Information
#
# Table name: user_artwork_favorites
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  user_id    :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserArtworkFavorite < ApplicationRecord
  belongs_to :user
  belongs_to :artwork
end
