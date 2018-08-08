class API::BidsController < ApiController
  def create
    @bid = Bid.new(bid_params)
    @bid.open = true
    @bid.accepted = false

    if @bid.save
      json_response(@bid)
    else
      json_response(@bid.errors.full_messages, :unprocessable_entity)
    end
  end

  def bid_params
    params.require(:bid).permit(:artwork_id, :user_id, :price, :notes)
  end
end
