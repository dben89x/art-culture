include StripeHelper

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

  def purchase
    @bid = Bid.find(params[:bidId])
    @user = User.find_by(email: params[:email])
    @artwork = @bid.artwork

    unless @artwork.user == @user
      begin

        purchase_description = "#{@user.full_name} purchased artwork, #{@artwork.title}, for #{@bid.price} on #{Date.today.strftime('%B %d, %Y')}."
        if charge = create_charge(@bid.price_in_cents, purchase_description, params[:stripeToken], params[:email])
          @artwork.user = @user
          @artwork.save
          log_description = "This piece was purchased by #{@user.full_name} on #{Date.today.strftime('%B %d, %Y')}"
          @artwork_log = ArtworkLog.create(artwork: @artwork, bid: @bid, user: @user, price: @bid.price, notes: @bid.notes, description: log_description, stripe_charge_id: charge.id)
          @bid.open = false
          @bid.save

          BidMailer.paid_email(@artwork_log, ENV['SELLER_EMAIL'])
          json_response(@artwork_log)
        end


      rescue => e
        body = e.json_body
        err  = body[:error]

        render json: { errors: err[:message], type: err[:type] }, status: e.http_status
      end
    else
      render json: {errors: "#{params[:email]} already owns this piece"}, status: 403
    end
  end

  def accept
    @bid = Bid.find(params[:bidId])
    @bid.update_attribute('accepted', true)
    json_response(@bid)
  end

  def bid_params
    params.require(:bid).permit(:artwork_id, :user_id, :price, :notes)
  end
end
