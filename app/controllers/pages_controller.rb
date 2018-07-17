class PagesController < ApplicationController
  def home
    @artworks = Artwork.all.as_json(index: true)
    @artists = Artist.all
    @recent_listings = Artwork.last(8).as_json(index: true)
    @user_artwork_favorites = current_user.artwork_favorites.pluck(:artwork_id) if current_user
  end
end
