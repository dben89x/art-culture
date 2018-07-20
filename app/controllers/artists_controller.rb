class ArtistsController < ApplicationController
  def index
    # @letters = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)
    @letters = Artist.all.pluck(:first_name).map(&:first).uniq.sort.map(&:upcase)
    @artists = Artist.all.as_json(index: true)
    @categories = ArtworkCategory.all
  end

  def show
    @artist = Artist.find(params[:id])
    @current_listings = Artwork.last(6)
    @artworks_in_circulation = Artwork.last(3).as_json(index: true)
    @related_artists = Artist.last(4)
  end
end
