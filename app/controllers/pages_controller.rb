class PagesController < ApplicationController
  def home
    @artworks = Artwork.all.as_json(index: true)
    @artists = Artist.all.as_json(index: true)
    @recent_listings = Artwork.last(6).as_json(index: true)
    @user_artwork_favorites = current_user.try(:user_artwork_favorites) || []
    @user_artwork_favorite_ids = @user_artwork_favorites.any? ? @user_artwork_favorites.pluck(:artwork_id) : []
  end
end
