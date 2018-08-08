class ArtworksController < ApplicationController
  def show
    artwork = Artwork.find(params[:id])
    @artwork_logs = artwork.artwork_logs.order('created_at ASC').as_json(index: true)

    @artwork = Artwork.find(params[:id]).as_json(index: true)
    @artist = @artwork[:artist]
    @stripe_key = ENV['STRIPE_PUBLISHABLE']
    @current_bid = Bid.where(artwork: artwork, user: current_user).last
  end
end
