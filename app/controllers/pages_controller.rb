class PagesController < ApplicationController
  def home
    @artworks = Artwork.all.as_json(index: true)
    @artists = Artist.all
    @recent_listings = Artwork.last(8).as_json(index: true)
  end
end
