# == Schema Information
#
# Table name: artwork_logs
#
#  id          :bigint(8)        not null, primary key
#  type        :string
#  artwork_id  :bigint(8)
#  bid_id      :bigint(8)
#  price       :integer
#  notes       :text
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint(8)
#

class ArtworkLog < ApplicationRecord
  LOG_TYPES = ['Sale']

  belongs_to :artwork, inverse_of: :artwork_logs
  belongs_to :bid, inverse_of: :artwork_logs
  belongs_to :user, inverse_of: :artwork_logs

  # def sale?
  #   type == LOG_TYPES[LOG_TYPES.find_index('Sale')]
  # end

end
