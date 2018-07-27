# == Schema Information
#
# Table name: bids
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  buyer_id   :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  open       :boolean
#  accepted   :boolean
#  price      :float
#  notes      :text
#

class Bid < ApplicationRecord
  belongs_to :buyer, inverse_of: :bids
  belongs_to :artwork, inverse_of: :bids
  
  has_many :artwork_logs, inverse_of: :bid
end
