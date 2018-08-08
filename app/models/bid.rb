# == Schema Information
#
# Table name: bids
#
#  id         :bigint(8)        not null, primary key
#  artwork_id :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  open       :boolean
#  accepted   :boolean
#  price      :float
#  notes      :text
#  user_id    :bigint(8)
#

class Bid < ApplicationRecord
  belongs_to :user, inverse_of: :bids
  belongs_to :artwork, inverse_of: :bids

  validates_presence_of :price

  has_many :artwork_logs, inverse_of: :bid
  attr_readonly :open

  before_save :update_cents
  after_create :notify_seller
  after_update :notify_buyer
  after_update :close_bid

  def update_cents
    self.price_in_cents = price * 100
  end

  def notify_seller
    BidMailer.created_email(self, ENV['SELLER_EMAIL']).deliver_now
  end

  def notify_buyer
    if accepted
      BidMailer.accepted_email(self, self.user.email).deliver_now
    end
  end

  def close_bid
  end
end
