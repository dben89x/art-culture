class ArtistsController < ApplicationController
  def show
    @artist = Artist.find(params[:id])
    @current_listings = Artwork.last(6)
    @artworks_in_circulation = Artwork.last(3).as_json(index: true)
    @related_artists = Artist.last(4)
  end
end
