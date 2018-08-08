# == Schema Information
#
# Table name: artwork_logs
#
#  id               :bigint(8)        not null, primary key
#  type             :string
#  artwork_id       :bigint(8)
#  bid_id           :bigint(8)
#  price            :integer
#  notes            :text
#  description      :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint(8)
#  stripe_charge_id :string
#

class ArtworkLog < ApplicationRecord
  LOG_TYPES = ['Sale']

  belongs_to :artwork, inverse_of: :artwork_logs
  belongs_to :bid, inverse_of: :artwork_logs
  belongs_to :user, inverse_of: :artwork_logs

  before_save :update_cents

  def update_cents
    self.price_in_cents = price * 100
  end

  # def sale?
  #   type == LOG_TYPES[LOG_TYPES.find_index('Sale')]
  # end

end
