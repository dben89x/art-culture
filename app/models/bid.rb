# == Schema Information
#
# Table name: bids
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  buyer_id   :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bid < ApplicationRecord
end
