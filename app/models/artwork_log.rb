# == Schema Information
#
# Table name: artwork_logs
#
#  id          :bigint(8)        not null, primary key
#  type        :string
#  artwork_id  :bigint(8)
#  buyer_id    :bigint(8)
#  bid_id      :bigint(8)
#  price       :integer
#  notes       :text
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ArtworkLog < ApplicationRecord
  belongs_to :artwork, inverse_of: :artwork_logs
  belongs_to :bid, inverse_of: :artwork_logs
  belongs_to :buyer, inverse_of: :artwork_logs
end
