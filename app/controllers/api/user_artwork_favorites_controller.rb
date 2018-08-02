class API::UserArtworkFavoritesController < ApiController
  def index
    @user_artwork_favorites = UserArtworkFavorite.where(user_id: params[:user_id])
    @artworks = Artwork.where(id: @user_artwork_favorites.pluck(:artwork_id))
    json_response(@artworks.as_json(index: true))
  end

  def create
    @favorite = UserArtworkFavorite.new(favorite_params)
    if @favorite.save
      json_response(@favorite)
    end
  end

  def destroy
    @favorites = UserArtworkFavorite.where(favorite_params)
    if @favorites.delete_all
      json_response(@favorites)
    end
  end

  def favorite_params
    params.require(:favorite).permit(:user_id, :artwork_id)
  end
end
