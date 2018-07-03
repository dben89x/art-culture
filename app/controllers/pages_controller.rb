class PagesController < ApplicationController
  def home
    @artworks = Artwork.all.as_json(index: true)
    @artists = Artist.all
  end
end
