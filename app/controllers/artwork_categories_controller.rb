class ArtworkCategoriesController < ApplicationController
  def index
    @categories = ArtworkCategory.all
  end

  def show
    @category = ArtworkCategory.find(params[:id])
    @artworks = @category.artworks.as_json(index: true)
    @user_artwork_favorites = current_user.try(:user_artwork_favorites) || []
    @user_artwork_favorite_ids = @user_artwork_favorites.any? ? @user_artwork_favorites.pluck(:artwork_id) : []
  end
end
