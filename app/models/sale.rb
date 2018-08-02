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

class Sale < ArtworkLog
  def sale?
    true
  end

  def as_json(options = {})
    if options[:index]
      {
        id: id,
        artwork: artwork,
        type: type,
        buyer: buyer.full_name,
        bid: bid,
        price: price,
        notes: notes,
        description: description,
        created_at: created_at
      }
    else
      super
    end
  end
end
