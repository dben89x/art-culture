class BidMailer < ApplicationMailer

  def created_email(bid, seller)
    unless Rails.env.development? || Rails.env.test?
      @bid = bid
      mail(to: seller, subject: "New bid on #{@bid.artwork.title} from #{@bid.user.full_name}")
    end
  end

  def accepted_email(bid, buyer)
    unless Rails.env.development? || Rails.env.test?
      @bid = bid
      mail(to: buyer, subject: "Your bid on #{@bid.artwork.title} has been accepted!")
    end
  end

  def paid_email(artwork_log, seller)
    unless Rails.env.development? || Rails.env.test?
      @artwork_log = artwork_log
      mail(to: seller, subject: "Payment of #{@artwork_log.price} for #{@artwork_log.artwork.title}!")
    end
  end
end
